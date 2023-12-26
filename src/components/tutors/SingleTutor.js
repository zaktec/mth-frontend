import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import EditTutor from './EditTutor';
import Navbar from '../navbar/Navbar';
import DeleteTutor from './DeleteTutor';
import { APIsRequests } from '../../api/APIsRequests';
import { verifyAuth, verifyRole } from '../../helpers';

const SingleTutor = () => {
  const { role } = useParams();
  const { tutor_id } = useParams();
  const [state, setState] = useState({
    data: {},
    authData: {},
    isLoading: true,
  });

  useEffect(() => {
    verifyRole(role);
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData: authData }));
    const getTutorApi = async (token, tutor_id) => {
      await APIsRequests.getTutorApi(token, tutor_id)
        .then((response) => {
          return setState((prevState) => ({
            ...prevState,
            isLoading: false,
            data: response?.data?.data,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getTutorApi(authData?.token, tutor_id);
  }, [role, tutor_id]);

  if (state?.isLoading) return <p>Loading....</p>;

  return (
    <div className='SingleMainPage'>
      <Navbar authData={state?.authData} page={`${role}-dashboard`} />
      <h1>TUTOR DETAIL</h1>
      <ul className='MainListPage'>
        <p>
          <b>Tutor Name: </b> {state?.data?.tutor_firstname}
        </p>
        <p>
          <b>Tutor Last Name: </b> {state?.data?.tutor_lastname}
        </p>
        <p>
          <b>Tutor ID: </b> {state?.data?.tutor_id}
        </p>
        <p>
          <b>Tutor Code: </b> {state?.data?.tutor_email}
        </p>
        <img
          className='ListImage'
          src={state?.data?.tutor_image}
          alt={state?.data?.tutor_firstname}
        />
      </ul>

      <div style={{ margin: '20px 20px' }}>
        <EditTutor authData={state?.authData} role={role} tutor={state?.data} />
      </div>
      <div style={{ margin: '20px 20px' }}>
        <DeleteTutor authData={state?.authData} role={role} tutor_id={tutor_id} />
      </div>
    </div>
  );
};

export default SingleTutor;
