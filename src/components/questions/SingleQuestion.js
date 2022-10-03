import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleQuestionApi } from "../../utils/api";
import DeleteQuestion from "./DeleteQuestion";


function SingleQuestion() {
  const { ques_id } = useParams();
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    
    getSingleQuestionApi(ques_id).then((res) => {
      setQuestion(res);
      console.log("single",res)
    });
  }, [ques_id]);
 

  return (
    <main className="SinglelessonPage">
      <h1> Single Quiz page </h1>
      <ul className="LessonList">
        <li className="LessonList__card">
        <p>
            <b>Question ID :</b> {question.question_id}
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
           
          <DeleteQuestion
            question_id={question.lesson_id}
            setLessonName={setLesson}
          /> 
         
          {/* <EditStudent student = {student}
           setStudent={setStudent} /> */}
        </li>
      </ul>
    </main>
  );
}

export default SingleQuestion;