import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditQuiz from "./EditQuiz";
import { verifyAuth } from "../../../helpers";
import { APIsRequests } from "../../../api/APIsRequests";
import Navbar from "../../navbar/Navbar";
import DeleteQuiz from "./DeleteQuiz.js";


const SingleQuiz = () => {
  const { quiz_id } = useParams();
  const [state, setState] = useState({ data: {}, isLoading: true, token: null });

  useEffect(() => {
    const token =  verifyAuth();
    setState((prevState) => ({...prevState, token: token?.token }));
    const getQuizApi = async (token, quiz_id) => {  
      await APIsRequests.getQuizApi(token?.token, quiz_id)
        .then((response) => {
          return setState((prevState) => ({...prevState, data: response?.data?.data, isLoading: false }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getQuizApi(token, quiz_id);
  }, [quiz_id]);

  if (state?.isLoading) return <p>Loading....</p>;

  return (
    <div className="SingleMainPage">
    <Navbar page='dashboard-admin' />

      <h1> Single Quiz page </h1>
      <ul className="MainListPage">
        <li className="MainList__card">
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
      <div style={{ margin: '20px 20px' }}> <DeleteQuiz token= {state?.token} quiz_id={state?.data?.quiz_id} /> </div>
      <div style={{ margin: '20px 20px' }}> <EditQuiz token= {state?.token} quiz={state?.data} /> </div>
    </div>
  
  );
}

export default SingleQuiz;