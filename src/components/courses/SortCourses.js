import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Navbar from '../navbar/Navbar';
import { verifyAuth } from '../../helpers';
import CourseList from './CourseList';
import { APIsRequests } from '../../api/APIsRequests';

const SortCourses = () => {
  const { role } = useParams();
  const [state, setState] = useState({
    data: [],
    token: null,
    authData: {},
    isLoading: true,
    sortBy: 'course_id',
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({...prevState, authData }));
    const getCoursesApi = async (authData, sortBy) => {
      await APIsRequests
        .getCoursesApi(authData?.token, sortBy)
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

    getCoursesApi(authData, state?.sortBy);
  }, [state.sortBy]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    return setState((prevState) => ({
      ...prevState,
      sortBy: event.target.value,
    }));
  };

  return (
    <div className='SortMainPage'>
      <Navbar authData={state?.authData} page='admin-dashboard' />

      <div>
        <h1> Sort Courses List </h1>
        <p> Choose a column to sort the course list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='categories'>Choose a category</label>
          <select name='categories' id='categories' onChange={handleChange}>
            <option value='course_id'>All</option>
            <option value='course_name'>CourseName</option>
            <option value='course_code'>CourseCode</option>
            <option value='course_level'>CourseLevel</option>
          </select>
        </form>
      </div>

      {
        <CourseList
          role={role}
          data={state?.data}
          sortBy={state?.sortBy}
          authData={state?.authData}
          isLoading={state?.isLoading}
        />
      }
    </div>
  );
};

export default SortCourses;
