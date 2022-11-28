import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteQuestionApi, getCoursesApi } from "../../utils/api";


function DeleteQuestion(props) {
  const navigate = useNavigate();
  const deleteQuestionButton = () => {
    console.log(props.question_id);
   
    deleteQuestionApi(props.question_id).then(() =>

    {
      console.log(props.question_id, "deleted" )
      //props.setCourse(course);
      navigate('/questionlist')
    //  getCoursesApi(props.course_id).then((course) => {
    //    
    });
  };

  return (
    <div>
      <button onClick={() => deleteQuestionButton()}>Delete Lesson</button>
      
    </div>
  );
}

export default DeleteQuestion;
