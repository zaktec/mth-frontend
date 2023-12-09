import React from "react";
import { APIsRequests } from '../../api/APIsRequests';


const DeleteQuestion = (props) => {
  const handleDeleteQuestion = async (event, token, Question_id) => {
    event.preventDefault();
    await APIsRequests
      .deleteQuestionApi(token, Question_id)
      .then((response) => {
        window.location.replace(`/Questionlist`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        onClick={(key) =>
          handleDeleteQuestion(key, props?.token, props?.Question_id)
        }
      >
        Delete Question
      </button>
    </div>
  );
};

export default DeleteQuestion;
