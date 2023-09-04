import React from "react";
import {  deleteStudentApi } from '../../api/axios';
import { useNavigate } from "react-router-dom";
import StudentCSS from "../../css/student.module.css";

function DeleteStudent(props) {
  const navigate = useNavigate();
  const deleteStudentButton = () => {
    console.log(props.student_id);
    deleteStudentApi(props.student_id).then(() => {
      navigate('/studentlist')
      // getTopicsApi(props.topic_id).then((topics) => {
      //   props.setTopic(topics);
      // });
    });
  };

  return (
    <div className={StudentCSS.DeleteStudentPage}>
      <button onClick={() => deleteStudentButton()}>Delete Student</button>
    </div>
  );
}
export default DeleteStudent;
