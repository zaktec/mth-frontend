import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeleteQuestion from "./DeleteQuestion";
import EditQuestion from "./EditQuestion";
import Navbar from "../../navbar/Navbar";
import { verifyAuth } from "../../../helpers";
import { APIsRequests } from "../../../api/APIsRequests";

const SingleQuestion = (props) => {
  const { question_id } = useParams();
  const [state, setState] = useState({
    data: {},
    isLoading: true,
    token: null,
  });

  useEffect(() => {
    const token = verifyAuth();
    setState((prevState) => ({ ...prevState, token: token?.token }));
    const getQuestionApi = async (token, question_id) => {
      await APIsRequests
        .getQuestionApi(token?.token, question_id)
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

    getQuestionApi(token, question_id);
  }, [question_id]);

  if (state?.isLoading) return <p>Loading....</p>;

  return (
    <div className="SingleMainPage">
      <Navbar page="dashboard-admin" />
      <h1> Single Question page </h1>
      <ul className="MainListPage">
        <li className="MainList__card">
          <p>
            <b>Question ID :</b> {state?.data?.question_id}
          </p>
          <p>
            <b>Question Body :</b> {state?.data?.question_body}
          </p>
          <p>
            <b>Question Image :</b> {state?.data?.question_image}
          </p>
          <p>
            <b>Question Grade :</b> {state?.data?.question_grade}
          </p>
          <p>
            <b>Question Mark :</b> {state?.data?.question_mark}
          </p>
          <p>
            <b>Question 1 Answer :</b> {state?.data?.ques1_ans}
          </p>
          <p>
            <b>Question 2 Answer :</b> {state?.data?.ques2_ans}
          </p>
          <p>
            <b>Question 3 Answer :</b> {state?.data?.ques3_ans}
          </p>
          <p>
            <b>Question Answer Explained :</b> {state?.data?.ques_ans_explain}
          </p>
          <p>
            <b>Question Answer Mark:</b> {state?.data?.ques_ans_mark}
          </p>
          <p>
            <b>Question Answer Image :</b> {state?.data?.ques_ans_image}
          </p>
          <p>
            <b>Question Answer Correct:</b> {state?.data?.ques2_ans}
          </p>
          <b>Question symbol before :</b> {state?.data?.ques_ans_sym_b}
          <p>
            <b>Question symbol answer :</b> {state?.data?.sym_a}
          </p>
          <p>
            <b>Question quiz id :</b> {state?.data?.ques_quiz_id}
          </p>
          <p>
            <b>Question lesson id :</b> {state?.data?.ques_lesson_id}
          </p>
        </li>
      </ul>

      <div style={{ margin: "20px 20px" }}>
        {" "}
        <DeleteQuestion
          token={state?.token}
          question_id={state?.data?.question_id}
        />{" "}
      </div>
      <div style={{ margin: "20px 20px" }}>
        {" "}
        <EditQuestion token={state?.token} question={state?.data} />{" "}
      </div>
    </div>
  );
};

export default SingleQuestion;
