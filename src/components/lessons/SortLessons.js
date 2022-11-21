import React, { useState } from "react";
import "../../css/App.css";
import LessonList from "./LessonList";

const SortLessons = () => {
  const [sortBy, setSortBy] = useState("lesson_id");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSortBy(event.target.value);
  };

  return (
    <main className="SortLessonPage">
      <div>
        <h1> Sort Lesson List </h1>
        <p> Choose a column to sort the Tutor list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="categories">Choose a category</label>
          <select name="categories" id="categories" onChange={handleChange}>
            <option value="lesson_id">All</option>
            <option value="lesson_name">LessonName</option>
            <option value="lesson_code">LessonCode</option>
            <option value="lesson_topic_id">LessonTopicID</option>
          </select>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
        <p>Click the "Submit" button .</p>
      </div>
      <LessonList sortBy={sortBy} />
    </main>
  );
};

export default SortLessons;
