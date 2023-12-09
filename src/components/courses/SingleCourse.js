import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import EditCourse from './EditCourse';
import Navbar from '../navbar/Navbar';
import DeleteCourse from './DeleteCourse';
import { verifyAuth } from '../../helpers';
import { APIsRequests } from '../../api/APIsRequests';


const SingleCourse = () => {
  const { role, course_id } = useParams();
  const [state, setState] = useState({
    data: {},
    authData: {},
    isLoading: true,
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData }));
    const getCourseApi = async (token, course_id) => {  
      await APIsRequests.getCourseApi(token, course_id)
        .then((response) => {
          return setState((prevState) => ({...prevState, data: response?.data?.data, isLoading: false }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getCourseApi(authData?.token, course_id);
  }, [course_id]);

  if (state?.isLoading) return <p>Loading....</p>;

  return (
    <div className='SingleMainPage'>
      <Navbar authData= {state?.authData} page='admin-dashboard' />
      <h1>Single Course Page</h1>
      <ul className='MainListPage'>
        <li className='MainList__card'>
          <p> <b>Course ID: </b> {state?.data?.course_id} </p>
          <p> <b>Course Code: </b> {state?.data?.course_code} </p>
          <p> <b>Course Name: </b> {state?.data?.course_name} </p>
          <p> <b>Course Level:</b> {state?.data?.course_level} </p>
          <p> <b>Course Descriutorption: </b> {state?.data?.course_desc} </p>
          <img className='ListImage' src={state?.data?.course_image} alt={state?.data?.course_name} />          
        </li>
      </ul>

      <div style={{ margin: '20px 20px' }}> <DeleteCourse authData= {state?.authData} role={role} course_id={course_id} /> </div>
      <div style={{ margin: '20px 20px' }}> <EditCourse authData= {state?.authData} course={state?.data} role={role} /> </div>
    </div>
  );
}

export default SingleCourse;
