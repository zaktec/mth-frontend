import React, { useState } from "react";
import { postQuestionApi } from "../../../api/axios";
import QuestionCSS from "../../css/question.module.css";

function PostQuestion(props) {
  const { setQuestionList } = props;
  const [displayPost, setPostDisplay] = useState(false);
  const [newQuestionCalc, setnewQuestionCalc] = useState(false);
  const [newQuestionBody, setnewQuestionBody] = useState("");
  const [newQ1Answer, setnewQ1Answer] = useState("");
  const [newQuestionGrade, setnewQuestionGrade] = useState("");
  const [newQuestionLessonId, setnewQuestionLessonId] = useState("");
  const [newQuestionMark, setnewQuestionMark] = useState("");
  const [newQuestionExplaination, setnewQuestionExplaination] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = {
      ques_body: newQuestionBody,
      ques1_ans: newQ1Answer,
      ques_mark: newQuestionMark,
      ques_grade: newQuestionGrade,
      ques_lesson_id: newQuestionLessonId,
      ques_calc: newQuestionCalc,
      ques_ans_explain: newQuestionExplaination
    };

    // newObject.course_image = 0;

    postQuestionApi(newObject).then((response) => {
      setQuestionList((currentValue) => {
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
    <div className={QuestionCSS.PostQuestionPage}>
      <button
        onClick={() =>
          setPostDisplay((currentValue) => {
            return !currentValue;
          })
        }
      >
        Add Question
      </button>
      {displayPost ? (
        <div className={QuestionCSS.PostQuestionPage}>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Please Insert Your question body </p>
              <input
                name="newQuestionBody"
                placeholder="Insert Question"
                onChange={(event) => setnewQuestionBody(event.target.value)}
                value={newQuestionBody}
              />
              <p>Please Insert Your Question 1 Answer</p>
              <input
                name="newQ1Answer"
                placeholder="Insert Answer"
                onChange={(event) => setnewQ1Answer(event.target.value)}
                value={newQ1Answer}
              />
              <p>Please Insert Your Question mark </p>
              <input type="number"
                 min="1" max="5"
                name="newQuestionMark"
                placeholder="Mk."
                onChange={(event) => setnewQuestionMark(event.target.value)}
                value={newQuestionMark}
              />
              <p>Please Insert Your Question Grade </p>
              <input type="number"
                 min="1" max="9"
                name="newQuestionGrade"
                placeholder="Gr."
                onChange={(event) => setnewQuestionGrade(event.target.value)}
                value={newQuestionGrade}
              />
              <p>Please Insert Your Lesson Id </p>
              <input type="number"
                 min="1" max="5"
                name="newQuestionLessonId"
                placeholder="Id"
                onChange={(event) => setnewQuestionLessonId(event.target.value)}
                value={newQuestionLessonId}
              />
              <p>Please Insert Your Quiz Id </p>
              <input type="number"
                 min="1" max="5"
                name="newQuestionLessonId"
                placeholder="Id"
                onChange={(event) => setnewQuestionLessonId(event.target.value)}
                value={newQuestionLessonId}
              />
              <fieldset>
                <legend>Choose your calculator</legend>
                <div>
                  <input
                    type="checkbox"
                    name="newQuestionCalc"
                    //value="true"
                    onChange={(event) => setnewQuestionCalc(true)}
                    value={newQuestionCalc}
                  />
                  <label htmlFor="true">True</label>
                  <input
                    type="checkbox"
                    name="newQuestionCalc"
                    //value="false"
                    onChange={(event) => setnewQuestionCalc(true)}
                    value={newQuestionCalc}
                  />
                  <label htmlFor="false">False</label>
                </div>
              </fieldset>


              <p>Please Insert Your explanation </p>
              <input
                name="newQuestionExplaination"
                placeholder="Question Explnation"
                onChange={(event) => setnewQuestionExplaination(event.target.value)}
                value={newQuestionExplaination}
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

export default PostQuestion;
