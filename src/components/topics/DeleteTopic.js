import React from "react";
import { APIsRequests } from '../../api/APIsRequests';

const DeleteTopic = (props) => {
  const handleDeleteTopic = async (key, token, topic_id) => {
    key.preventDefault();

    await APIsRequests.deleteTopicApi(token, topic_id)
    .then((response) => {
      window.location.replace(`/${props?.role}/courses`);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <button onClick={(key) => handleDeleteTopic(key, props?.token, props?.topic_id)} >Delete Topic</button>
    </div>
  );
}

export default DeleteTopic;
