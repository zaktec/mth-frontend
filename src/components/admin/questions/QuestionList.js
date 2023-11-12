import React from "react";
import { Link } from "react-router-dom";
import PostQuestion from "./PostQuestion";


// import Search from "../Search";

const QuestionList = (props) => {
  if (props?.isLoading) return <p>Loading....</p>;


  return (
 <div className="MainListPage">
      <h1 className="MainList__h1"> QuestionList </h1>

      <PostQuestion token= {props?.token} />

      <ul className="Main__List">
        {props?.data.map((question) => {
          return (
            <Link key={question.question_id} to={`/questions/${question.question_id}`}>
               <li className="MainList__card">
                <p><b>Question Id: </b> {question.question_id}</p>
                <p><b>Question Code: </b>{question.question_body}</p>
                <button> Click for more detail</button>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default QuestionList;
