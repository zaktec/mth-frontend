import React, { useState } from "react";
import { postCourseApi } from "../../api/axios";
import CourseCSS from "../../css/course.module.css";

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
   
    // newObject.course_image = 0;

   postCourseApi(newObject).then((response)=>{
    setCourseList((currentValue) => {
      const newCourseList = currentValue.map((course) => {
        return { ...course };
      });
      newCourseList.unshift(response);
      console.log(newCourseList);
      setPostDisplay(false)
      return newCourseList;
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
              <input type="number"
                 min="1" max="15"
                name="newCode"
                placeholder="Nu."
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
