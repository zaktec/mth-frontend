import React from "react";
import { Link } from "react-router-dom";
import PostQuestion from "./PostQuestion";


const QuestionList = (props) => {
  if (props?.isLoading) return <p>Loading....</p>;

console.log(">>>",props)
  return (
 <div className="MainListPage">
      <h1 className="MainList__h1"> QuestionList </h1>

      <PostQuestion authData= {props?.authData} role={props?.role} />

      <ul className="Main__List">
        {props?.data.map((element) => {
          return (
            <Link key={element.question_id} to={`/${props?.role}/questions/${element.question_id}`}>
               <li className="MainList__card">
                <p><b>Question Id: </b> {element.question_id}</p>
                <p><b>Question Code: </b>{element.question_body}</p>
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
