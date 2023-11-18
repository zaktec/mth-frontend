import React from "react";

const StudentProfile = (props) => {

  console.log(props)
  return (
    <div className="SingleMainPage">
      <h1> Student Dashboard </h1>
      <ul className="MainListPage">
        <li className="StudentList__card">
          <p>
            <b>Student ID :</b> {props?.authData?.user?.student_id}
          </p>
          <p>
            <b>Student Username :</b> {props?.authData?.user?.student_username}
          </p>
          <p>
            <b>Student Firstname :</b>{" "}
            {props?.authData?.user?.student_firstname}
          </p>
          <p>
            <b>Student Lastname :</b> {props?.authData?.user?.student_lastname}
          </p>
          <p>
            <b>Student Email :</b> {props?.authData?.user?.student_email}
          </p>
          <p>
            <b>Student Password :</b> {props?.authData?.user?.student_password}
          </p>
          <p>
            <b>Student Active :</b> {props?.authData?.user?.student_active}
          </p>
          <p>
            <b>Student Grade :</b> {props?.authData?.user?.student_grade}
          </p>
          <p>
            <b>Student TargetGrade :</b>{" "}
            {props?.authData?.user?.student_targetgrade}
          </p>
          <p>
            <b>Student Notes :</b> {props?.authData?.user?.student_notes}
          </p>
          <p>
            <b>Student ProgressBar :</b>{" "}
            {props?.authData?.user?.student_progressbar}
          </p>
          <p>
            <b>Student Image :</b> {props?.authData?.user?.student_image}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default StudentProfile;
