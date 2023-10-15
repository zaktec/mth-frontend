import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditCourse from "./EditCourse";
import DeleteCourse from "./DeleteCourse";
import { verifyAuth } from "../../../helpers";
import { authAPIsRequests } from "../../../api/APIsRequests";
import Navbar from "../../navbar/Navbar";


const SingleCourse = () => {
  const { course_id } = useParams();
  const [state, setState] = useState({ data: {}, isLoading: true, token: null });


  useEffect(() => {
    const token =  verifyAuth();
    setState((prevState) => ({...prevState, token: token?.token }));
    const getCourseApi = async (token, course_id) => {  
      await authAPIsRequests.getCourseApi(token?.token, course_id)
        .then((response) => {
          return setState((prevState) => ({...prevState, data: response?.data?.data, isLoading: false }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getCourseApi(token, course_id);
  }, []);

  if (state?.isLoading) return <p>Loading....</p>;

  return (
    
    <div className="SingleMainPage">
      <Navbar page='dashboard-admin' />
      <h1>Single Course Page</h1>
      <ul className="MainListPage">
        <li className="MainList__card">
          <p> <b>Course Name: </b> {state?.data?.course_name} </p>
          <p> <b>Course Description: </b> {state?.data?.course_desc} </p>
          <p> <b>Course ID: </b> {state?.data?.course_id} </p>
          <p> <b>Course Code: </b> {state?.data?.course_code} </p>
          <p> <b>Course Level:</b> {state?.data?.course_level} </p>
          <img className="ListImage" src={state?.data?.course_image} alt={state?.data?.course_name} />          
        </li>
      </ul>

      <div style={{ margin: '20px 20px' }}> <DeleteCourse token= {state?.token} course_id={state?.data?.course_id} /> </div>
      <div style={{ margin: '20px 20px' }}> <EditCourse token= {state?.token} course={state?.data} /> </div>
    </div>
  );
}

export default SingleCourse;
