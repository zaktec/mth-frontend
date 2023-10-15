import React from "react";
import { authAPIsRequests } from "../../../api/APIsRequests";


const DeleteCourse = (props) => {
  const handleDeleteCourse = async (key, token, course_id) => {
    key.preventDefault();

    await authAPIsRequests.deleteCourseApi(token, course_id)
    .then((response) => {
      window.location.replace(`/courselist`);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <button onClick={(key) => handleDeleteCourse(key, props?.token, props?.course_id)} >Delete Course</button>
    </div>
  );
}

export default DeleteCourse;