import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Create from "./Create/Create";
const Navbar = ({ handleClick, isLoggedIn, user }) => (
  <div className="flex">
    {isLoggedIn ? (
      <div className="p-5 flex w-full justify-between space-x-5">
        {/* The navbar will show these links after you log in */}
        <div className="siteTitle">{user.siteTitle}</div>
        <div className="flex space-x-5">
          <Link to={`/${user.username}`}>
            <button type="button" className="pill">
              View Site
            </button>
          </Link>
          <a href="#" className="p-1" onClick={handleClick}>
            Logout
          </a>
        </div>
      </div>
    ) : (
      <div>
        {/* The navbar will show these links before you log in */}
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    )}
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
