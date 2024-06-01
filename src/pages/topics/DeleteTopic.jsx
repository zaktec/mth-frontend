import React from "react";
import { APIsRequests } from '../../api/APIsRequests';
import { ToastContainer, toast } from 'react-toastify';

const DeleteTopic = (props) => {
  const handleDeleteTopic = async (event) => {
    event.preventDefault();

    await APIsRequests.deleteTopicApi(props?.authData.token, props?.topic_id)
    .then((response) => {
      toast.success('Topic deleted successfully');
      window.location.replace(`/${props?.role}/topics`);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
       <ToastContainer />
      <button onClick={(key) => handleDeleteTopic(key, props?.token, props?.topic_id)} >Delete Topic</button>
    </div>
  );
}

export default DeleteTopic;
