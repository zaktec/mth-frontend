import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import EditQuiz from './EditQuiz';
import DeleteQuiz from './DeleteQuiz';
import { verifyAuth } from '../../helpers/index';
import Navbar from '../../components/navbar/Navbar';
import { APIsRequests } from '../../api/APIsRequests';


const SingleQuiz = () => {
  const { role, quiz_id } = useParams();
  const [state, setState] = useState({
    data: {},
    isLoading: true,
    authData: {},
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData }));
    const getQuizApi = async (token, quiz_id) => {
      await APIsRequests.getQuizApi(token, quiz_id)
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

    getQuizApi(authData?.token, quiz_id);
  }, [quiz_id]);

  if (state?.isLoading) return <p>Loading....</p>;

  return (
    <div className='SingleMainPage'>
      <Navbar authData={state?.authData} page={`${role}-dashboard`} />

      <h1> Single Quiz page </h1>
      <ul className='MainListPage'>
        <li className='MainList__card'>
          <p>
            <b>Quiz ID :</b> {state?.data?.quiz_id}
          </p>
          <p>
            <b>Quiz Name :</b> {state?.data?.quiz_name}
          </p>
          <p>
            <b>Quiz Code :</b> {state?.data?.quiz_code}
          </p>
          <p>
            <b>Quiz Type :</b> {state?.data?.quiz_type}
          </p>
        </li>
      </ul>

      <div style={{ margin: '20px 20px' }}>
        <DeleteQuiz authData={state?.authData} role={role} quiz_id={quiz_id} /></div>
      <div style={{ margin: '20px 20px' }}>
        <EditQuiz token={state?.authData} role={role} quiz={state?.data} />
      </div>
    </div>
  );
};

export default SingleQuiz;
