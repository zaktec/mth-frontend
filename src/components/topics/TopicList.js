import React from "react";
import { useEffect, useState } from "react";
import { getTopicsApi } from "../../utils/api";
import { Link } from "react-router-dom";
import PostTopic from "./PostTopic";
//import Search from "../Search";

function TopicList(props) {
  const [topicsList, setTopicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [searchTerm, setSearchTerm] = useState("");
  //const { SortBy } = props.sortBy

  //console.log(">>>",SortBy)

  useEffect(() => {
    getTopicsApi(props.sortBy).then((topicsFromApi) => {
      console.log(topicsFromApi);
      setTopicList(topicsFromApi);
      setIsLoading(false);
    });
  }, [props.sortBy]);

  if (isLoading) return <p>Loading....</p>;

  return (
    <main className="TopicListPage">
      {/* <Search setSearchTerm={setSearchTerm} /> */}
      <h1 className="List__h1"> TopicList </h1>
      <PostTopic
            setTopicList={setTopicList}/>

      <ul className="Topic__List">
        {topicsList.map((topic) => {
          return (
            <Link key={topic.topic_id} to={`/topics/${topic.topic_id}`}>
              <li className="TopicList__card">
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
    </main>
  );
}
export default TopicList;
