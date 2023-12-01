import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import { APIsRequests } from "../../../api/APIsRequests";
import Navbar from "../../navbar/Navbar";
import { verifyAuth } from "../../../helpers";

const SortQuestions = () => {
  const [state, setState] = useState({
    data: [],
    token: null,
    authData: {  },
    isLoading: true,
    sortBy: "question_id",
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, token: authData?.token }));
    setState((prevState) => ({...prevState, authData }));
    const getQuestionsApi = async (authData, sortBy) => {
      await APIsRequests
        .getQuestionsApi(authData?.token, sortBy)
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

    getQuestionsApi(authData, state?.sortBy);
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
    <div className="SortMainPage">
    <Navbar page='admin-dashboard' />
      <div>
        <h1> Sort Questions List </h1>
        <p> Choose a column to sort the quiz list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="categories">Choose a category</label>
          <select name="categories" id="categories" onChange={handleChange}>
            <option value="question_id">All</option>
            <option value="question_calc">QuestionCalc</option>
            <option value="question_calc">QuestionCode</option>
            <option value="question_mark">CourseLevel</option>
          </select>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <QuestionList 
      data={state?.data}
      sortBy={state?.sortBy}
      token={state?.authData}
      isLoading={state?.isLoading} />
    </div>
  );
};

export default SortQuestions;
