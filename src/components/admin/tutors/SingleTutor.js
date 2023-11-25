import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditTutor from "./EditTutor";
import DeleteTutor from "./DeleteTutor";
import { verifyAuth } from "../../../helpers";
import { APIsRequests } from "../../../api/APIsRequests";
import Navbar from "../../navbar/Navbar";

const SingleTutor = () => {
  const { tutor_id } = useParams();
  const [state, setState] = useState({
    data: {},
    isLoading: true,
    token: null,
  });

  useEffect(() => {
    const token = verifyAuth();
    setState((prevState) => ({ ...prevState, token: token?.token }));
    const getTutorApi = async (token, tutor_id) => {
      await APIsRequests
        .getTutorApi(token?.token, tutor_id)
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

    getTutorApi(token, tutor_id);
  }, [tutor_id]);

  if (state?.isLoading) return <p>Loading....</p>;

  return (
    <div className="SingleMainPage">
      <Navbar page="dashboard-admin" />
      <h1>Single Tutor Page</h1>
      <ul className="MainListPage">
        <li className="List__card">
          <p>
            <b>Tutor Name: </b> {state?.data?.tutor_firstname}
          </p>
          <p>
            <b>Tutor Last Name: </b>
            {state?.data?.tutor_lastname}
          </p>
          <p>
            <b>Tutor ID: </b>
            {state?.data?.tutor_id}
          </p>
          <p>
            <b>Tutor Code: </b>
            {state?.data?.tutor_email}
          </p>
          <p>
            <b>Tutor Password</b>
            {state?.data?.tutor_password}
          </p>
          <img
            className="ListImage"
            src={state?.data?.tutor_image}
            alt={state?.data?.tutor_firstname}
          />
        </li>
      </ul>

      <div style={{ margin: "20px 20px" }}>
        {" "}
        <DeleteTutor
          token={state?.token}
          course_id={state?.data?.tutor_id}
        />{" "}
      </div>
      <div style={{ margin: "20px 20px" }}>
        {" "}
        <EditTutor token={state?.token} tutor={state?.data} />{" "}
      </div>
    </div>
  );
};

export default SingleTutor;
