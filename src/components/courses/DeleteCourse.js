import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteCourseApi } from "../../api/axios";
import CourseCSS from "../../css/course.module.css";


function DeleteCourse(props) {
  const navigate = useNavigate();
  const deleteCourseButton = () => {
    console.log(props.course_id);
   
    deleteCourseApi(props.course_id).then((course) =>

    {
      //props.setCourse(course);
      navigate('/courselist')
    //  getCoursesApi(props.course_id).then((course) => {
    //    
    });
  };

  return (
    <div>
      <button onClick={() => deleteCourseButton()}>Delete Course</button>
      
    </div>
  );
}

export default DeleteCourse;
