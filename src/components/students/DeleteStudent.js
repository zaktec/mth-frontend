import React from "react";
import { APIsRequests } from '../../api/APIsRequests';

const DeleteStudent = (props) => {
  const handleDeleteStudent = async (event) => {
    event.preventDefault();
    await APIsRequests.deleteLessonApi(props?.authData?.token, props?.student_id)
      .then(() => {
        window.location.replace(`/${props?.role}/students`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={(event) =>handleDeleteStudent(event)}>DELETE STUDENT</button>
    </div>
  );
};

export default DeleteStudent;
