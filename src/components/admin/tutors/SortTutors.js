import React, { useState, useEffect } from "react";
import TutorList from "./TutorList";
import Navbar from "../../navbar/Navbar";
import { verifyAuth } from "../../../helpers";
import { APIsRequests } from "../../../api/APIsRequests";


const SortTutors = () => {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    token: null,
    sortBy: "tutor_id",
  });

  useEffect(() => {
    const token = verifyAuth();
    setState((prevState) => ({ ...prevState, token: token?.token }));
    const getTutorsApi = async (token, sortBy) => {
      await APIsRequests
        .getTutorsApi(token?.token, sortBy)
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

    getTutorsApi(token, state?.sortBy);
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
          {/*    <input type="submit" value="Submit" /> */}
        </form>
        {/*  <p>Click the "Submit" button .</p> */}
      </div>
       {
      <TutorList
        token={state?.token}
        data={state?.data}
        isLoading={state?.isLoading}
        sortBy={state?.sortBy}
      />
      } 
    </div>
  );
};

export default SortTutors;
