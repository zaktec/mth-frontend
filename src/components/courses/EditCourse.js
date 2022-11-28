import React, { useState } from "react";
import { patchCourseApi } from "../../utils/api";
import CourseCSS from "../../css/course.module.css";

function EditCourse(props) {
  const { course } = props;
  // console.log(course.course_name)
  const [displayPost, setPostDisplay] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newCourseLevel, setNewCourseLevel] = useState("");
  const [newCourseImage, setNewCourseImage] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newObject = {
      course_name: newCourseName === "" ? course.course_name : newCourseName,
      course_code: newCode === "" ? course.course_code : newCode,
      course_desc: newCourseDescription === "" ? course.course_desc : newCourseDescription ,
      course_level: newCourseLevel === "" ? course.course_level : newCourseLevel,
      course_image: newCourseImage === "" ? course.course_image : newCourseImage,
    };

    // newObject.course_image = 0;

    patchCourseApi(course.course_id, newObject).then((response) => {
      console.log(response);
    });
  };
  return (
    <div className= {CourseCSS.EditCoursePage}>
      <button
        onClick={() =>
          setPostDisplay((currentValue) => {
            return !currentValue;
          })
        }
      >
        Edit Course
      </button>
      {displayPost ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Please Insert Your course Name </p>
              <input
                name="newCourseName"
                placeholder={course.course_name}
                onChange={(event) => setNewCourseName(event.target.value)}
                value={newCourseName}
              />
              <p>Please Insert Your course Code </p>
              <input
                type="text"
                name="newCode"
                placeholder={course.course_code}
                onChange={(event) => setNewCode(event.target.value)}
                value={newCode}
              />
              <p>Please Insert Your Course Description </p>
              <input
                name="newCourseDescription"
                placeholder={course.course_desc}
                onChange={(event) =>
                  setNewCourseDescription(event.target.value)
                }
                value={newCourseDescription}
              />
              <p>Please Insert Your Course Level </p>
              <input
                name="newCourseLevel"
                placeholder={course.course_level}
                onChange={(event) => setNewCourseLevel(event.target.value)}
                value={newCourseLevel}
              />
              <p>Please Insert Your Course Image </p>
              <input
                name="newCourseImage"
                placeholder={course.course_image}
                onChange={(event) => setNewCourseImage(event.target.value)}
                value={newCourseImage}
              />
            </label>
            <p></p>
            <button>Update </button>
            <p></p>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default EditCourse;
