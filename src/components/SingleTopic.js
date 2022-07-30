import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {  getSingleTopicApi } from "../utils/api";
import EditCourse from "./EditCourse";
import DeleteCourse from "./DeleteCourse";


function SingleTopic() {
const { topic_id } = useParams();
  const [topic, settopic] = useState({});
  const [topicName, setTopicName] = useState([]);

  useEffect(() => {
    getSingleTopicApi(topic_id).then((res) => {
      console.log(res);
      settopic(res);
    });
  }, [topic_id]);
  return (
    <main>
      <h1>Single topic Page</h1>
      <ul className="List">
        <li className="List__card">
          <p>
            <b>Topic Name: </b> {topic.topic_name}
          </p>
          <p>
            <b>topic Description: </b>
            {topic.topic_desc}
          </p>
          <p>
            <b>topic ID: </b>
            {topic.topic_id}
          </p>
          <p>
            <b>topic Code: </b>
            {topic.topic_code}
          </p>
          <p>
            <b>topic Level:</b>
            {topic.topic_level}
          </p>
          <img
            clasName="ListImage"
            src={topic.topic_image}
            alt={topic.topic_name}
          />

<EditCourse 
          course_id={topic.topic_id} 
          setCourseName= {setTopicName}/>

<DeleteCourse 
          course_id={topic.topic_id} 
          setCourseName= {setTopicName}/>
        
        </li>
      </ul>
    </main>
  );
}

export default SingleTopic
