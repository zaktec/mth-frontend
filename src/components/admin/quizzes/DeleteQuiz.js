import React from "react";
import { authAPIsRequests } from "../../../api/APIsRequests";

const DeleteQuiz = (props) =>{
  const handleDeleteQuiz = async (event, token, quiz_id) => {
    event.preventDefault();
    await authAPIsRequests
      .deleteQuizApi(token, quiz_id)
      .then((response) => {
        window.location.replace(`/quizlist`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        onClick={(key) =>
          handleDeleteQuiz(key, props?.token, props?.quiz_id)
        }>
        Delete Quiz
      </button>
    </div>
  );
};


export default DeleteQuiz;
