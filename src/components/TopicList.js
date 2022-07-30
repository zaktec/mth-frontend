import React from 'react'
import { useEffect, useState } from "react";
import { getTopics, getTopicsApi } from "../utils/api";
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
                    <p><b>Topic Description: </b>{topic.topic_desc}</p>
                    <p><b>Topic ID: </b>{topic.topic_id}</p>
                    <p><b>Topic Code: </b>{topic.topic_code}</p>
                    <p><b>Topic Level:</b>{topic.topic_level}</p>
                    <img clasName="ListImage" src={topic.topic_image}
                      alt={topic.topic_name}/>
                  </li>
                </Link>
              );
            })}
          </ul>
        </main>
      );
    }
export default TopicList
