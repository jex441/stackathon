import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Uploader(props) {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  let changeHandler = (evt) => {
    evt.preventDefault();
    const file = evt.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  let submitHandler = (evt) => {
    evt.preventDefault();

    if (!previewSource) return;

    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          data: base64EncodedImage,
          userId: props.user.id,
        }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.log(props, error);
    }
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add a Work</h2>
        </div>
        <div className="h-full flex">
          <form className="bg-red-100 h-full" onSubmit={submitHandler}>
            <input
              id="image"
              className="border-2"
              name="image"
              type="file"
              onChange={changeHandler}
              value={fileInputState}
              style={{ display: "none" }}
            />
            <label htmlFor="image">
              {previewSource ? (
                <img src={previewSource} alt="chosen" className="h-24" />
              ) : (
                <img src="placeholderadd.png"></img>
              )}
            </label>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Year" />
            <input type="text" placeholder="Medium" />
            <input type="text" placeholder="Height" />
            <input type="text" placeholder="Width" />

            <button
              type="submit"
              className="bg-black text-white text-uppercase p-1"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
