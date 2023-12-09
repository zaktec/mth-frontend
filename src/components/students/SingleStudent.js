import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import EditStudent from './EditStudent';
import SudentQuizzes from './StudentQuizzes';
import DeleteStudent from './DeleteStudent';
import { APIsRequests } from '../../api/APIsRequests';
import { verifyAuth, verifyRole } from '../../helpers';

const SingleStudent = () => {
  const { role } = useParams();
  const { student_id } = useParams();
  const [state, setState] = useState({
    data: {},
    authData: {},
    isLoading: true,
  });

  useEffect(() => {
    verifyRole(role);
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData: authData }));

    const getStudentApi = async (token, student_id) => {
      await APIsRequests.getStudentApi(token, student_id)
        .then((response) => {
          return setState((prevState) => ({
            ...prevState,
            isLoading: false,
            data: response?.data?.data,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getStudentApi(authData.token, student_id);
  }, [role, student_id]);

  if (state?.isLoading) return <p>Loading....</p>;

  return (
    <div className='SingleMainPage'>
      <Navbar authData={state?.authData} page={`${role}-dashboard`} />
      <h1>STUDENT DETAIL</h1>
      <ul className='MainListPage'>
        <p>
          <b>Student ID :</b> {state?.data?.student_id}
        </p>
        <p>
          <b>Student Username :</b> {state?.data?.student_username}
        </p>
        <p>
          <b>Student Firstname :</b> {state?.data?.student_firstname}
        </p>
        <p>
          <b>Student Lastname :</b> {state?.data?.student_lastname}
        </p>
        <p>
          <b>Student Email :</b> {state?.data?.student_email}
        </p>
        <p>
          <b>Student Active :</b> {state?.data?.student_active}
        </p>
        <p>
          <b>Student Grade :</b> {state?.data?.student_grade}
        </p>
        <p>
          <b>Student TargetGrade :</b> {state?.data?.student_targetgrade}
        </p>
        <p>
          <b>Student Notes :</b> {state?.data?.student_notes}
        </p>
        <p>
          <b>Student ProgressBar :</b> {state?.data?.student_progressbar}
        </p>
        <img
          className='ListImage'
          src={state?.data?.student_image}
          alt={state?.data?.student_firstname}
        />
      </ul>

      <div style={{ margin: '20px 20px' }}>
        <EditStudent authData={state?.authData} role={role} student={state?.data} />
      </div>

      {(role === 'admin' || role === 'student') && (
        <div style={{ margin: '20px 20px' }}>
          <DeleteStudent authData={state?.authData} student_id={student_id} />
        </div>
      )}

      { role === 'tutor' && (
        <div style={{ margin: '20px 20px' }}>
          <SudentQuizzes authData={state?.authData} student_id={student_id} role={role} /> 
        </div>
      )}
    </div>
  );
};

export default SingleStudent;
