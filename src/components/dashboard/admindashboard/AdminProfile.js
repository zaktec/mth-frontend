import React, { useState, useEffect } from "react";
import { APIsRequests } from '../../../api/APIsRequests';

const AdminProfile = (props) => {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
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
        .catch((error) => console.log(error));
    };

    getAdminProfile(props?.authData?.token, props?.authData?.user?.admin_id);
  }, [props?.authData?.token, props?.authData?.user?.admin_id]);

  if (state.isLoading) return <p>Loading....</p>;
  return (
    <div className="SingleMainPage">
      <h1>ADMIN DASHBOARD</h1>
      <ul className="MainListPage">
        <p>
          <b>admin UserName: </b> {state?.data.admin_username}
        </p>
        <p>
          <b>admin Name: </b> {state?.data.admin_firstname}
        </p>
        <p>
          <b>admin Last Name: </b> {state?.data.admin_lastname}
        </p>
        <img
          className="ListImage"
          src={state?.data?.admin_image}
          alt={state?.data?.admin_firstname}
        />
      </ul>
    </div>
  );
};

export default AdminProfile;
