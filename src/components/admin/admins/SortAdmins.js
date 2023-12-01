import React, { useState, useEffect } from 'react';

import AdminList from './AdminList';
import Navbar from '../../navbar/Navbar';
import { verifyAuth } from '../../../helpers';
import { APIsRequests } from '../../../api/APIsRequests';

const SortAdmins = () => {
  const [state, setState] = useState({
    data: [],
    authData: {},
    isLoading: true,
    sortBy: 'admin_id',
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData: authData }));

    const getAdminsApi = async (token, sortBy) => {
      await APIsRequests.getAdminsApi(token, sortBy)
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

    getAdminsApi(authData?.token, state?.sortBy);
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
    <div className={'SortMainPage'}>
      <Navbar authData= { state?.authData } page='admin-dashboard' />
      <div>
        <h1> Sort Admin List </h1>
        <p> Choose a column to sort the article list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='categories'>Choose a category</label>
          <select name='categories' id='categories' onChange={handleChange}>
            <option value='admin_id'>All</option>
            <option value='admin_firstname'>FirstName</option>
            <option value='admin_lastname'>LastName</option>
            <option value='admin_active'>Active</option>
          </select>
        </form>
      </div>
      {
        <AdminList
          data={state?.data}
          sortBy={state?.sortBy}
          authData={state?.authData}
          isLoading={state?.isLoading}
        />
      }
    </div>
  );
};

export default SortAdmins;
