import React, { useState } from "react";
import { postQuizApi } from "../../utils/api";

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

    postQuizApi(newObject).then((response) => {
    
    });
  };
  return (
    <div>
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

export default EditQuiz;
