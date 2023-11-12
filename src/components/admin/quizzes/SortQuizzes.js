import React, { useState, useEffect } from "react";
import Navbar from "../../navbar/Navbar";
import { verifyAuth } from "../../../helpers";
import { authAPIsRequests } from "../../../api/APIsRequests";
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
      await authAPIsRequests
        .getQuizzesApi(token?.token, sortBy)
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
    <Navbar page="dashboard-admin" />
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
      {
      <QuizList token={state?.token}
          data={state?.data}
          isLoading={state?.isLoading}
          sortBy={state?.sortBy} />
      }
          </div>
  );
};

export default SortQuizzes;
