import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreateSnapshot from "./CreateSnapshot";
import { DragDropContext } from "react-beautiful-dnd";
import { Navbar } from "../Navbar";
import { fetchUserData } from "../../store/user";
import CreateUploader from "./CreateUploader";
import { useRef } from "react";
export default function CreateWork(props) {
  let username = useSelector((state) => state.auth.username);
  let userId = useSelector((state) => state.auth.id);
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();

  useEffect(() => {
    user = dispatch(fetchUserData(username));
  }, []);

  let worksData = user?.collections;

  let [primary, setPrimary] = useState("Work");
  let [secondary, setSecondary] = useState("Hidden");

  let [show, setShow] = useState(false);
  let [displayName, setDisplayName] = useState("");
  let [imgId, setImgId] = useState("");
  let [modalCollection, setModalCollection] = useState("");

  let headers = [];

  const headings = () => {
    for (let i = 0; i < worksData.length; i++) {
      if (worksData[i].title !== null && !headers.includes(worksData[i].title))
        headers.push(worksData[i].title);
    }
  };

  worksData && headings();

  const submitHandler = (e) => {
    e.preventDefault();
    setDisplayName(e.target.value);
    setShow(true);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setDisplayName("Edit Work");
    let imgId = e.target.src.split("/").slice(-1).join();
    setImgId(imgId);
    setShow(true);
    setModalCollection(e.target.id);
  };

  const changeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.id === "primary") {
      setPrimary(evt.target.value);
    } else if (evt.target.id === "secondary") {
      setSecondary(evt.target.value);
    }
    console.log("evt.target.value", evt.target.value);
  };

  return (
    <>
      <Navbar user={user} />

      <div className="p-10">
        <div className="flex flex-row w-full">
          <div className="w-4/6">
            <CreateSnapshot
              id={"primary"}
              setHeader={setPrimary}
              collectionTitle={primary}
              changeHandler={changeHandler}
              headers={headers}
              userId={userId}
              clickHandler={clickHandler}
              imgId={imgId}
              setImgId={setImgId}
              displayName={displayName}
              setDisplayName={setDisplayName}
              show={show}
              setShow={setShow}
            />
          </div>
          <div className="w-2/6">
            <CreateSnapshot
              id={"secondary"}
              collectionTitle={secondary}
              setHeader={setSecondary}
              changeHandler={changeHandler}
              headers={headers}
              userId={userId}
              clickHandler={clickHandler}
              imgId={imgId}
              setImgId={setImgId}
              setDisplayName={setDisplayName}
              setShow={setShow}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => submitHandler(e)}
          className="pill m-2"
          value="Add a Work"
        >
          Add a Work
        </button>

        <CreateUploader
          headers={headers}
          collection={primary}
          displayName={displayName}
          show={show}
          setShow={setShow}
          imgId={imgId}
          user={user}
        />
      </div>
    </>
  );
}
