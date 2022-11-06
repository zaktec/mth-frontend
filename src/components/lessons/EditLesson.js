import React, { useState } from "react";
import { patchLessonApi } from "../../utils/api";

function EditLesson(props) {
  const { lesson } = props;
  const [displayPost, setPostDisplay] = useState(false);
  const [newLessonName, setNewLessonName] = useState("");
  const [newLessonWorksheet, setNewLessonWorksheet] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newLessonBody, setNewLessonBody] = useState("");
  const [newLessonDescription, setNewLessonDescription] = useState("");
  const [newLessonTopicId, setnewLessonTopicId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = {
      lesson_name: newLessonName === "" ? lesson.lesson_name : newLessonName,
      lesson_code: newCode === "" ? lesson.lesson_name : newCode,
      lesson_desc: newLessonDescription === "" ? lesson.lesson_desc : newLessonDescription,
      lesson_ws: newLessonWorksheet === "" ? lesson.lesson_ws : newLessonWorksheet,
      lesson_body: newLessonBody === "" ? lesson.lesson_body : newLessonBody,
      lesson_topic_id: newLessonTopicId === "" ? lesson.topic_id : newLessonTopicId,
    };

    patchLessonApi(lesson.lesson_id,newObject).then((response) => {
      console.log(response);
      });
  };

  return (
    <div>
      <button
        onClick={() =>
          setPostDisplay((currentValue) => {
            console.log(currentValue);
            return !currentValue;
          })
        }
      >
        Edit Lesson
      </button>
      {displayPost ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Please Insert Your lesson Name </p>
              <input
                name="newLessonName"
                placeholder="Insert Lesson Name"
                onChange={(event) => setNewLessonName(event.target.value)}
                value={newLessonName}
              />
              <p>Please Insert Your lesson Code </p>
              <input
                name="newCode"
                placeholder="Lesson Code"
                onChange={(event) => setNewCode(event.target.value)}
                value={newCode}
              />
              <p>Please Insert Your lesson Description </p>
              <input
                name="newlessonDescription"
                placeholder="Lesson Description"
                onChange={(event) =>
                  setNewLessonDescription(event.target.value)
                }
                value={newLessonDescription}
              />
              <p>Please Insert Your lesson Worksheet </p>
              <input
                name="newlessonWorksheet"
                placeholder="Upload Lesson Worksheet"
                onChange={(event) => setNewLessonWorksheet(event.target.value)}
                value={newLessonWorksheet}
              />
              <p>Please Insert Your lesson body </p>
              <input
                name="newlessonWorksheet"
                placeholder="Upload Lesson Body"
                onChange={(event) => setNewLessonBody(event.target.value)}
                value={newLessonBody}
              />

              <p>Please Insert Your lesson topic id </p>
              <input type="number"
                 min="1" max="15"
                name="newLessonTopicId"
                placeholder="Lesson Topic ID"
                onChange={(event) => setnewLessonTopicId(event.target.value)}
                value={newLessonTopicId}
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
export default EditLesson;
