import React, { useState } from "react";
import "../../styles/App.css";
import TopicList from "./TopicList";

const SortTopics = () => {
  const [sortBy, setSortBy] = useState("topic_name");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSortBy(event.target.value);
  };
 console.log(sortBy)
  return (
    <main className="SortStudentPage">
      <div>
        <h1> Sort Topic List </h1>
        <p> Choose a column to sort the topic list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="categories">Choose a category</label>
          <select name="categories" id="categories" onChange={handleChange}>
            <option value="All">All</option>
            <option value="topic_index">TopicIndex</option>
            <option value="topic_code">TopicCode</option>
            <option value="topic_name">TopicName</option>
            <option value="topic_course_id">TopicCourseID</option>
          </select>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
        <p>Click the "Submit" button .</p>
      </div>
      
      <TopicList sortBy={sortBy} />
    </main>
  );
};

export default SortTopics;
