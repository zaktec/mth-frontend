import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteLessonApi } from "../../utils/api";


function DeleteLesson(props) {
  const navigate = useNavigate();
  const deleteLessonButton = () => {
    console.log(props.lesson_id);
   
    deleteLessonApi(props.lesson_id).then(() =>

    {
      //props.setCourse(course);
      navigate('/lessonlist')
    //  getCoursesApi(props.course_id).then((course) => {
    //    
    });
  };

  return (
    <div>
      <button onClick={() => deleteLessonButton()}>Delete Lesson</button>
      
    </div>
  );
}

export default DeleteLesson;
