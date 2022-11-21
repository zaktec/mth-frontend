import React, { useState } from "react";
import "../../css/App.css";
import StudentList from "./StudentList";

const SortStudents = () => {
  const [sortBy, setSortBy] = useState("student_id");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSortBy(event.target.value);
  };

  return (
    <main className="SortStudentPage">
      <div>
        <h1> Sort Student List </h1>
        <p> Choose a column to sort the article list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="categories">Choose a category</label>
          <select name="categories" id="categories" onChange={handleChange}>
            <option value="student_id">All</option>
            <option value="student_firstname">FirstName</option>
            <option value="student_lastname">LastName</option>
            <option value="student_active">Active</option>
            <option value="student_grade">Grade</option>
            <option value="student_targetgrade">Target Grade</option>
            <option value="student_progressbar">Progress Bar</option>
          </select>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
        <p>Click the "Submit" button .</p>
      </div>
      <StudentList sortBy={sortBy} />
    </main>
  );
};

export default SortStudents;
