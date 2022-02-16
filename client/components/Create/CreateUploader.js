import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { fetchSingleWork, destroyWork } from "../../store/create";

export default function CreateUploader(props) {
  let work = useSelector((state) => state?.create.work);
  let user = useSelector((state) => state.user);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const dispatch = useDispatch();

  const [state, setState] = useState({
    collection: props.collection,
    title: "",
    year: "",
    height: "",
    width: "",
    medium: "",
    hidden: false,
  });
  let [hidden, setHidden] = useState(false);
  useEffect(() => {
    async function loadImageData() {
      if (props.displayName === "Add a Work") {
        // clears state
        await dispatch(fetchSingleWork(null, null));
        // clears preview image in case modal was closed and add a work was opened
        setPreviewSource("");
        setState({
          collection: props.collection,
          title: "",
          year: "",
          height: "",
          width: "",
          medium: "",
          hidden: false,
        });
      }
      if (props.displayName === "Edit Work") {
        work = await dispatch(
          fetchSingleWork(user.id, props.collection, props.imgId)
        );
      }
    }
    loadImageData();
  }, [props.show]);

  //Sets initial value of hidden when work has loaded for Edit Work
  useEffect(() => {
    setHidden(work?.hidden);
  }, [work]);

  const destroyHandler = (userId, imgId) => {
    imgId = imgId.split("/").slice(-1).join();
    dispatch(destroyWork(userId, imgId));
    props.setShow(false);
  };

  let changeHandler = (evt) => {
    evt.preventDefault();
    //if evt target is files, we are dealing with the img file
    if (evt.target.files) {
      const file = evt.target.files[0];
      previewFile(file);
    } else {
      setState({ ...state, [evt.target.name]: evt.target.value });
      work = { ...work, [evt.target.name]: evt.target.value };
      console.log(evt.target.name, evt.target.value);
    }
  };

  const hiddenHandler = (evt) => {
    evt.preventDefault();
    setHidden(hidden ? false : true);
    console.log(hidden);
    setState({ ...state, [evt.target.name]: evt.target.value });
    console.log(evt.target.name, evt.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  let submitHandler = async (evt) => {
    evt.preventDefault();
    if (props.displayName === "Edit Work") {
      updateData(previewSource);
    } else if (!previewSource) return;
    else if (props.displayName === "Add a Work") {
      uploadImage(previewSource);
    }
    await dispatch(fetchSingleWork(null, null));

    setState({
      ...state,
      title: "",
      year: "",
      height: "",
      width: "",
      medium: "",
      hidden: null,
    });
    props.setShow(false);
  };
  // if preview source => then new image

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          data: base64EncodedImage,
          collection: state.collection,
          userId: user.id,
          title: state.title,
          year: state.year,
          height: state.height,
          width: state.width,
          medium: state.medium,
          hidden: hidden,
        }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (base64EncodedImage) => {
    try {
      await fetch("/api/update", {
        method: "POST",
        body: JSON.stringify({
          data: base64EncodedImage,
          newImage: previewSource ? true : false,
          collection: state.collection,
          imgId: state.imgId ? state.imgId : work.imgId,
          userId: user.id,
          title: state.title.length ? state.title : work.title,
          year: state.year.length ? state.year : work.year,
          height: state.height.length ? state.height : work.height,
          width: state.width.length ? state.width : work.width,
          medium: state.medium.length ? state.medium : work.medium,
          hidden: hidden,
        }),
        headers: { "Content-type": "application/json" },
      });
      setPreviewSource("");
    } catch (error) {
      console.log(props, error);
    }
  };

  const closeHandler = () => {
    props.setShow(false);
    setState({
      title: "",
      year: "",
      height: "",
      width: "",
      medium: "",
      hidden: null,
    });
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header flex justify-between">
          <h2>{props.displayName}</h2>
          <h2 onClick={closeHandler}>
            <img src="/icons8-close-16.png"></img>
          </h2>
        </div>
        {/* Modal Body */}
        <div className="h-full">
          <form
            className="h-full bg-white flex justify-around items-center"
            onSubmit={submitHandler}
          >
            <div>
              <input
                id="image"
                name="image"
                type="file"
                onChange={changeHandler}
                value={fileInputState}
                style={{ display: "none" }}
              />
              <label htmlFor="image">
                {previewSource ? (
                  <img src={previewSource} alt="chosen" className="h-56" />
                ) : work ? (
                  <Image
                    cloudName={"jeffreywood"}
                    publicId={work.imgId}
                    className="h-56"
                  />
                ) : (
                  <img src="../../../placeholderadd.png"></img>
                )}
              </label>
            </div>
            <div className="flex flex-col justify-around">
              <input
                type="text"
                name="title"
                className="my-1 border-b-2"
                placeholder="Title"
                onChange={changeHandler}
                value={
                  state.title.length
                    ? state.title
                    : work
                    ? work.title
                    : state.title
                }
              />
              <input
                type="text"
                name="year"
                className="my-1 border-b-2"
                placeholder="Year"
                onChange={changeHandler}
                value={
                  state.year.length ? state.year : work ? work.year : state.year
                }
              />
              <input
                type="text"
                name="medium"
                className="my-1 border-b-2"
                placeholder="Medium"
                onChange={changeHandler}
                value={
                  state.medium.length
                    ? state.medium
                    : work
                    ? work.medium
                    : state.medium
                }
              />
              <div className="flex flex-row">
                <input
                  type="text"
                  name="height"
                  className="my-1 border-b-2"
                  placeholder="Height"
                  onChange={changeHandler}
                  value={
                    state.height.length
                      ? state.length
                      : work
                      ? work.height
                      : state.height
                  }
                />
                <input
                  type="text"
                  name="width"
                  className="my-1 border-b-2"
                  placeholder="Width"
                  onChange={changeHandler}
                  value={
                    state.width.length
                      ? state.length
                      : work
                      ? work.width
                      : state.width
                  }
                />
              </div>
              <label
                htmlFor="collection"
                className="flex m-1 items-center space-x-2"
              >
                Collection:
                <select
                  name="collection"
                  className="p-2"
                  onChange={changeHandler}
                  value={state.collection}
                >
                  {props &&
                    props?.headers.map((heading, idx) => (
                      <option
                        key={idx}
                        name="collection"
                        value={heading}
                        id={props.id}
                      >
                        {heading}
                      </option>
                    ))}
                  {props.id === "secondary" ? (
                    <option value="Hidden">Hidden</option>
                  ) : null}
                </select>
              </label>
              <div
                onClick={hiddenHandler}
                className="flex space-x-5 items-center w-12 p-1"
              >
                {/* <span>{hidden ? "Hidden" : "Visible"}</span> */}
                <span>
                  {hidden ? (
                    <img
                      src="../../../hiddenactive.png"
                      name="hidden"
                      value={hidden}
                      className="w-8"
                    />
                  ) : (
                    <img
                      src="../../../hiddeninactive.png"
                      onClick={hiddenHandler}
                      name="hidden"
                      value={hidden}
                      className="w-8"
                    />
                  )}
                </span>
              </div>
              <button
                type="submit"
                className="bg-black text-white text-uppercase p-1 my-3"
              >
                Submit
              </button>
              {work ? (
                <button
                  className="border-2 text-uppercase p-1"
                  onClick={() => destroyHandler(user.id, work.imgId)}
                >
                  Delete
                </button>
              ) : null}
            </div>
          </form>
        </div>
        {/* Modal Footer */}
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}
