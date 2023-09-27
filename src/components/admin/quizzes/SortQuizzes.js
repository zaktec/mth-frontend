import React, { useState } from "react";
import "../../css/App.css";
import QuizList from "./QuizList";

const SortQuizzes = () => {
  const [sortBy, setSortBy] = useState("quiz_id");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSortBy(event.target.value);
  };

  return (
    <main className="SortQuizPage">
      <div>
        <h1> Sort Quizzes List </h1>
        <p> Choose a column to sort the quiz list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="categories">Choose a category</label>
          <select name="categories" id="categories" onChange={handleChange}>
            <option value="quiz_id">All</option>
            <option value="quiz_name">CourseName</option>
            <option value="quiz_code">CourseCode</option>
            <option value="quiz_level">CourseLevel</option>
          </select>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
        <p>Click the "Submit" button .</p>
      </div>
      <QuizList sortBy={sortBy} />
    </main>
  );
};

export default SortQuizzes;
