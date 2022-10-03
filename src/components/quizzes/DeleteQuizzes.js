import React from "react";
import {  deleteQuizApi } from '../../utils/api';
import { useNavigate } from "react-router-dom";

function DeleteQuizzes(props) {
  const navigate = useNavigate();
  const deleteQuizButton = () => {
    console.log(props.quiz_id);
    deleteQuizApi(props.quiz_id).then(() => {
      navigate('/quizlist')
      // getTopicsApi(props.topic_id).then((topics) => {
      //   props.setTopic(topics);
      // });
    });
  };

  return (
    <div>
      <button onClick={() => deleteQuizButton()}>Delete Quiz</button>
    </div>
  );
}
export default DeleteQuizzes;
