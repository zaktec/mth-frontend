import React, { useState } from "react";
import "../../css/App.css";
import TutorList from "./TutorList";
import TutorCSS from "../../css/tutor.module.css";

const SortTutors = () => {
  const [sortBy, setSortBy] = useState("tutor_id");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSortBy(event.target.value);
  };

  return (
    <main className={TutorCSS.SortTutorPage}>
      <div>
        <h1> Sort Tutor List </h1>
        <p> Choose a column to sort the Tutor list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="categories">Choose a category</label>
          <select name="categories" id="categories" onChange={handleChange}>
            <option value="tutor_id">All</option>
            <option value="tutor_firstname">FirstName</option>
            <option value="tutor_lastname">LastName</option>
            <option value="tutor_active">Active</option>
          </select>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
        <p>Click the "Submit" button .</p>
      </div>
      <TutorList sortBy={sortBy} />
    </main>
  );
};

export default SortTutors;
