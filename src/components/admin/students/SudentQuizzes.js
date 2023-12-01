import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { APIsRequests } from "../../../api/APIsRequests";

const StudentQuizzes = (props) => {
  const { student_id } = useParams();
  const [state, setState] = useState({
    displayForm: false,
    isLoading: true,
    data: [],
  });

  useEffect(() => {
    const getStudentQuizzes = async (token, student_id) => {
      await APIsRequests.getStudentQuizzes(token, student_id)
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

    getStudentQuizzes(props?.authData?.token, student_id);
  }, [props?.authData?.token, student_id]);

  const handleDisplayForm = async (event) => {
    event.preventDefault();
    if (state.displayForm === true)
      return setState((prevState) => ({ ...prevState, displayForm: false }));
    if (state.displayForm === false)
      return setState((prevState) => ({ ...prevState, displayForm: true }));
  };

  if (state.isLoading) return <p>Loading....</p>;

  return (
    <div className="EditMainPage">
      {state?.displayForm === true ? (
        <button onClick={(event) => handleDisplayForm(event)}> QUIZZES </button>
      ) : (
        <button onClick={(event) => handleDisplayForm(event)}> SEE QUIZZES </button>
      )}

      {state.displayForm === true && (
        <ul className={'Main__List'}>
        { state.data.map((quiz) => (
          <li key={quiz.studentquiz_id} className={'MainList__card'}>
            <p> <b>Quiz Name :</b> {quiz.quiz_name} </p>
            <p> <b>Quiz Code :</b> {quiz.quiz_code} </p>
            <p> <b>Quiz Desc :</b> {quiz.quiz_desc} </p>
            <p> <b>Quiz Type :</b> {quiz.quiz_type} </p>
            <p> <b>Quiz Calc :</b> {quiz.quiz_calc} </p>
            <p> <b>Quiz Result :</b> {quiz.studentquiz_result} </p>
            <p> <b>Quiz Percent :</b> {quiz.studentquiz_percent} </p>
            <p> <b>Quiz Feedback :</b> {quiz.studentquiz_feedback} </p>
          </li>
        ))}
        </ul>
      )}
    </div>
  );
};

export default StudentQuizzes;
