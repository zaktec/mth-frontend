import React from "react";
import { APIsRequests } from "../../api/APIsRequests";
import { ToastContainer, toast } from "react-toastify";

const DeleteLesson = (props) => {
  const handleDeleteLesson = async (event) => {
    event.preventDefault();
    await APIsRequests.deleteLessonApi(props?.authData.token, props?.lesson_id)
      .then((response) => {
        toast.success("Lesson deleted successfully");
        setTimeout(() => {
          window.location.replace(`/${props?.role}/lessons`);
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
          handleDeleteLesson(key, props?.token, props?.lesson_id)
        }>Delete Lesson
      </button>
    </div>
  );
};

export default DeleteLesson;
