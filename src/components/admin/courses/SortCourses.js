import React, { useState, useEffect } from "react";
import CourseList from "../courses/CourseList";
import CourseCSS from "../../../css/course.module.css"

import { verifyAuth } from "../../../helpers";
import { authAPIsRequests } from "../../../api/APIsRequests";

const SortCourses = () => {
  const [state, setState] = useState({ data: [], isLoading: true, token: null, sortBy: 'course_id' });

  useEffect(() => {
    const token =  verifyAuth();
    setState((prevState) => ({...prevState, token: token?.token }));
    const getCoursesApi = async (token, sortBy) => {  
      await authAPIsRequests.getCoursesApi(token?.token, sortBy)
        .then((response) => {
          return setState((prevState) => ({...prevState, data: response?.data?.data, isLoading: false }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getCoursesApi(token, state?.sortBy)
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    return setState((prevState) => ({...prevState, sortBy: event.target.value }));
  };

  return (

    <div className={CourseCSS.SortCoursePage}>
      <div>
        <h1> Sort Courses List </h1>
        <p> Choose a column to sort the course list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="categories">Choose a category</label>
          <select name="categories" id="categories" onChange={handleChange}>
            <option value="course_id">All</option>
            <option value="course_name">CourseName</option>
            <option value="course_code">CourseCode</option>
            <option value="course_level">CourseLevel</option>
          </select>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
        <p>Click the "Submit" button .</p>
      </div>
      { <CourseList token= {state?.token} data= { state?.data } isLoading= {state?.isLoading}  sortBy={state?.sortBy}/> }
    </div>
  );
};

export default SortCourses;
