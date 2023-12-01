import React from "react";
import { APIsRequests } from "../../../api/APIsRequests";

const DeleteTutor = (props) => {
  const handleDeleteTutor = async (event) => {
    event.preventDefault();
    await APIsRequests.deleteTutorApi(props?.authData?.token, props?.tutor_id)
      .then(() => {
        window.location.replace(`/tutorlist`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={(event) => handleDeleteTutor(event)}> DELETE TUTOR</button>
    </div>
  );
}

export default DeleteTutor;
