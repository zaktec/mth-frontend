import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

const Nav = () => {
  return (
    <nav className="NavPage">
      <h1>Menu </h1>
      <Link className="Nav__Link" to="/">
        Home |
      </Link>
      <Link className="Nav__Link" to="/articlelist">
        Article List |
      </Link>
      <Link className="Nav__Link" to="/topiclist">
        |Topic List
      </Link>
    </nav>
  );
};
export default Nav;