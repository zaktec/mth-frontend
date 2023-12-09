import React from "react";
import { Link } from "react-router-dom";
import PostTopic from "./PostTopic";

const TopicList = (props) => {
  if (props?.isLoading) return <p>Loading....</p>;

  return (
    <div className="MainListPage">
      <h1 className="MainList__h1"> TopicList </h1>
      {<PostTopic setTopicListtoken={props?.token} />}

      <ul className="Main__List">
        {props?.data.map((element) => (
          <Link key={element.topic_id} to={`/topics/${element.topic_id}`}>
            <li className="MainList__card">
              <p>
                <b>Topic Name: </b> {element.topic_name}
              </p>
              <p>
                <b>Topic Code: </b> {element.topic_code}
              </p>
              <button> Click for more detail</button>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
export default TopicList;
