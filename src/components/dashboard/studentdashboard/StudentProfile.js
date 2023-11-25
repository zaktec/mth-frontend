import React, { useState, useEffect } from 'react';
import { APIsRequests } from '../../../api/APIsRequests';

const StudentProfile = (props) => {
  const [state, setState] = useState({
    data: [],
    isLoading: true
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

    getStudentProfile(props?.authData?.token, props?.authData?.user?.student_id);
  }, [props?.authData?.token, props?.authData?.user?.student_id]);

  if (state.isLoading) return <p>Loading....</p>;

  return (
    <div className='SingleMainPage'>
      <h1> Student Dashboard </h1>
      <ul className='MainListPage'>
        <li className='StudentList__card'>
          <p>
            <b>Student ID :</b> {state?.data.student_id}
          </p>
          <p>
            <b>Student Username :</b> {state?.data.student_username}
          </p>
          <p>
            <b>Student Firstname :</b>{state?.data.student_firstname}
          </p>
          <p>
            <b>Student Lastname :</b> {state?.data.student_lastname}
          </p>
          <p>
            <b>Student Email :</b> {state?.data.student_email}
          </p>
          <p>
            <b>Student Password :</b> {state?.data.student_password}
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
          <p>
            <b>Student Image :</b> {state?.data.student_image}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default StudentProfile;
