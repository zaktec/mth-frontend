import React from "react";
import { Link } from "react-router-dom";
import "../../styles/App.css";

const Nav = () => {
  return (
    <nav className="NavPage">
      <h1>Menu </h1>
      <Link className="Nav__Link" to="/">
      |   Home 
      </Link>
      <Link className="Nav__Link" to="/courselist">
      |  Courses 
      </Link>
      <Link className="Nav__Link" to="/topiclist">
      |  Topics
      </Link>
      <Link className="Nav__Link" to="/studentlist">
      |  Students
      </Link>
      <Link className="Nav__Link" to="/students">
      |  Tutors
      </Link>
      <Link className="Nav__Link" to="/topics">
      |  Lessons 
      </Link>
      <Link className="Nav__Link" to="/topics">
      |  Quizzes
      </Link>
      <Link className="Nav__Link" to="/topics">
      |  Questions
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