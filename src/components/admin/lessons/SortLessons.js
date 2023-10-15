import React, { useEffect, useState } from "react";
import LessonList from "./LessonList";
import { verifyAuth } from "../../../helpers";
import { authAPIsRequests } from "../../../api/APIsRequests";
import Navbar from "../../navbar/Navbar";

const SortLessons = () => {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    token: null,
    sortBy: "lesson_id",
  });

  useEffect(() => {
    const token = verifyAuth();
    setState((prevState) => ({ ...prevState, token: token?.token }));
    const getLessonsApi = async (token, sortBy) => {
      await authAPIsRequests
        .getLessonsApi(token?.token, sortBy)
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
    getLessonsApi(token, state?.sortBy);
  }, [state.sortBy]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    return setState((prevState) => ({...prevState, sortBy: event.target.value }));
  };

  return (
    <main className="SortMainPage">
      <Navbar page='dashboard-admin' />
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
        </form>
      </div>
       <LessonList token= {state?.token} data= { state?.data } isLoading= {state?.isLoading}  sortBy={state?.sortBy}/> 
    </main>
  );
};

export default SortLessons;
