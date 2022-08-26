import React, { useState } from "react";
import { postCourseApi } from '../../utils/api'

function PostCourse(props) {
    const { course_id, setCourseName } = props;
   
    const [displayPost, setPostDisplay] = useState(false);
    const [newCourseName, setNewCourseName] = useState("");
    const [newCode, setNewCode] = useState("");


const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = { course_Name: newCourseName, course_code: newCode };
    console.log(newCourseName, newCode);
    console.log(newObject);
    postCourseApi(course_id, newObject);
    setCourseName ((currentValue) => {
      const newCourseList = currentValue.map((course) => {
        return { ...course };
      });
      newObject.course_level = 0;
      newObject.course_image = 0;
      newObject.course_desc = "created now";
      newCourseList.unshift(newObject);
      console.log(newCourseList)

      return newCourseList;
    });
  };
    return (
        <div>
            {/* <button onClick={()=>updateCourse()}> Edit Course {course_id}</button> */}

            <button
        onClick={() =>
          setPostDisplay((currentValue) => {
            return !currentValue;
          })
        }
      >Add Course
      </button>
      {displayPost ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Please Insert Your course Name </p>
              <input
                name="newCourse"
                placeholder="Insert Course Name"
                onChange={(event) => setNewCourseName(event.target.value)}
                value={newCourseName}
              />
              <input
                name="newCode"
                placeholder="Course Code"
                onChange={(event) => setNewCode(event.target.value)}
                value={newCode}
              />
              <input
                name="newCourse"
                placeholder="Course Description"
                onChange={(event) => setNewCourseName(event.target.value)}
                value={newCourseName}
              />
               <input
                name="newCourse"
                placeholder="Course Level"
                onChange={(event) => setNewCourseName(event.target.value)}
                value={newCourseName}
              />
               <input
                name="newCourse"
                placeholder="Course Image"
                onChange={(event) => setNewCourseName(event.target.value)}
                value={newCourseName}
              />
              
            </label>
            <button>Go!</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
        </div>
    )
}

export default PostCourse
