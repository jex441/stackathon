import React from "react";
import { Navbar } from "./Navbar";

import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
export const Contact = (props) => {
  let user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      user = await dispatch(fetchUserData(props.match.params.username));
    }
    fetchData();
  }, []);
  console.log("user", user);
  let text = user.contact && user.contact.text;
  let email = user.contact && user.contact.email;
  let socialMedia = user.contact && user.contact.socialMedia;
  return (
    <div>
      <Navbar data={props} user={user} />
      <div className="grid grid-cols-12 grid-rows-6">
        <div className="row-start-3 row-span-6 col-start-3 col-end-10">
          {text}
          {email}
          {socialMedia}
        </div>
      </div>
    </div>
  );
};
