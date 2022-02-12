import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";
import { Image } from "cloudinary-react";
import CreateUploader from "./CreateUploader";
import { fetchAllWork } from "../../store/create";
import { Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";
import Item from "./Item";
export default function CreateSnapshot(props) {
  // still not triggering refresh when a user changes an image of a work or adds a new work
  let user = props.user;

  const dispatch = useDispatch();

  // useEffect(() => {
  //   user = dispatch(fetchUserData(user.username));
  // }, []);

  let [show, setShow] = useState(false);
  let [displayName, setDisplayName] = useState("");
  let [imgId, setImgId] = useState("");

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
  };

  const changeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.name === props.id) {
      props.setHeader(evt.target.value);
    }
  };

  return (
    <div className="snapshot border-2 border-gray-300 mx-2 p-1">
      <select
        className="p-2"
        name={props.id}
        id={props.id}
        onChange={changeHandler}
        value={props.primary}
      >
        {props &&
          props?.headers.map((heading, idx) => (
            <option key={idx} value={heading}>
              {heading}
            </option>
          ))}
        {props.id === "secondary" ? (
          <option value="Hidden">Hidden</option>
        ) : null}
      </select>

      <Droppable
        droppableId={props.id}
        direction="horizontal"
        innerRef={props.innerRef}
      >
        {(provided) => (
          <List
            id={props.id}
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            works={props.works}
            displayName={displayName}
            show={show}
            setShow={setShow}
            user={props.user}
            innerRef={provided.innerRef}
            cloudName="jeffreywood"
            clickHandler={clickHandler}
            imgId={imgId}
            placeholder={provided.placeholder}
          ></List>
        )}
      </Droppable>
    </div>
  );
}
