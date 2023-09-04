import React, { useState } from "react";
import { postQuizApi } from "../../api/axios";
import QuizCSS from "../../css/quiz.module.css";


function PostQuiz(props) {
  const { setQuizList } = props;
  const [displayPost, setPostDisplay] = useState(false);
  const [newQuizName, setnewQuizName] = useState("");
  const [newQuizCode, setnewQuizCode] = useState("");
 
  const [newQuestionMark, setnewQuestionMark] = useState("");
  const [newQuizType, setnewQuizType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = {
      quiz_name: newQuizName,
      quiz_code: newQuizCode,
      quiz_type: newQuizType
    };

    // newObject.course_image = 0;

    postQuizApi(newObject).then((response) => {
      setQuizList((currentValue) => {
        const newQuestionList = currentValue.map((question) => {
          return { ...question };
        });
        newQuestionList.unshift(response);
        console.log(newQuestionList);
        setPostDisplay(false)
        return newQuestionList;
      });
    });
  };
  return (
    <div className={QuizCSS.PostQuizPage}>
      <button
        onClick={() =>
          setPostDisplay((currentValue) => {
            return !currentValue;
          })
        }
      >
        Add Quiz
      </button>
      {displayPost ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Please Insert Quiz Name </p>
              <input
                name="newQuizName"
                placeholder="Insert Quiz Name"
                onChange={(event) => setnewQuizName(event.target.value)}
                value={newQuizName}
              />
              <p>Please Insert Your Quiz Code</p>
              <input
                name="newQuizCode"
                placeholder="Insert Answer"
                onChange={(event) => setnewQuizCode(event.target.value)}
                value={newQuizCode}
              />
              <p>Please Insert Your Quiz Type </p>
              <input type="number"
                 min="1" max="5"
                name="newQuestionMark"
                placeholder="Mk."
                onChange={(event) => setnewQuestionMark(event.target.value)}
                value={newQuestionMark}
              />
              <p>Please Insert Your explanation </p>
              <input
                name="newQuizType"
                placeholder="Question Explnation"
                onChange={(event) => setnewQuizType(event.target.value)}
                value={newQuizType}
              />


            </label>
            <p></p>
            <button>Go!</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default PostQuiz;
