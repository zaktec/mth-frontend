import React from "react";
import {  deleteTopicApi, getTopicsApi } from "../utils/api";

function DeleteTopic(props) {
  const deleteTopicButton = () => {
    console.log(props.comment_id);
    deleteTopicApi(props.topics_id).then(() => {
      getTopicsApi(props.topic_id).then((comments) => {
        props.setComments(comments);
      });
    });
  };

  return (
    <div>
      return{" "}
      <button onClick={() => deleteTopicButton()}>Delete Topic</button>;
    </div>
  );
}
export default DeleteTopic;
