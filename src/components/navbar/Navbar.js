import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faQuestionCircle, faCog, faPhoneSquare, faGraduationCap, faUserMd, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {
  return (
    <nav className='navbar-unique'> 
      <div className='menu'>
        <a className='logo' href='/home'>MTH</a>
        <a href='/home'><FontAwesomeIcon icon={faHome} /> Home</a>
        <a href='/home'><FontAwesomeIcon icon={faBook} /> Courses</a>
        <a href='/home'><FontAwesomeIcon icon={faClipboardCheck} /> Topics</a>
        <a href='/home'><FontAwesomeIcon icon={faGraduationCap} /> Students</a>
        <a href='/home'><FontAwesomeIcon icon={faUserMd} /> Tutors</a>
        <a href='/home'><FontAwesomeIcon icon={faClipboardCheck} /> Lessons</a>
        <a href='/home'><FontAwesomeIcon icon={faClipboardCheck} /> Quizzes</a>
        <a href='/home'><FontAwesomeIcon icon={faQuestionCircle} /> Questions</a>
        <a href='/home'><FontAwesomeIcon icon={faCog} /> Settings</a>
        <a href='/home'><FontAwesomeIcon icon={faPhoneSquare} /> Contact Us</a>
      </div>

      <div className='auth'>
          {
            props?.page === 'dashboard'
            ? <div className="profile-picture">  <img src='https://avatars.githubusercontent.com/u/38179232?v=4' alt="profile" /> </div>
            : props?.page === 'signin'
            ? <span> <span className='auth-signin'>Signup</span> <a href='/signup/student'> Student </a> | <a href='/signup/tutor'> Tutor </a> </span>
            : props?.page === 'home' || props?.page === 'signup'
            ? <span> <span className='auth-signin'>Signin</span> <a href='/signin/student'> Student </a> | <a href='/signin/tutor'> Tutor </a> </span>
            : null
          }
      </div>
    </nav>
  );
}

export default Navbar;
