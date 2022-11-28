import React, { useState } from "react";
import QuestionList from "./QuestionList";
import QuestionCSS from "../../css/question.module.css";

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
    <main className={QuestionCSS.SortQuestionPage}>
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
