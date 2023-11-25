import React from "react";
import { APIsRequests } from "../../../api/APIsRequests";

const DeleteTutor = (props) => {
  const handleDeleteTutor = async (event, token, tutor_id) => {
    event.preventDefault();
    await APIsRequests
      .deleteTutorApi(token, tutor_id)
      .then((response) => {
        window.location.replace(`/tutorlist`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        onClick={(event) =>
          handleDeleteTutor(event, props?.token, props?.tutor_id)
        }>Delete Tutor</button>
    </div>
  );
      }
export default DeleteTutor;
