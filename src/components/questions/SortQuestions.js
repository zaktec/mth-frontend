import React, { useState } from "react";
import "../../styles/App.css";
import QuestionList from "./QuestionList";


const SortQuestions = () => {
  const [sortBy, setSortBy] = useState("ques_id");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSortBy(event.target.value);
  };

  return (
    <main className="SortQuestionPage">
      <div>
        <h1> Sort Questions List </h1>
        <p> Choose a column to sort the quiz list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="categories">Choose a category</label>
          <select name="categories" id="categories" onChange={handleChange}>
            <option value="ques_id">All</option>
            <option value="ques_calc">QuestionCalc</option>
            <option value="ques_calc">QuestionCode</option>
            <option value="ques_mark">CourseLevel</option>
          </select>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
        <p>Click the "Submit" button .</p>
      </div>
      <QuestionList sortBy={sortBy} />
    </main>
  );
};

export default SortQuestions;
