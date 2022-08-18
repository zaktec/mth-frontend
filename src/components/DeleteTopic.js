import React from "react";
import {  deleteTopicApi, getTopicsApi } from "../utils/api";

function DeleteTopic(props) {
  const deleteTopicButton = () => {
    console.log(props.topic_id);
    deleteTopicApi(props.topic_id).then(() => {
      getTopicsApi(props.topic_id).then((topics) => {
        props.setTopic(topics);
      });
    });
  };

  return (
    <div>
      <button onClick={() => deleteTopicButton()}>Delete Topic</button>
    </div>
  );
}
export default DeleteTopic;
