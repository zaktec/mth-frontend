import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import EditAdmin from "./EditAdmin";
import Navbar from '../navbar/Navbar';
import DeleteAdmin from "./DeleteAdmin";
import { APIsRequests } from '../../api/APIsRequests';
import { verifyAuth, verifyRole } from "../../helpers";

const SingleAdmin = () => {
  const { role } = useParams();
  const { admin_id } = useParams();
  const [state, setState] = useState({
    data: {},
    authData: {},
    isLoading: true,
  });

  useEffect(() => {
    verifyRole(role);
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData: authData }));
    const getAdminApi = async (token, admin_id) => {
      await APIsRequests.getAdminApi(token, admin_id)
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

    getAdminApi(authData?.token, admin_id);
  }, [role, admin_id]);

  if (state?.isLoading) return <p>Loading....</p>;

  return (
    <div className="SingleMainPage">
      <Navbar authData={state?.authData} page={`${role}-dashboard`} />

      <h1> ADMIN DETAIL</h1>
      <ul className="MainListPage">
        <p>
          <b>Admin ID :</b> {state?.data?.admin_id}
        </p>
        <p>
          <b>Admin Username :</b> {state?.data?.admin_username}
        </p>
        <p>
          <b>admin Firstname :</b> {state?.data?.admin_firstname}
        </p>
        <p>
          <b>admin Lastname :</b> {state?.data?.admin_lastname}
        </p>
        <p>
          <b>admin Email :</b> {state?.data?.admin_email}
        </p>
        <img
          className="ListImage"
          src={state?.data?.admin_image}
          alt={state?.data?.admin_firstname}
        />
      </ul>

      <div style={{ margin: "20px 20px" }}>
        <EditAdmin authData={state?.authData} role={role} admin={state?.data} />
      </div>
      <div style={{ margin: "20px 20px" }}>
        <DeleteAdmin authData={state?.authData} role={role} admin_id={admin_id} />
      </div>
    </div>
  );
};

export default SingleAdmin;
