import React from "react";
import {  deleteTopicApi } from '../../utils/api';
import { useNavigate } from "react-router-dom";
import TutorCSS from "../../css/tutor.module.css";

function DeleteTutor(props) {
  const navigate = useNavigate();
  const deleteTopicButton = () => {
    console.log(props.topic_id);
    deleteTopicApi(props.topic_id).then(() => {
      navigate('/tutorlist')
      // getTopicsApi(props.topic_id).then((topics) => {
      //   props.setTopic(topics);
      // });
    });
  };

  return (
    <div className={TutorCSS.DeleteTutorPage}>
      <button onClick={() => deleteTopicButton()}>Delete Topic</button>
    </div>
  );
}
export default DeleteTutor;
