import React from 'react'
import { useEffect, useState } from "react";
import { getTopicsApi } from "../utils/api";
import { Link } from "react-router-dom";
import Search from "./Search";


function TopicList() {
    const [topicsList, setTopicList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getTopicsApi().then((res) => {
          console.log(res);
          setTopicList(res);
          setIsLoading(false);
        });
      }, []);
    
      if (isLoading) return <p>Loading....</p>;

    return (
        <main className="TopicListPage">
          <Search setSearchTerm={setSearchTerm} />
          <h1 className="List__h1"> TopicList </h1>
    
          <ul className="List">
            {topicsList.map((topic) => {
              return (
                <Link key={topic.topic_id} to={`/topics/${topic.topic_id}`}>
                  <li className="List__card">
                    <p><b>Topic Name: </b> {topic.topic_name}</p>
                    <p><b>Topic Code: </b>{topic.topic_code}</p>
                    <button> Click for more detail</button>
                   {/*  <p><b>Topic Description: </b>{topic.topic_desc}</p>
                    <p><b>Topic ID: </b>{topic.topic_id}</p>
                    <p><b>Topic Index:</b>{topic.topic_index}</p>
                    <p><b>Topic Course Id:</b>{topic.topic_course_id}</p> */}
                  </li>
                </Link>
              );
            })}
          </ul>
        </main>
      );
    }
export default TopicList
