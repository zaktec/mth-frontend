import React, { useState, useEffect } from "react";
import StudentList from "./StudentList";
import Navbar from "../../navbar/Navbar";
import { verifyAuth } from "../../../helpers";
import { authAPIsRequests } from "../../../api/APIsRequests";

const SortStudents = () => {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    token: null,
    sortBy: "student_id",
  });

  useEffect(() => {
    const token = verifyAuth();
    setState((prevState) => ({ ...prevState, token: token?.token }));
    const getStudentsApi = async (token, sortBy) => {
      await authAPIsRequests
        .getStudentsApi(token?.token, sortBy)
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

    getStudentsApi(token, state?.sortBy);
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
          <br></br>
          <input type="submit" value="Submit" />
        </form>
        <p>Click the "Submit" button .</p>
      </div>
      {
        <StudentList
          token={state?.token}
          data={state?.data}
          isLoading={state?.isLoading}
          sortBy={state?.sortBy}
        />
      }
    </div>
  );
};

export default SortStudents;
