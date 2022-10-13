import React from "react";
import {  deleteStudentApi } from '../../utils/api';
import { useNavigate } from "react-router-dom";

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
    <div>
      <button onClick={() => deleteStudentButton()}>Delete Student</button>
    </div>
  );
}
export default DeleteStudent;