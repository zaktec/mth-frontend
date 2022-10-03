import React from "react";
import {  deleteTopicApi, getTopicsApi } from '../../utils/api';
import { useNavigate } from "react-router-dom";

function DeleteTopic(props) {
  const navigate = useNavigate();
  const deleteTopicButton = () => {
    console.log(props.topic_id);
    deleteTopicApi(props.topic_id).then(() => {
      navigate('/courselist')
      // getTopicsApi(props.topic_id).then((topics) => {
      //   props.setTopic(topics);
      // });
    });
  };

  return (
    <div>
      <button onClick={() => deleteTopicButton()}>Delete Topic</button>
    </div>
  );
}
export default DeleteTopic;
