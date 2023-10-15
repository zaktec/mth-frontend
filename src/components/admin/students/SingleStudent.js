import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { verifyAuth } from "../../../helpers";
import { authAPIsRequests } from "../../../api/APIsRequests";
import DeleteStudent from "./DeleteStudent";
import EditStudent from "./EditStudent"; 
import Navbar from "../../navbar/Navbar";

const SingleStudent = () =>{
  const { student_id } = useParams();
  const [state, setState] = useState({
    data: {},
    isLoading: true,
    token: null,
  })

  useEffect(() => {
    const token = verifyAuth();
    setState((prevState) => ({ ...prevState, token: token?.token }));
    const getStudentApi = async (token, student_id) => {
      await authAPIsRequests
        .getStudentApi(token?.token, student_id)
        .then((response) => {
          return setState((prevState) => ({
            ...prevState,
            data: response?.data?.data,
            isLoading: false,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getStudentApi(token, student_id);
  }, []);

  if (state?.isLoading) return <p>Loading....</p>;

  return (
    <div className="SingleMainPage">
    <Navbar page='dashboard-admin' />
      <h1> Single Student page </h1>
      <ul className="MainListPage">
        <li className="StudentList__card">
        <p><b>Student ID :</b> {state?.data?.student_id}</p>
        <p><b>Student Username :</b> {state?.data?.student_username}</p>
      <p><b>Student Firstname :</b> {state?.data?.student_firstname}</p>
      <p><b>Student Lastname :</b> {state?.data?.student_lastname}</p>
          <p><b>Student Email :</b> {state?.data?.student_email}</p>
          <p><b>Student Password :</b> {state?.data?.student_id.student_password}</p>
          <p><b>Student Active :</b> {state?.data?.student_active}</p>
          <p><b>Student Grade :</b> {state?.data?.student_grade}</p>
          <p><b>Student TargetGrade :</b> {state?.data?.student_targetgrade}</p>
          <p><b>Student Notes :</b> {state?.data?.student_notes}</p>
          <p><b>Student ProgressBar :</b> {state?.data?.student_progressbar}</p>
          <p><b>Student Image :</b> {state?.data?.student_image}</p>
        </li>
      </ul>

      <div style={{ margin: '20px 20px' }}> <DeleteStudent token= {state?.token} student_id={state?.data?.course_id} /> </div>
     <div style={{ margin: '20px 20px' }}> <EditStudent token= {state?.token} student={state?.data} /> </div> 
    </div>
  );
}

export default SingleStudent;