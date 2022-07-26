import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

const Nav = () => {
  return (
    <nav className="NavPage">
      <h1>Menu </h1>
      <Link className="Nav__Link" to="/">
      |   Home 
      </Link>
      <Link className="Nav__Link" to="/courses">
      |  Courses 
      </Link>
      <Link className="Nav__Link" to="/topics">
      |  Topics
      </Link>
      <Link className="Nav__Link" to="/topics">
      |  Users
      </Link>
      <Link className="Nav__Link" to="/topics">
      |  Lessons 
      </Link>
      <Link className="Nav__Link" to="/topics">
      |  Quizzes
      </Link>
      <Link className="Nav__Link" to="/topics">
      |  Settings
      </Link>
      <Link className="Nav__Link" to="/topics">
      |  Contact Us
      </Link>
    </nav>
  );
};
export default Nav;