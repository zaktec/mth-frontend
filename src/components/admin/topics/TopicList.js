import React from "react";
import { Link } from "react-router-dom";
import PostTopic from "./PostTopic";



const TopicList = (props) =>  {
  if (props?.isLoading) return <p>Loading....</p>;
 
console.log(props)
  return (
    <div className="MainListPage">
    <h1 className="MainList__h1"> TopicList </h1>

    {   <PostTopic
            setTopicListtoken= {props?.token}/> }

<ul className="Main__List">
      {props?.data.map((topic) => {
          return (
            <Link key={topic.topic_id} to={`/topics/${topic.topic_id}`}>
               <li className="MainList__card">
                <p>
                  <b>Topic Name: </b> {topic.topic_name}
                </p>
                <p>
                  <b>Topic Code: </b>
                  {topic.topic_code}
                </p>
                <button> Click for more detail</button>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
export default TopicList;
