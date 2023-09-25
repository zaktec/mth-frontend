import React, { useState, useEffect } from "react";
import CourseList from "../courses/CourseList";
import CourseCSS from "../../../css/course.module.css"
import { verifyAuth } from "../../../helpers";

const SortCourses = () => {
  const [sortBy, setSortBy] = useState("course_id");
  const [token, setToken] = useState();
 
 

  useEffect(() => {
    /* verifyRole(role); */
    const token =  verifyAuth();
    setToken(token);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSortBy(event.target.value);
  };

  return (

    <main className={CourseCSS.SortCoursePage}>
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
      { <CourseList token = {token} sortBy={sortBy} /> }
    </main>
  );
};

export default SortCourses;
