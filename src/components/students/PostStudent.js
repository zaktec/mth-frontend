import React, { useState } from "react";
import { postStudentApi } from "../../utils/api";

function PostStudent(props) {
  const { setStudentList } = props;
  const [displayPost, setPostDisplay] = useState(false);
  const [newFirstName, setnewFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [newTopicIndex, setNewTopicIndex] = useState("");
  const [newCourseId, setNewCourseId] = useState("");
  const [newTopicDescription, setNewTopicDescription] = useState("");
  const [newTopicId, setNewTopicId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = {
        topic_name: newFirstName,
        topic_code: lastName,
        topic_desc: newTopicDescription,
        topic_index: newTopicIndex,
        topic_course_id: newCourseId,
        topic_id: newTopicId,
    };
   
    // newObject.course_image = 0;

   postStudentApi(newObject).then((response)=>{
    setStudentList((currentValue) => {
      const newTopicList = currentValue.map((topic) => {
        return { ...topic };
      });
      newTopicList.unshift(response);
      console.log(newTopicList);
      setPostDisplay(false)
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
      >Add Student
      </button>
      {displayPost ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Please Insert Your First Name </p>
              <input
                name="newFirstName"
                placeholder="Insert First Name"
                onChange={(event) => setnewFirstName(event.target.value)}
                value={newFirstName}
              />
              <p>Please Insert Your Last Name  </p>
              <input
                name="lastName"
                placeholder="Course Code"
                onChange={(event) => setlastName(event.target.value)}
                value={lastName}
              />
              <p>Please Insert Your Topic Description </p>
              <input
                name="newTopicDescription"
                placeholder="Course Description"
                onChange={(event) =>
                  setNewTopicDescription(event.target.value)
                }
                value={newTopicDescription}
              />
              <p>Please Insert Your Topic Index </p>
              <input type="number"
                 min="1" max="15"
                name="newTopicIndex"
                placeholder="Nu."
                onChange={(event) => setNewTopicIndex(event.target.value)}
                value={newTopicIndex}
              />
              <p>Please Insert Your Course ID </p>
              <input type="number"
                 min="1" max="15"
                name="newCourseId"
                placeholder="Nu."
                onChange={(event) => setNewCourseId(event.target.value)}
                value={newCourseId}
              />
               <p>Please Insert Your Topic ID </p>
              <input type="number"
                 min="1" max="15"
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

export default PostStudent;
