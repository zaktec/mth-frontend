import React, { useState } from "react";
import { postLessonApi } from "../../utils/api";

function PostLesson(props) {
  const { setLessonList } = props;
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
      lesson_name: newLessonName,
      lesson_code: newCode,
      lesson_desc: newLessonDescription,
      lesson_ws: newLessonWorksheet,
      lesson_body: newLessonBody,
      lesson_topic_id: newLessonTopicId,
    };

    postLessonApi(newObject).then((response) => {
      setLessonList((currentValue) => {
        const newLessonList = currentValue.map((lesson) => {
          return { ...lesson };
        });
        console.log(response);
        newLessonList.unshift(response);
        console.log(newLessonList);
        setPostDisplay(false)
        return newLessonList;
      });
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
        Add Lesson
      </button>
      {displayPost ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Please Insert Your course Name </p>
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
export default PostLesson;
