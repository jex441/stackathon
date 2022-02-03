const router = require("express").Router();
const {
  models: { User, About, Contact, CV, Work },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
});

//change a user's site title
router.put("/:userId/title", async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.userId);

    await user.update({ siteTitle: req.body.title });
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId/about", async (req, res, next) => {
  try {
    await About.update(
      {
        text: req.body.aboutText,
        userId: req.params.userId,
      },
      { where: { userId: req.params.userId } }
    );
    res.status(200).send();
  } catch (err) {
    next(err);
  }
});

router.post("/:userId/cv", async (req, res, next) => {
  try {
    await CV.create({
      header: req.body.header,
      title: req.body.title,
      description: req.body.description,
      from: req.body.from,
      to: req.body.to,
      userId: req.params.userId,
    });
    let cvData = await CV.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).send(cvData);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId/contact", async (req, res, next) => {
  try {
    await Contact.create({
      text: req.body.text,
      email: req.body.email,
      socialMedia: req.body.socialMedia,
      userId: req.params.userId,
    });
    let contactData = await Contact.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).send(contactData);
  } catch (err) {
    next(err);
  }
});

// Get User Data
router.get("/:username", async (req, res, next) => {
  try {
    let allData = await User.findOne({
      where: { username: req.params.username },
      include: { all: true, nested: true },
    });
    console.log("allData.dataValues", allData.dataValues);
    let userData = {
      id: allData.dataValues.id,
      userName: allData.dataValues.username,
      siteTitle: allData.dataValues.siteTitle,
      email: allData.dataValues.email,
      firstName: allData.dataValues.firstName,
      lastName: allData.dataValues.lastName,
      about: allData.dataValues.about,
      contact: allData.dataValues.contact,
      cv: allData.dataValues.cv,
      works: allData.dataValues.works,
    };
    res.status(200).send(userData);
  } catch (err) {
    next(err);
  }
});

//Get all work by a user
router.get("/:userId", async (req, res, next) => {
  try {
    let workData = await Work.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.status(200).send(workData);
  } catch (err) {
    next(err);
  }
});

// Get single work by a user
router.get("/:userId/:imgId", async (req, res, next) => {
  try {
    let prefix = "stackathonImgs";
    let workData = await Work.findOne({
      where: {
        imgId: `${prefix}/${req.params.imgId}`,
        userId: req.params.userId,
      },
    });
    res.status(200).send(workData);
  } catch (err) {
    next(err);
  }
});

// Delete a work by a user
router.delete("/:userId/:imgId", async (req, res, next) => {
  try {
    let prefix = "stackathonImgs";
    await Work.destroy({
      where: {
        imgId: `${prefix}/${req.params.imgId}`,
        userId: req.params.userId,
      },
    });
    res.status(200).send();
  } catch (err) {
    next(err);
  }
});
