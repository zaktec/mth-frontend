import React, { useState, useEffect } from "react";
import Navbar from "../../navbar/Navbar";
import { verifyAuth } from "../../../helpers";
import { authAPIsRequests } from "../../../api/APIsRequests";
import AdminList from "./AdminList";

const SortAdmins = () => {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    token: null,
    sortBy: "admin_id",
  });

  useEffect(() => {
    const token = verifyAuth();
    setState((prevState) => ({ ...prevState, token: token?.token }));
    const getAdminsApi = async (token, sortBy) => {
      await authAPIsRequests
        .getAdminsApi(token?.token, sortBy)
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

    getAdminsApi(token, state?.sortBy);
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
        <h1> Sort Admin List </h1>
        <p> Choose a column to sort the article list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="categories">Choose a category</label>
          <select name="categories" id="categories" onChange={handleChange}>
            <option value="admin_id">All</option>
            <option value="admin_firstname">FirstName</option>
            <option value="admin_lastname">LastName</option>
            <option value="admin_active">Active</option>
          </select>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
        <p>Click the "Submit" button .</p>
      </div>
      {
        <AdminList
          token={state?.token}
          data={state?.data}
          isLoading={state?.isLoading}
          sortBy={state?.sortBy}
        />
      }
    </div>
  );
};

export default SortAdmins;
