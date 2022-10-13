import React, { useState } from "react";
import { postCourseApi } from '../../utils/api'

function PostCourse(props) {
    const {  setCourseName } = props;
    console.log(props)
   
    const [displayPost, setPostDisplay] = useState(false);
    const [newCourseName, setNewCourseName] = useState("");
    const [newCode, setNewCode] = useState("");
    const [newCourseLevel, setNewCourseLevel] = useState("");
    const [newCourseImage, setNewCourseImage] = useState("");
    const [newCourseDescription, setNewCourseDescription] = useState("");


const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = { course_name: newCourseName, course_code: newCode, course_desc: newCourseDescription, course_level: newCourseLevel, course_image: newCourseImage };
    console.log(newCourseName, newCode);
   // newObject.course_image = 0;

    console.log(newObject);
    postCourseApi(newObject);
    setCourseName ((currentValue) => {
      const newCourseList = currentValue.map((course, i) => {
        return { ...course }

      });
    
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
                onChange={(event) => setNewCourseDescription(event.target.value)}
                value={newCourseDescription}
              />
               <input
                name="newCourse"
                placeholder="Course Level"
                onChange={(event) => setNewCourseLevel(event.target.value)}
                value={newCourseLevel}
              />
               <input
                name="newCourse"
                placeholder="Course Image"
                onChange={(event) => setNewCourseImage(event.target.value)}
                value={newCourseImage}
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
