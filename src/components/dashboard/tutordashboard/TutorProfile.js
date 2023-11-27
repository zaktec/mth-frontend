import React, { useState, useEffect } from 'react';
import { APIsRequests } from '../../../api/APIsRequests';
import EditTutor from '../../admin/tutors/EditTutor';
import TutorStudents from './TutorStudents';

const TutorProfile = (props) => {
  console.log(props)
  const [state, setState] = useState({
    data: [],
    isLoading: true
  });

  useEffect(() => {
    const getTutorProfile = async (token, tutorId) => {
      await APIsRequests.getTutorApi(token, tutorId)
        .then((response) => {
          return setState((prevState) => ({
            ...prevState,
            isLoading: false,
            data: response?.data?.data,
          }));
        })
        .catch((error) => console.log(error))
    };

    getTutorProfile(props?.authData?.token, props?.authData?.user?.tutor_id);
  }, [props?.authData?.token, props?.authData?.user?.tutor_id]);

  if (state.isLoading) return <p>Loading....</p>;
  return (
    <div className="SingleMainPage">
      <h1>Tutor Dashboard</h1>
      <ul className="MainListPage">
        <li className="List__card">
          <p>
           
            <b>Tutor UserName: </b> {state?.data?.tutor_username}
          </p>
          <p>
            <b>Tutor Name: </b> {state?.data?.tutor_firstname}
          </p>
          <p>
            <b>Tutor Last Name: </b> {state?.data?.tutor_lastname}
          </p>
          <p>
            <b>Tutor Password</b> {state?.data?.tutor_password}
          </p>
          <b>Tutor Image :</b> {state?.data?.tutor_image}
        </li>
      </ul>

      <div style={{ margin: "20px 20px" }}>
        {" "}
        <EditTutor token={props?.authData?.token} tutor={state?.data} />{" "}
      </div>

      <div style={{ margin: "20px 20px" }}>
        <TutorStudents token={props?.authData?.token} tutor={state?.data} />{" "}
      </div>
    </div>
  );
};

export default TutorProfile;
