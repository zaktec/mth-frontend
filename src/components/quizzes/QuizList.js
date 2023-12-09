import React from "react";
import { Link } from "react-router-dom";
import PostQuiz from "./PostQuiz";


// import Search from "../Search";

const QuizList =(props) => {
  
  if (props?.isLoading) return <p>Loading....</p>;
  

  return (
    <div className="MainListPage">
    <h1 className="MainList__h1"> QuizList </h1>
     
    <PostQuiz token= {props?.token} />

    <ul className="Main__List">
        {props?.data.map((element) => {
          return (
            <Link key={element.quiz_id} to={`/quizzes/${element.quiz_id}`}>
              <li className="MainList__card">
                <p><b>Quiz Name: </b> {element.quiz_name}</p>
                <p><b>Quiz Code: </b>{element.quiz_code}</p>
                <button> Click for more detail</button>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default QuizList;
