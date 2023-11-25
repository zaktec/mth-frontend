import React, { useState } from "react";
import { shortData } from "../../helpers";
import { APIsRequests } from "../../api/APIsRequests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBook,
  faQuestionCircle,
  faCog,
  faPhoneSquare,
  faGraduationCap,
  faUserMd,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  const [state, setState] = useState({
    error: null,
    loading: false,
    buttonStatus: false,
  });
 console.log(props)
  const handleLogout = async (key, role) => {
    key.preventDefault();
    setState((prevState) => ({
      ...prevState,
      buttonStatus: true,
      loading: true,
      error: null,
    }));
    if (role === "admin") {
      await APIsRequests
        .singoutAdminRequest(props?.authData?.token)
        .then((response) => {
          localStorage.removeItem("data");
          window.location.replace("/");
        })
        .catch((error) => {
          return setState((prevState) => ({
            ...prevState,
            loading: false,
            buttonStatus: false,
            error:
              error?.response?.data?.message || error?.response?.data?.error,
          }));
        });
    }
    if (role === "tutor") {
      await APIsRequests
        .singoutTutorRequest(props?.authData?.token)
        .then((response) => {
          localStorage.removeItem("data");
          window.location.replace("/");
        })
        .catch((error) => {
          return setState((prevState) => ({
            ...prevState,
            loading: false,
            buttonStatus: false,
            error:
              error?.response?.data?.message || error?.response?.data?.error,
          }));
        });
    }
    if (role === "student") {
      await APIsRequests
        .singoutStudentRequest(props?.authData?.token)
        .then((response) => {
          localStorage.removeItem("data");
          window.location.replace("/");
        })
        .catch((error) => {
          return setState((prevState) => ({
            ...prevState,
            loading: false,
            buttonStatus: false,
            error:
              error?.response?.data?.message || error?.response?.data?.error,
          }));
        });
    }
  };

  return (
    <>
      {props?.page === "home" ||
      props?.page === "signin" ||
      props?.page === "signup" ? (
        <nav className="navbar-unique">
          <div className="menu">
            <a className="logo" href="/">
              MTH
            </a>
            <a href="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </a>
            <a href="/">
              <FontAwesomeIcon icon={faBook} /> Courses
            </a>
            <a href="/">
              <FontAwesomeIcon icon={faClipboardCheck} /> About Us
            </a>
            <a href="/">
              <FontAwesomeIcon icon={faGraduationCap} /> Services
            </a>
            <a href="/">
              <FontAwesomeIcon icon={faCog} /> Blog
            </a>
            <a href="/">
              <FontAwesomeIcon icon={faPhoneSquare} /> Contact Us
            </a>
          </div>
          <div className="auth">
            {props?.page === "dashboard" ? (
              <div className="profile-picture">
                <img
                  src="https://avatars.githubusercontent.com/u/38179232?v=4"
                  alt="profile"
                />
              </div>
            ) : props?.page === "signin" ? (
              <span>
                <span className="auth-signin">Signup</span>
                <a href="/signup/student"> Student </a>
                <a href="/signup/tutor"> Tutor </a>
                <a href="/signup/admin"> Admin </a>
              </span>
            ) : props?.page === "home" || props?.page === "signup" ? (
              <span>
                <span className="auth-signin">Login</span>
                <a href="/signin/student"> Student </a>
                <a href="/signin/tutor"> Tutor </a>
                <a href="/signin/admin"> Admin </a>
              </span>
            ) : null}
          </div>
        </nav>
      ) : props?.page === "dashboard-admin" ? (
        <nav className="navbar-unique">
          <div className="menu">
            <a className="logo" href="/home">
              MTH
            </a>
            <a href="/dashboard/admin">
              <FontAwesomeIcon icon={faHome} /> {props?.user?.admin_username}Home
            </a>
            <a href="/courselist">
              <FontAwesomeIcon icon={faBook} /> Courses
            </a>
            <a href="/topiclist">
              <FontAwesomeIcon icon={faClipboardCheck} /> Topics
            </a>
            <a href="/adminlist">
              <FontAwesomeIcon icon={faGraduationCap} /> Admins
            </a>
            <a href="/studentlist">
              <FontAwesomeIcon icon={faGraduationCap} /> Students
            </a>
            <a href="/tutorlist">
              <FontAwesomeIcon icon={faUserMd} /> Tutors
            </a>
            <a href="/lessonlist">
              <FontAwesomeIcon icon={faClipboardCheck} /> Lessons
            </a>
            <a href="/quizlist">
              <FontAwesomeIcon icon={faClipboardCheck} /> Quizzes
            </a>
            <a href="/questionlist">
              <FontAwesomeIcon icon={faQuestionCircle} /> Questions
            </a>
            <a href="/setting">
              <FontAwesomeIcon icon={faCog} /> Settings
            </a>
            <a href="/contactus">
              <FontAwesomeIcon icon={faPhoneSquare} /> Contact Us
            </a>
          </div>
          <div className="auth">
            <span className="auth-signin">
              <button
                disabled={state.buttonStatus}
                onClick={(key) => handleLogout(key, "admin")}
              >
                Logout, {shortData(props?.authData?.user?.admin_username, 5)}
              </button>
            </span>
          </div>
        </nav>
      ) : props?.page === "dashboard-tutor" ? (
        <nav className="navbar-unique">
          <div className="menu">
            <a className="logo" href="/home">
              MTH
            </a>
            <a href="/dashboard/tutor">
              <FontAwesomeIcon icon={faHome} /> {props.role}DashBoard
            </a>
            <a href="/tutorprofile/tutor">
              <FontAwesomeIcon icon={faBook} /> Profile
            </a>
            <a href="/topics">
              <FontAwesomeIcon icon={faClipboardCheck} /> Topics
            </a>
            <a href="/students">
              <FontAwesomeIcon icon={faGraduationCap} /> Students
            </a>
            <a href="/tutors">
              <FontAwesomeIcon icon={faUserMd} /> Tutors
            </a>
            <a href="/lesson">
              <FontAwesomeIcon icon={faClipboardCheck} /> Lessons
            </a>
            <a href="/quizzes">
              <FontAwesomeIcon icon={faClipboardCheck} /> Quizzes
            </a>
            <a href="/questions">
              <FontAwesomeIcon icon={faQuestionCircle} /> Questions
            </a>
            <a href="/setting">
              <FontAwesomeIcon icon={faCog} /> Settings
            </a>
            <a href="/contactus">
              <FontAwesomeIcon icon={faPhoneSquare} /> Contact Us
            </a>
          </div>
          <div className="auth">
            <span className="auth-signin">
              <button
                disabled={state.buttonStatus}
                onClick={(key) => handleLogout(key, "tutor")}
              >
                Logout, {shortData(props?.authData?.user?.tutor_username, 5)}
              </button>
            </span>
          </div>
        </nav>
      ) : props?.page === "dashboard-student" ? (
        <nav className="navbar-unique">
          <div className="menu">
            <a className="logo" href="/home">
              MTH
            </a>
            <a href="/tutorhome">
              <FontAwesomeIcon icon={faHome} /> Student Home
            </a>
            <a href="/courses">
              <FontAwesomeIcon icon={faBook} /> MyCourses
            </a>
            <a href="/topics">
              <FontAwesomeIcon icon={faClipboardCheck} /> Profile
            </a>
            <a href="/students">
              <FontAwesomeIcon icon={faGraduationCap} /> Students
            </a>
            <a href="/tutors">
              <FontAwesomeIcon icon={faUserMd} /> Tutors
            </a>
            <a href="/lesson">
              <FontAwesomeIcon icon={faClipboardCheck} /> Lessons
            </a>
            <a href="/quizzes">
              <FontAwesomeIcon icon={faClipboardCheck} /> Quizzes
            </a>
            <a href="/questions">
              <FontAwesomeIcon icon={faQuestionCircle} /> Questions
            </a>
            <a href="/setting">
              <FontAwesomeIcon icon={faCog} /> Settings
            </a>
            <a href="/contactus">
              <FontAwesomeIcon icon={faPhoneSquare} /> Contact Us
            </a>
          </div>
          <div className="auth">
            <span className="auth-signin">
              <button
                disabled={state.buttonStatus}
                onClick={(key) => handleLogout(key, "student")}
              >
                Logout, {shortData(props?.authData?.user?.student_username, 5)}
              </button>
            </span>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default Navbar;
