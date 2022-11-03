import React from "react";
import { Link } from "react-router-dom";
import "../../styles/App.css";

const Navusers = () => {
  return (
    <nav className="NavPage">
      <h1> User Menu </h1>
      <Link className="Nav__Link" to="/userhomepage">
      |   UserHomePage 
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
      <Link className="Nav__Link" to="/tutorlist">
      |  Tutors
      </Link>
      <Link className="Nav__Link" to="/lessonlist">
      |  Lessons 
      </Link>
      <Link className="Nav__Link" to="/quizlist">
      |  Quizzes
      </Link>
      <Link className="Nav__Link" to="/questionlist">
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
export default Navusers;