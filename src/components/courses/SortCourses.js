import React, { useState } from "react";
import "../../css/App.css";
import CourseList from "./CourseList";

const SortCourses = () => {
  const [sortBy, setSortBy] = useState("course_id");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSortBy(event.target.value);
  };

  return (
    <main className="SortCoursePage">
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
      <CourseList sortBy={sortBy} />
    </main>
  );
};

export default SortCourses;
