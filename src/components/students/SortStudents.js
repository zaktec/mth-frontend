import React, { useState } from "react";
import "../../styles/App.css";
import Search from "../Search";
import StudentList from "./StudentList";

const SortStudents = () => {
  const [sortBy, setSortBy] = useState("student_name");

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
            <option value="All">All</option>
            <option value="article_id">article_id</option>
            <option value="article_title">article_title</option>
            <option value="article_created">article_created</option>
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
