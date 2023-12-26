import React from "react";
import { APIsRequests } from '../../api/APIsRequests';
import { ToastContainer, toast } from 'react-toastify';


const DeleteQuestion = (props) => {
  const handleDeleteQuestion = async (event) => {
    event.preventDefault();
    await APIsRequests
      .deleteQuestionApi(props?.authData.token, props?.question_id)
      .then((response) => {
        toast.success('Course deleted successfully');
        setTimeout(() => {
        window.location.replace(`/${props?.role}/questions`);
      }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
       <ToastContainer />
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
