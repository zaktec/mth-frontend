import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import TopicList from "./TopicList";
import Navbar from '../navbar/Navbar';
import { verifyAuth } from '../../helpers';
import { APIsRequests } from '../../api/APIsRequests';

const SortTopics = () => {
  const { role } = useParams();
  const [state, setState] = useState({
    data: [],
    token: null,
    authData: {},
    isLoading: true,
    sortBy: "topic_id",
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData}));
    setState((prevState) => ({...prevState, authData }));
    const getTopicsApi = async (authData, sortBy) => {
      await APIsRequests
        .getTopicsApi(authData?.token, sortBy)
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

    getTopicsApi(authData, state?.sortBy);
  }, [state.sortBy]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };


  const handleChange = (event) => {
    
    return setState((prevState) => ({
      ...prevState,
      sortBy: event.target.value,
    }));
  };


  return (
    <div className="SortMainPage">
    <Navbar authData={state?.authData} page='admin-dashboard' />
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
      </div>
     {
        <TopicList
        role={role}
         data={state?.data}
         sortBy={state?.sortBy}
         authData={state?.authData}
         isLoading={state?.isLoading}
        />
     }
    </div>
  );
};

export default SortTopics;
