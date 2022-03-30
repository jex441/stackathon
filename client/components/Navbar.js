import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../store";
import Create from "./Create/Create";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserData } from "../store/user";

export const Navbar = (props) => {
  // Logged in user data
  let user = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  let picture = user && user.picture;
  let url = user.domain
    ? `https://${user.domain}`
    : `https://selected-work.com/${user.username}`;
  console.log(user);
  return (
    <div className="navbar flex justify-between py-4 px-2 font-light bg-white z-10">
      {/* <div className="flex flex-row justify-between space-x-5"> */}

      {user.username ? (
        <>
          <div className="text-xs md:text-sm sm:text-md flex flex-wrap sm:flex-row space-x-2 sm:space-x-4 items-center">
            <span className="">
              <Link to="/">Selected-Work</Link>
            </span>
            <div className="pl-4 pr-10">
              <Link to={`/create/in/${user.username}/settings`}>
                <img src={picture} className="w-8 h-8 rounded-full" />
              </Link>
            </div>
            <div className="space-x-4">
              <Link to={`/create/in/${user.username}/work`}>Work</Link>
              <Link to={`/create/in/${user.username}/about`}> About</Link>
              <Link to={`/create/in/${user.username}/cv`}> CV</Link>
              <Link to={`/create/in/${user.username}/contact`}>Contact</Link>
            </div>
          </div>
          <div className="space-x-2">
            <a href={url} target="_blank">
              <button type="button" className="pillDark">
                View Site
              </button>
            </a>
            <button type="button" className="pill" onClick={handleClick}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <span className="text-sm sm:text-lg">
            <Link to="/">Selected-Work</Link>
          </span>
          {/* <div>
            <button type="button" className="pillDark mx-2">
              <a href="#auth">Login</a>
            </button>

            <button type="button" className="pill mx-2" onClick={handleClick}>
              Sign Up
            </button>
          </div> */}
        </>
      )}
      {/* </div> */}
    </div>
  );
};

/**
 * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout());
//     },
//   };
// };
