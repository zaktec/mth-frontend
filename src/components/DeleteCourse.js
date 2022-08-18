import React from "react";
import { deleteCourseApi, getCoursesApi } from "../utils/api";

function DeleteCourse(props) {
  const deleteCourseButton = () => {
    console.log(props.course_id);
    deleteCourseApi(props.course_id).then(() => {
      getCoursesApi(props.course_id).then((course) => {
        props.setCourse(course);
      });
    });
  };

  return (
    <div>
      <button onClick={() => deleteCourseButton()}>Delete Course</button>
    </div>
  );
}

export default DeleteCourse;
