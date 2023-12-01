import React, { useState, useEffect } from "react";
import Navbar from "../../navbar/Navbar";
import { verifyAuth } from "../../../helpers";
import { APIsRequests } from "../../../api/APIsRequests";
import QuizList from "./QuizList";

const SortQuizzes = () => {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    token: null,
    sortBy: "quiz_id",
  });

  useEffect(() => {
    const token = verifyAuth();
    setState((prevState) => ({ ...prevState, token: token?.token }));
    const getQuizzesApi = async (token, sortBy) => {
      await APIsRequests.getQuizzesApi(token?.token, sortBy)
        .then((response) => {
          return setState((prevState) => ({
            ...prevState,
            data: response?.data?.data,
            isLoading: false,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getQuizzesApi(token, state?.sortBy);
  }, [state.sortBy]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    return setState((prevState) => ({
      ...prevState,
      sortBy: event.target.value,
    }));
  };
  return (
    <div className={"SortMainPage"}>
      <Navbar page="admin-dashboard" />
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
      </div>
      {
        <QuizList
          data={state?.data}
          token={state?.token}
          sortBy={state?.sortBy}
          isLoading={state?.isLoading}
        />
      }
    </div>
  );
};

export default SortQuizzes;
