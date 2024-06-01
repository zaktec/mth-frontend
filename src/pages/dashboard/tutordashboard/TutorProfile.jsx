import React, { useState, useEffect } from "react";

import TutorStudents from "./TutorStudents";
import EditTutor from "../../tutors/EditTutor";
import { APIsRequests } from '../../../api/APIsRequests';

const TutorProfile = (props) => {
  const [state, setState] = useState({
    data: {},
    isLoading: true,
  });

  useEffect(() => {
    const getTutorProfile = async (token, tutor_id) => {
      await APIsRequests.getTutorApi(token, tutor_id)
        .then((response) => {
          return setState((prevState) => ({
            ...prevState,
            isLoading: false,
            data: response?.data?.data,
          }));
        })
        .catch((error) => console.log(error));
    };

    getTutorProfile(props?.authData?.token, props?.authData?.user?.tutor_id);
  }, [props?.authData?.token, props?.authData?.user?.tutor_id]);

  if (state.isLoading) return <p>Loading....</p>;

  return (
    <div className="SingleMainPage">
      <h1>TUTOR DASHBOARD</h1>
      <p>
        <b>Tutor UserName: </b> {state?.data?.tutor_username}
      </p>
      <p>
        <b>Tutor Name: </b> {state?.data?.tutor_firstname}
      </p>
      <p>
        <b>Tutor Last Name: </b> {state?.data?.tutor_lastname}
      </p>
      <img
        className="ListImage"
        src={state?.data?.tutor_image}
        alt={state?.data?.tutor_firstname}
      />

      <div style={{ margin: "20px 20px" }}>
        <EditTutor authData={props?.authData} tutor={state?.data} />
      </div>
      <div style={{ margin: "20px 20px" }}>
        <TutorStudents authData={props?.authData} />
      </div>
    </div>
  );
};

export default TutorProfile;
