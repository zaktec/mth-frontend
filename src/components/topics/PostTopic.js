import React, { useState } from "react";
import { postTopicApi } from "../../utils/api";

function PostTopic(props) {
  const { setTopicList } = props;
  const [displayPost, setPostDisplay] = useState(false);
  const [newTopicName, setnewTopicName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newTopicIndex, setNewTopicIndex] = useState("");
  const [newCourseId, setNewCourseId] = useState("");
  const [newTopicDescription, setNewTopicDescription] = useState("");
  const [newTopicId, setNewTopicId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = {
      topic_name: newTopicName,
      topic_code: newCode,
      topic_desc: newTopicDescription,
      topic_index: newTopicIndex,
      topic_course_id: newCourseId,
      topic_id: newTopicId,
    };

    // newObject.course_image = 0;

    postTopicApi(newObject).then((response) => {
      setTopicList((currentValue) => {
        const newTopicList = currentValue.map((topic) => {
          return { ...topic };
        });
        newTopicList.unshift(response);
        console.log(newTopicList);
        setPostDisplay(false);
        return newTopicList;
      });
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
        Add Topic
      </button>
      {displayPost ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Please Insert Your topic Name </p>
              <input
                name="newTopicName"
                placeholder="Insert Topic Name"
                onChange={(event) => setnewTopicName(event.target.value)}
                value={newTopicName}
              />
              <p>Please Insert Your topic Code </p>
              <input
                name="newCode"
                placeholder="Course Code"
                onChange={(event) => setNewCode(event.target.value)}
                value={newCode}
              />
              <p>Please Insert Your Topic Description </p>
              <input
                name="newTopicDescription"
                placeholder="Course Description"
                onChange={(event) => setNewTopicDescription(event.target.value)}
                value={newTopicDescription}
              />
              <p>Please Insert Your Topic Index </p>
              <input
                type="number"
                min="1"
                max="15"
                name="newTopicIndex"
                placeholder="Nu."
                onChange={(event) => setNewTopicIndex(event.target.value)}
                value={newTopicIndex}
              />
              <p>Please Insert Your Course ID </p>
              <input
                type="number"
                min="1"
                max="15"
                name="newCourseId"
                placeholder="Nu."
                onChange={(event) => setNewCourseId(event.target.value)}
                value={newCourseId}
              />
              <p>Please Insert Your Topic ID </p>
              <input
                type="number"
                min="1"
                max="15"
                name="newTopicID"
                placeholder="Nu."
                onChange={(event) => setNewTopicId(event.target.value)}
                value={newTopicId}
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

export default PostTopic;
