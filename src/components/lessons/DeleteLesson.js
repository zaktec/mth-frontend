import React from "react";
import { APIsRequests } from '../../api/APIsRequests';

const DeleteLesson = (props) => {
  const handleDeleteLesson = async (event, token, lesson_id) => {
    event.preventDefault();
    await APIsRequests
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
