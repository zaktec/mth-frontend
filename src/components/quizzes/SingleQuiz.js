import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleQuizApi } from "../../utils/api";
import DeleteQuizzes from "./DeleteQuizzes";


function SingleQuiz() {
  const { quiz_id } = useParams();
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    
    getSingleQuizApi(quiz_id).then((res) => {
      setQuiz(res);
      console.log("single",res)
    });
  }, [quiz_id]);
 

  return (
    <main className="SinglelessonPage">
      <h1> Single Quiz page </h1>
      <ul className="LessonList">
        <li className="LessonList__card">
        <p>
            <b>Quiz ID :</b> {quiz.quiz_id}
          </p>
          <p>
            <b>Quiz Name :</b> {quiz.quiz_name}
          </p>
          <p>
            <b>Quiz Code :</b> {quiz.quiz_code}
          </p>
          <p>
            <b>Quiz Type :</b> {quiz.quiz_type}
          </p>
          
          <DeleteQuizzes quiz_id={quiz.quiz_id} setQuiz={setQuiz} 
          />
         
          {/* <EditStudent student = {student}
           setStudent={setStudent} /> */}
        </li>
      </ul>
    </main>
  );
}

export default SingleQuiz;