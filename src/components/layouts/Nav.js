import React from "react";
import { Link } from "react-router-dom";
import "../../css/App.css";


const Nav = () => {
  return (
    <nav className="NavPage">
      <h1> Main Menu </h1>
      <Link className="Nav__Link" to="/">
        | Home
      </Link>
      <Link className="Nav__Link" to="/courselist">
        | Courses
      </Link>
      <Link className="Nav__Link" to="/topiclist">
        | Topics
      </Link>
      <Link className="Nav__Link" to="/studentlist">
        | Students
      </Link>
      <Link className="Nav__Link" to="/tutorlist">
        | Tutors
      </Link>
      <Link className="Nav__Link" to="/lessonlist">
        | Lessons
      </Link>
      <Link className="Nav__Link" to="/quizlist">
        | Quizzes
      </Link>
      <Link className="Nav__Link" to="/questionlist">
        | Questions
      </Link>
      <Link className="Nav__Link" to="/topics">
        | Settings
      </Link>
      <Link className="Nav__Link" to="/topics">
        | Contact Us
      </Link>
     {/*  <Navusers /> */}
    </nav>
  );
};
export default Nav;
