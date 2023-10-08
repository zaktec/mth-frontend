import React from "react";
import { authAPIsRequests } from "../../../api/APIsRequests";

const DeleteLesson = (props) => {
  const handleDeleteLesson = async (key, token, lesson_id) => {
    key.preventDefault();
    await authAPIsRequests
      .deleteLessonApi(token, lesson_id)
      .then((response) => {
        window.location.replace(`/lessonlist`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        onClick={(key) =>
          handleDeleteLesson(key, props?.token, props?.lesson_id)
        }
      >
        Delete Lesson
      </button>
    </div>
  );
};

export default DeleteLesson;
