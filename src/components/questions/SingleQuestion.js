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
      <h1> Single Question page </h1>
      <ul className="LessonList">
        <li className="LessonList__card">
        <p>
            <b>Question ID :</b> {question.ques_id}
          </p>
          <p>
            <b>Question Body :</b> {question.ques_body}
          </p>
          <p>
            <b>Question Image :</b> {question.ques_image}
          </p>
          <p>
            <b>Question Grade :</b> {question.ques_grade}
          </p>
          <p>
            <b>Question Mark :</b> {question.ques_mark}
          </p>
          <p>
            <b>Question 1 Answer :</b> {question.ques1_ans}
          </p>
          <p>
            <b>Question 2 Answer :</b> {question.ques2_ans}
          </p>
          <p>
            <b>Question 3 Answer :</b> {question.ques3_ans}
          </p>
          <p>
            <b>Question Answer Explained :</b> {question.ques_ans_explain}
          </p>
          <p>
            <b>Question Answer Mark:</b> {question.ques_ans_mark}
          </p>
          <p>
            <b>Question Answer Image :</b> {question.ques_ans_image}
          </p>
          <p>
            <b>Question Answer Correct:</b> {question.ques2_ans}
          </p>
          
            <b>Question symbol before :</b> {question.ques_ans_sym_b}
            <p>
            <b>Question symbol answer :</b> {question.sym_a}
          </p>
          
          <p>
            <b>Question quiz id :</b> {question.ques_quiz_id}
          </p>
             
          <p>
            <b>Question lesson id :</b> {question.ques_lesson_id}
          </p>


          <DeleteQuestion
            question_id={question.ques_id}
            setQuestion={setQuestion}
          /> 
         
        
        </li>
      </ul>
    </main>
  );
}

export default SingleQuestion;