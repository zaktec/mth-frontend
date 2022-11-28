import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleTopicApi } from "../../utils/api";
import EditTopic from "./EditTopic";
import DeleteTopic from "./DeleteTopic";
import TopicCSS from "../../css/topic.module.css";

function SingleTopic() {
  const { topic_id } = useParams();
  const [topic, setTopic] = useState({});

  useEffect(() => {
    getSingleTopicApi(topic_id).then((res) => {
      console.log(res);
      setTopic(res);
    });
  }, [topic_id]);
  return (
    <main className={TopicCSS.SingleTopicPage}>
      <h1>Single topic Page</h1>
      <ul className={TopicCSS.TopicList}>
        <li className={TopicCSS.TopicList__card}>
          <p>
            <b>Topic Name: </b> {topic.topic_name}
          </p>
          <p>
            <b>Topic Description: </b>
            {topic.topic_desc}
          </p>
          <p>
            <b>Topic ID: </b>
            {topic.topic_id}
          </p>
          <p>
            <b>Topic Code: </b>
            {topic.topic_code}
          </p>
          <p>
            <b>Topic Index:</b>
            {topic.topic_index}
          </p>
          <p>
            <b>Topic Course ID:</b>
            {topic.topic_course_id}
          </p>

          <DeleteTopic topic_id={topic.topic_id} setTopic={setTopic} 
          />

          <EditTopic topic={topic} />
        </li>
      </ul>
    </main>
  );
}

export default SingleTopic;
