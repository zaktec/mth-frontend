import React from "react";
import { authAPIsRequests } from "../../../api/APIsRequests";

const DeleteStudent = (props) => {
  const handleDeleteStudent = async (event, token, student_id) => {
    event.preventDefault();
    await authAPIsRequests
      .deleteLessonApi(token, student_id)
      .then((response) => {
        window.location.replace(`/studentlist`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        onClick={(event) =>
          handleDeleteStudent(event, props?.token, props?.student_id)
        }>Delete Student</button>
    </div>
  );
};
export default DeleteStudent;
