import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditTopic from "./EditTopic";
import DeleteTopic from "./DeleteTopic";
import { verifyAuth } from "../../../helpers";
import { APIsRequests } from "../../../api/APIsRequests";
import Navbar from "../../navbar/Navbar";


const SingleTopic = () => {
  const { topic_id } = useParams();
  const [state, setState] = useState({ data: {}, isLoading: true, token: null });


  useEffect(() => {
    const token =  verifyAuth();
    setState((prevState) => ({...prevState, token: token?.token }));
    const getTopicApi = async (token, topic_id) => {  
      await APIsRequests.getTopicApi(token?.token, topic_id)
        .then((response) => {
          return setState((prevState) => ({...prevState, data: response?.data?.data, isLoading: false }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getTopicApi(token, topic_id);
  }, [topic_id]);

  if (state?.isLoading) return <p>Loading....</p>;


  return (
    <div className="SingleMainPage">
      <Navbar page='admin-dashboard' />
      <h1>Single topic Page</h1>
      <ul className="MainListPage">
        <li className="MainList__card">
          <p>
            <b>Topic Name: </b> {state?.data?.topic_name}
          </p>
          <p>
            <b>Topic Description: </b>
            {state?.data?.topic_desc}
          </p>
          <p>
            <b>Topic ID: </b>
            {state?.data?.topic_id}
          </p>
          <p>
            <b>Topic Code: </b>
            {state?.data?.topic_code}
          </p>
          <p>
            <b>Topic Index:</b>
            {state?.data?.topic_index}
          </p>
          <p>
            <b>Topic Course ID:</b>
            {state?.data?.topic_course_id}
          </p>

          </li>
      </ul>

      <div style={{ margin: '20px 20px' }}> <DeleteTopic token= {state?.token} course_id={state?.data?.course_id} /> </div>
      <div style={{ margin: '20px 20px' }}> <EditTopic token= {state?.token} course={state?.data} /> </div>
    </div>
  );
}

export default SingleTopic;
