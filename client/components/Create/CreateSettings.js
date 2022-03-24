import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTitleData } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";
import { Navbar } from "../Navbar";
export default function CreateSettings(props) {
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();

  useEffect(() => {
    user = dispatch(fetchUserData(props.match.params.username));
  }, []);

  let [title, setTitle] = useState(user?.siteTitle);

  useEffect(() => {
    setTitle(user.siteTitle || `${user.firstName} ${user.lastName}`);
  }, [user]);

  let changeHandler = (evt) => {
    evt.preventDefault();
    setTitle(evt.target.value);
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(updateTitleData(user.id, { title }));
  };

  const deleteCollection = (evt) => {
    evt.preventDefault();
    dispatch(destroyCollection(userId, collectionId));
    dispatch(fetchUserData(username));
  };

  return (
    <>
      <Navbar user={user} />
      <div className="h-full mt-10 p-10">
        <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
          <label htmlFor="name">
            Your full name as it will appear on your site
          </label>
          <div>
            <input
              className="p-1 border-2 w-2/6"
              name="title"
              type="text"
              onChange={changeHandler}
              value={title}
            />
          </div>
          <div>
            <button type="submit" className="pill my-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// import { useDispatch, useSelector } from "react-redux";
// import { updateTitleData } from "../../store/create";
// import { useEffect, useState } from "react";
// import { fetchUserData } from "../../store/user";

// export default function SiteTitle(props) {
//   let dispatch = useDispatch();
//   let titleData = useSelector((state) => state.user.siteTitle);
//   let [user, setUser] = useState(props.user);
//   let [title, setTitle] = useState(props.user.siteTitle);

//   let changeHandler = (evt) => {
//     evt.preventDefault();
//     setTitle(evt.target.value);
//   };

//   useEffect(() => {
//     dispatch(fetchUserData(props.user.username));
//   }, [title]);

//   let submitHandler = (evt) => {
//     evt.preventDefault();
//     console.log("text", title);

//     dispatch(updateTitleData(props.user.id, { title }));
//     dispatch(fetchUserData(props.user.username));
//   };
//   return (
//     <form className="flex flex-row" onSubmit={submitHandler}>
//       <input
//         className="mx-2 siteTitle border-2 border-hidden hover:border-solid border-blue-300 "
//         name="title"
//         type="text"
//         onChange={changeHandler}
//         value={title}
//       />

//       <div>
//         <button type="submit" className=""></button>
//       </div>
//     </form>
//   );
// }
