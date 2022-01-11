import React from "react";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export const Navbar = (props) => {
  let siteTitle = `${props.user.siteTitle}`;
  console.log("props navbar", props.user.userName);
  return (
    <nav className="flex flex-row justify-between h-1/6 p-5">
      <div className="siteTitle">
        <Link to={`/${props.user.userName}`}>{siteTitle}</Link>
      </div>
      <div className="flex flex-row space-x-2">
        <Link to={`/${props.user.userName}`} className="subHeader">
          <div>Work</div>
        </Link>
        <Link to={`/${props.user.userName}/about`} className="subHeader">
          <div>About</div>
        </Link>
        <Link to={`/${props.user.userName}/cv`} className="subHeader">
          <div>CV</div>
        </Link>
        <Link to={`/${props.user.userName}/contact`} className="subHeader">
          <div>Contact</div>
        </Link>
      </div>
    </nav>
  );
};

// import React from "react";
