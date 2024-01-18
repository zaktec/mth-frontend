import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { shortData } from '../../helpers';
import {
  faHome,
  faBook,
  faQuestionCircle,
  faCog,
  faPhoneSquare,
  faGraduationCap,
  faUserMd,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';
import { APIsRequests } from '../../api/APIsRequests';

const Navbar = (props) => {
  const [state, setState] = useState({
    error: null,
    loading: false,
    buttonStatus: false,
  });

  const handleLogout = async (key, role) => {
    key.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      loading: true,
      buttonStatus: true,
    }));

    if (role === 'admin') {
      await APIsRequests.singoutAdminRequest(props?.authData?.token)
        .then(() => {
          toast.success('Logged out successfully');
          localStorage.removeItem('data');
          setTimeout(() => window.location.replace('/'), 1000);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error?.response?.data?.error);
          return setState((prevState) => ({
            ...prevState,
            loading: false,
            buttonStatus: false,
            error: error?.response?.data?.message || error?.response?.data?.error,
          }));
        });
    }
    if (role === 'tutor') {
      await APIsRequests.singoutTutorRequest(props?.authData?.token)
        .then(() => {
          toast.success('Logged out successfully');
          localStorage.removeItem('data');
          setTimeout(() => window.location.replace('/'), 1000);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error?.response?.data?.error);
          return setState((prevState) => ({
            ...prevState,
            loading: false,
            buttonStatus: false,
            error: error?.response?.data?.message || error?.response?.data?.error,
          }));
        });
    }
    if (role === 'student') {
      await APIsRequests.singoutStudentRequest(props?.authData?.token)
        .then(() => {
          toast.success('Logged out successfully');
          localStorage.removeItem('data');
          setTimeout(() => window.location.replace('/'), 1000);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error?.response?.data?.error);
          return setState((prevState) => ({
            ...prevState,
            loading: false,
            buttonStatus: false,
            error: error?.response?.data?.message || error?.response?.data?.error,
          }));
        });
    }
  };

  return (
    <>
      <ToastContainer />
      { props?.page === 'home' ||
        props?.page === 'signin' ||
        props?.page === 'signup' ? (
          <nav className='navbar-unique'>
            <div className='menu'>
              <a className='logo' href='/'>
                MTH
              </a>
              <a href='/'>
                <FontAwesomeIcon icon={faHome} /> Home
              </a>
              <a href='/'>
                <FontAwesomeIcon icon={faCog} /> Blog
              </a>
              <a href='/'>
                <FontAwesomeIcon icon={faClipboardCheck} /> About Us
              </a>
              <a href='/'>
                <FontAwesomeIcon icon={faGraduationCap} /> Services
              </a>
              <a href='/'>
                <FontAwesomeIcon icon={faPhoneSquare} /> Contact Us
              </a>
            </div>
            <div className='auth'>
              {props?.page === 'dashboard' ? (
                <div className='profile-picture'> <img src='https://avatars.githubusercontent.com/u/38179232?v=4' alt='profile' /> </div>
              ) : props?.page === 'home' || props?.page === 'signin' ? (
                <span>
                  <span className='auth-signin'>Login</span>
                  <a href='/student/signin'> Student </a>
                  <a href='/tutor/signin'> Tutor </a>
                  <a href='/admin/signin'> Admin </a>
                </span>
              ) : props?.page === 'signup' ? (
                <span>
                  <span className='auth-signin'>SignUp</span>
                  <a href='/student/signup'> Student </a>
                  <a href='/tutor/signup'> Tutor </a>
                  <a href='/admin/signup'> Admin </a>
                </span>
              )
              : null}
            </div>
          </nav>
        ) : props?.page === 'admin-dashboard' ? (
          <nav className='navbar-unique'>
            <div className='menu'>
              <a className='logo' href='/admin/dashboard'>
                MTH
              </a>
              <a href='/admin/dashboard'>
                <FontAwesomeIcon icon={faHome} /> Admin DashBoard
              </a>
              <a href='/admin/admins'>
                <FontAwesomeIcon icon={faGraduationCap} /> Admins
              </a>
              <a href='/admin/tutors'>
                <FontAwesomeIcon icon={faUserMd} /> Tutors
              </a>
              <a href='/admin/students'>
                <FontAwesomeIcon icon={faGraduationCap} /> Students
              </a>
              <a href='/admin/courses'>
                <FontAwesomeIcon icon={faBook} />Courses
              </a>
              <a href='/admin/topics'>
                <FontAwesomeIcon icon={faClipboardCheck} /> Topics
              </a>
              <a href='/admin/lessons'>
                <FontAwesomeIcon icon={faClipboardCheck} /> Lessons
              </a>
              <a href='/admin/quizzes'>
                <FontAwesomeIcon icon={faClipboardCheck} /> Quizzes
              </a>
              <a href='/admin/questions'>
                <FontAwesomeIcon icon={faQuestionCircle} /> Questions
              </a>
              <a href='/admin/endpoints'>
                <FontAwesomeIcon icon={faCog} /> Endpoints
              </a>
              <a href='/contactus'>
                <FontAwesomeIcon icon={faPhoneSquare} /> Contact Us
              </a>
            </div>
            <div className='auth'>
              <span className='auth-signin'>
                <button
                  disabled={state.buttonStatus}
                  onClick={(key) => handleLogout(key, 'admin')}
                >
                  Logout, {shortData(props?.authData?.user?.admin_username, 5)}
                </button>
              </span>
            </div>
          </nav>
        ) : props?.page === 'tutor-dashboard' ? (
          <nav className='navbar-unique'>
            <div className='menu'>
              <a className='logo' href='/tutor/dashboard'>
                MTH
              </a>
              <a href='/tutor/dashboard'>
                <FontAwesomeIcon icon={faHome} /> Tutor DashBoard
              </a>
              <a href='/tutor/tutors'>
                <FontAwesomeIcon icon={faUserMd} /> Tutors
              </a>
              <a href='/tutor/students'>
                <FontAwesomeIcon icon={faGraduationCap} /> Students
              </a>
              <a href='/tutor/topics'>
                <FontAwesomeIcon icon={faClipboardCheck} /> Topics
              </a>
              <a href='/tutor/lessons'>
                <FontAwesomeIcon icon={faClipboardCheck} /> Lessons
              </a>
              <a href='/tutor/quizzes'>
                <FontAwesomeIcon icon={faClipboardCheck} /> Quizzes
              </a>
              <a href='/tutor/questions'>
                <FontAwesomeIcon icon={faQuestionCircle} /> Questions
              </a>
              <a href='/tutor/setting'>
                <FontAwesomeIcon icon={faCog} /> Settings
              </a>
              <a href='/contactus'>
                <FontAwesomeIcon icon={faPhoneSquare} /> Contact Us
              </a>
            </div>
            <div className='auth'>
              <span className='auth-signin'>
                <button
                  disabled={state.buttonStatus}
                  onClick={(key) => handleLogout(key, 'tutor')}
                >
                  Logout, {shortData(props?.authData?.user?.tutor_username, 5)}
                </button>
              </span>
            </div>
          </nav>
        ) : props?.page === 'student-dashboard' ? (
          <nav className='navbar-unique'>
            <div className='menu'>
              <a className='logo' href='/student/dashboard'>
                MTH
              </a>
              <a href='/student/dashboard'>
                <FontAwesomeIcon icon={faHome} /> Student DashBoard
              </a>
              <a href='/student/tutors'>
                <FontAwesomeIcon icon={faUserMd} /> Tutors
              </a>
              <a href='/student/students'>
                <FontAwesomeIcon icon={faGraduationCap} /> Students
              </a>
              <a href='/student/courses'>
                <FontAwesomeIcon icon={faBook} />Courses
              </a>
              <a href='/student/lessons'>
                <FontAwesomeIcon icon={faClipboardCheck} /> Lessons
              </a>
              <a href='/student/quizzes'>
                <FontAwesomeIcon icon={faClipboardCheck} /> Quizzes
              </a>
              <a href='/student/questions'>
                <FontAwesomeIcon icon={faQuestionCircle} /> Questions
              </a>
              <a href='/student/setting'>
                <FontAwesomeIcon icon={faCog} /> Settings
              </a>
              <a href='/contactus'>
                <FontAwesomeIcon icon={faPhoneSquare} /> Contact Us
              </a>
            </div>
            <div className='auth'>
              <span className='auth-signin'>
                <button
                  disabled={state.buttonStatus}
                  onClick={(key) => handleLogout(key, 'student')}
                >
                  Logout, {shortData(props?.authData?.user?.student_username, 5)}
                </button>
              </span>
            </div>
          </nav>
        ) : null
      }
    </>
  );
};

export default Navbar;
