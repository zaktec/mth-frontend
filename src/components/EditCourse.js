import React, { useState } from "react";
import { patchCourseApi } from '../utils/api'

function EditCourse(props) {
    const { course_id, setCourseName } = props;
   
    const [displayPost, setPostDisplay] = useState(false);
    const [newCourseName, setNewCourseName] = useState("");
    const [newCode, setNewCode] = useState("");

/* const updateCourse= () =>{

patchCourse(course_id)
} */

const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = { course_Name: newCourseName, course_code: newCode };
    console.log(newCourseName, newCode);
    console.log(newObject);
    patchCourseApi(course_id, newObject);
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
      >Edit Course
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
                placeholder="Code Name"
                onChange={(event) => setNewCode(event.target.value)}
                value={newCode}
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

export default EditCourse
