import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { APIsRequests } from '../../api/APIsRequests';

const DeleteCourse = (props) => {
  const handleDeleteCourse = async (event) => {
    event.preventDefault();

    await APIsRequests.deleteCourseApi(props?.authData.token, props?.course_id)
    .then(() => {
      toast.success('Course deleted successfully');
      setTimeout(() => {
        window.location.replace(`/${props?.role}/courses`);
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <ToastContainer />
      <button onClick={(key) => handleDeleteCourse(key)} >Delete Course</button>
    </div>
  );
}

export default DeleteCourse;
