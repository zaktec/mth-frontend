import React, { useState } from "react";
import { patchQuizApi } from "../../api/axios";
import QuizCSS from "../../css/quiz.module.css";

function EditQuiz(props) {
  const { quiz } = props;
  const [displayPost, setPostDisplay] = useState(false);
  const [newQuizName, setnewQuizName] = useState("");
  const [newQuizCode, setnewQuizCode] = useState("");
 
  const [newQuestionMark, setnewQuestionMark] = useState("");
  const [newQuizType, setnewQuizType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = {
      quiz_name: newQuizName === "" ? quiz.quiz_name : newQuizName,
      quiz_code: newQuizCode === "" ? quiz.quiz_code: newQuizCode,
      quiz_type: newQuizType === "" ? quiz.quiz_type: newQuizType,
    };

    // newObject.course_image = 0;

    patchQuizApi(quiz.quiz_id,newObject).then((response) => {
    
    });
  };
  return (
    <div className={QuizCSS.EditQuizPage}>
      <button
        onClick={() =>
          setPostDisplay((currentValue) => {
            return !currentValue;
          })
        }
      >
        Edit Quiz
      </button>
      {displayPost ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Please Insert Quiz Name </p>
              <input
                name="newQuizName"
                placeholder= {quiz.quiz_name} 
                onChange={(event) => setnewQuizName(event.target.value)}
                value={newQuizName}
              />
              <p>Please Insert Your Quiz Code</p>
              <input
                name="newQuizCode"
                placeholder= {quiz.quiz_code}
                onChange={(event) => setnewQuizCode(event.target.value)}
                value={newQuizCode}
              />
              <p>Please Insert Your Quiz Type </p>
              <input type="number"
                 min="1" max="5"
                name="newQuestionMark"
                placeholder={quiz.quiz_type}
                onChange={(event) => setnewQuestionMark(event.target.value)}
                value={newQuestionMark}
              />
            </label>
            <p></p>
            <button>Update</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default EditQuiz;
