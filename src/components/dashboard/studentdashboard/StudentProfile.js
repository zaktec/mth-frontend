import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { APIsRequests } from '../../../api/APIsRequests';
import StudentQuizzes from '../../students/StudentQuizzes';

const StudentProfile = (props) => {
  const { role } = useParams();
  const [state, setState] = useState({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    const getStudentProfile = async (token, studentId) => {
      await APIsRequests.getStudentApi(token, studentId)
        .then((response) => {
          return setState((prevState) => ({
            ...prevState,
            isLoading: false,
            data: response?.data?.data,
          }));
        })
        .catch((error) => console.log(error));
    };

    getStudentProfile(
      props?.authData?.token,
      props?.authData?.user?.student_id
    );
  }, [props?.authData?.token, props?.authData?.user?.student_id]);

  if (state.isLoading) return <p>Loading....</p>;

  return (
    <div className="SingleMainPage">
      <h1> STUDENT DASHBOARD </h1>
      <ul className="MainListPage">
        <p>
          <b>Student ID :</b> {state?.data.student_id}
        </p>
        <p>
          <b>Student Username :</b> {state?.data.student_username}
        </p>
        <p>
          <b>Student Firstname :</b>
          {state?.data.student_firstname}
        </p>
        <p>
          <b>Student Lastname :</b> {state?.data.student_lastname}
        </p>
        <p>
          <b>Student Email :</b> {state?.data.student_email}
        </p>
        <p>
          <b>Student Active :</b> {state?.data.student_active}
        </p>
        <p>
          <b>Student Grade :</b> {state?.data.student_grade}
        </p>
        <p>
          <b>Student TargetGrade :</b> {state?.data.student_targetgrade}
        </p>
        <p>
          <b>Student Notes :</b> {state?.data.student_notes}
        </p>
        <p>
          <b>Student ProgressBar :</b> {state?.data.student_progressbar}
        </p>
        <img
          className="ListImage"
          src={state?.data?.student_image}
          alt={state?.data?.student_firstname}
        />
      </ul>

      { role === 'student' && (
        <div style={{ margin: "20px 20px" }}>
          <StudentQuizzes authData={props?.authData} role={role} student_id={props?.authData?.user?.student_id} /> 
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
