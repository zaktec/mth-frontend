import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import Navbar from '../navbar/Navbar';
import StudentList from "./StudentList";
import { verifyAuth } from '../../helpers';
import { APIsRequests } from '../../api/APIsRequests';

const SortStudents = () => {
  const { role } = useParams();
  const [state, setState] = useState({
    data: [],
    authData: {},
    isLoading: true,
    sortBy: "student_id",
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData: authData }));

    const getStudentsApi = async (token, sortBy) => {
      await APIsRequests.getStudentsApi(token, sortBy)
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

    getStudentsApi(authData?.token, state?.sortBy);
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
    <div className={"SortMainPage"}>
      <Navbar authData= { state?.authData } page={`${role}-dashboard`} />
      <div>
        <h1> Sort Student List </h1>
        <p> Choose a column to sort the article list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="categories">Choose a category</label>
          <select name="categories" id="categories" onChange={handleChange}>
            <option value="student_id">All</option>
            <option value="student_firstname">FirstName</option>
            <option value="student_lastname">LastName</option>
            <option value="student_active">Active</option>
            <option value="student_grade">Grade</option>
            <option value="student_targetgrade">Target Grade</option>
            <option value="student_progressbar">Progress Bar</option>
          </select>
        </form>
      </div>
      {
        <StudentList
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

export default SortStudents;
