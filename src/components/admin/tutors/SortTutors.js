import React, { useState, useEffect } from "react";
import TutorList from "./TutorList";
import Navbar from "../../navbar/Navbar";
import { verifyAuth } from "../../../helpers";
import { APIsRequests } from "../../../api/APIsRequests";


const SortTutors = () => {
  const [state, setState] = useState({
    data: [],
    authData: {},
    isLoading: true,
    sortBy: "tutor_id",
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData: authData }));

    const getTutorsApi = async (token, sortBy) => {
      await APIsRequests
        .getTutorsApi(token, sortBy)
        .then((response) => {
          return setState((prevState) => ({
            ...prevState,
            isLoading: false,
            data: response?.data?.data,
          }));      
          
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getTutorsApi(authData?.token, state?.sortBy);
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
      <Navbar  authData= { state?.authData } page="admin-dashboard" />
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
        </form>
      </div>
       {
      <TutorList
        data={state?.data}
        sortBy={state?.sortBy}
        authData={state?.authData}
        isLoading={state?.isLoading}
      />
      } 
    </div>
  );
};

export default SortTutors;
