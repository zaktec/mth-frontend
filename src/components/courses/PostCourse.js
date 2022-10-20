import React, { useState } from "react";
import { postCourseApi } from "../../utils/api";

function PostCourse(props) {
  const { setCourseList } = props;
  const [displayPost, setPostDisplay] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newCourseLevel, setNewCourseLevel] = useState("");
  const [newCourseImage, setNewCourseImage] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = {
      course_name: newCourseName,
      course_code: newCode,
      course_desc: newCourseDescription,
      course_level: newCourseLevel,
      course_image: newCourseImage,
    };
    console.log(newCourseName, newCode);
    // newObject.course_image = 0;

    console.log(newObject);
    postCourseApi(newObject);
    setCourseList((currentValue) => {
      const newCourseList = currentValue.map((course, i) => {
        return { ...course };
      });

      newCourseList.unshift(newObject);
      console.log(newCourseList);

      return newCourseList;
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
        Add Course
      </button>
      {displayPost ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Please Insert Your course Name </p>
              <input
                name="newCourseName"
                placeholder="Insert Course Name"
                onChange={(event) => setNewCourseName(event.target.value)}
                value={newCourseName}
              />
              <p>Please Insert Your course Code </p>
              <input
                name="newCode"
                placeholder="Course Code"
                onChange={(event) => setNewCode(event.target.value)}
                value={newCode}
              />
              <p>Please Insert Your Course Description </p>
              <input
                name="newCourseDescription"
                placeholder="Course Description"
                onChange={(event) =>
                  setNewCourseDescription(event.target.value)
                }
                value={newCourseDescription}
              />
              <p>Please Insert Your Course Level </p>
              <input
                name="newCourseLevel"
                placeholder="Course Level"
                onChange={(event) => setNewCourseLevel(event.target.value)}
                value={newCourseLevel}
              />
              <p>Please Insert Your Course Image </p>
              <input
                name="newCourseImage"
                placeholder="Course Image"
                onChange={(event) => setNewCourseImage(event.target.value)}
                value={newCourseImage}
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

export default PostCourse;
