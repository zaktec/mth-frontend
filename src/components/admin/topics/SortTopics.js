import React, { useState, useEffect } from "react";
import { verifyAuth } from "../../../helpers";
import { authAPIsRequests } from "../../../api/APIsRequests";
import Navbar from "../../navbar/Navbar";
import TopicList from "./TopicList";

const SortTopics = () => {
  const [state, setState] = useState({
    data: [],
    token: null,
    authData: {  },
    isLoading: true,
    sortBy: "topic_id",
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, token: authData?.token }));
    setState((prevState) => ({...prevState, authData }));
    const getTopicsApi = async (authData, sortBy) => {
      await authAPIsRequests
        .getTopicsApi(authData?.token, sortBy)
        .then((response) => {
          console.log(response)
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

    getTopicsApi(authData, state?.sortBy);
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
    <Navbar page='dashboard-admin' />
      <div>
        <h1> Sort Topic List </h1>
        <p> Choose a column to sort the topic list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="categories">Choose a category</label>
          <select name="categories" id="categories" onChange={handleChange}>
            <option value="topic_id">All</option>
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
     {
     
        <TopicList
         data={state?.data}
         sortBy={state?.sortBy}
         token={state?.authData}
         isLoading={state?.isLoading}
      
        />
     }
    </div>
  );
};

export default SortTopics;
