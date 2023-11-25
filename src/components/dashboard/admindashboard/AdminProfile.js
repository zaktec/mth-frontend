import React, { useState, useEffect } from 'react';
import { APIsRequests } from '../../../api/APIsRequests';

const AdminProfile = (props) => {
  const [state, setState] = useState({
    data: [],
    isLoading: true
  });

  useEffect(() => {
    const getAdminProfile = async (token, adminId) => {
      await APIsRequests.getAdminApi(token, adminId)
        .then((response) => {
          return setState((prevState) => ({
            ...prevState,
            isLoading: false,
            data: response?.data?.data,
          }));
        })
        .catch((error) => console.log(error))
    };

    getAdminProfile(props?.authData?.token, props?.authData?.user?.admin_id);
  }, [props?.authData?.token, props?.authData?.user?.admin_id]);

  if (state.isLoading) return <p>Loading....</p>;
  return (
    <div className="SingleMainPage">
    <h1>Admin Dashboard</h1>
    <ul className="MainListPage">
      <li className="List__card">
        <p>
          <b>admin UserName: </b> {state?.data.admin_username}
        </p>
        <p>
          <b>admin Name: </b> {state?.data.admin_firstname}
        </p>
        <p>
          <b>admin Last Name: </b> {state?.data.admin_lastname}
        </p>
        <p>
          <b>admin Password</b> {state?.data.admin_password}
        </p>
        <b>admin Image :</b> {state?.data.admin_image}
      </li>
    </ul>
  </div>
);
};

export default AdminProfile;
