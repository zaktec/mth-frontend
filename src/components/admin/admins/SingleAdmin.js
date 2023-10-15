import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { verifyAuth } from "../../../helpers";
import { authAPIsRequests } from "../../../api/APIsRequests";
import Navbar from "../../navbar/Navbar";
import DeleteAdmin from "./DeleteAdmin";
import EditAdmin from "./EditAdmin";

const SingleAdmin = () => {
  const { admin_id } = useParams();
  const [state, setState] = useState({
    data: {},
    isLoading: true,
    token: null,
  });

  useEffect(() => {
    const token = verifyAuth();
    setState((prevState) => ({ ...prevState, token: token?.token }));
    const getAdminApi = async (token, admin_id) => {
      await authAPIsRequests
        .getAdminApi(token?.token, admin_id)
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

    getAdminApi(token, admin_id);
  }, [admin_id]);

  if (state?.isLoading) return <p>Loading....</p>;

  return (
    <div className="SingleMainPage">
      <Navbar page="dashboard-admin" />
      <h1> Single Admin page </h1>
      <ul className="MainListPage">
        <li className="List__card">
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
          <p>
            <b>admin Password :</b> {state?.data?.admin_password}
          </p>
          <p>
            <b>admin Image :</b> {state?.data?.admin_image}
          </p>
        </li>
      </ul>

      <div style={{ margin: "20px 20px" }}>
        {" "}
        <DeleteAdmin
          token={state?.token}
          admin_id={state?.data?.course_id}
        />{" "}
      </div>
      <div style={{ margin: "20px 20px" }}>
        {" "}
        <EditAdmin token={state?.token} admin={state?.data} />{" "}
      </div>
    </div>
  );
};

export default SingleAdmin;
