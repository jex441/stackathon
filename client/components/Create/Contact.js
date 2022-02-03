import React from "react";
import { updateContactData } from "../../store/create";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Contact(props) {
  let dispatch = useDispatch();
  let contact = useSelector((state) => state.user.contact);
  let [state, setState] = useState(contact);

  useEffect(() => {
    setState(contact);
  }, [contact]);

  console.log(contact);

  let changeHandler = (evt) => {
    evt.preventDefault();
    setState({ ...state, [evt.target.name]: evt.target.value });
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(updateContactData(props.user.id, state));
  };
  if (!state) {
    return null;
  } else {
    return (
      <div className="pb-10 w-full pr-10">
        <form
          className="contact space-x-5 flex flex-col justify-start md:w-3/6"
          onSubmit={submitHandler}
        >
          <label htmlFor="text">Text:</label>
          <textarea
            className="border-2"
            rows="5"
            className="w-full"
            style={{ resize: "none" }}
            name="text"
            type="text"
            onChange={changeHandler}
            value={state.text}
          />
          <label htmlFor="email">Email *</label>
          <input
            required
            className="border-2"
            name="email"
            type="text"
            onChange={changeHandler}
            value={state.email}
          ></input>
          <label htmlFor="email">Phone</label>
          <input
            className="border-2"
            name="phone"
            type="number"
            onChange={changeHandler}
            value={state.phone}
          ></input>
          <label htmlFor="email">Address</label>
          <input
            className="border-2"
            name="address"
            type="number"
            onChange={changeHandler}
            value={state.address}
          ></input>
          <label htmlFor="socialMedia" className="mb-1">
            Social Media Links
          </label>
          <label htmlFor="instagram">Instagram</label>
          <input
            className="border-2"
            name="instagram"
            type="url"
            onChange={changeHandler}
            value={state.instagram}
          ></input>
          <label htmlFor="facebook">Facebook</label>
          <input
            className="border-2"
            name="facebook"
            type="url"
            onChange={changeHandler}
            value={state.facebook}
          ></input>
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            className="border-2"
            name="linkedin"
            type="url"
            onChange={changeHandler}
            value={state.linkedin}
          ></input>
          <label htmlFor="pintrest">Pintrest</label>
          <input
            className="border-2"
            name="pintrest"
            type="url"
            onChange={changeHandler}
            value={state.pintrest}
          ></input>
          <label htmlFor="tiktok">TikTok</label>
          <input
            className="border-2"
            name="TikTok"
            type="url"
            onChange={changeHandler}
            value={state.tiktok}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
