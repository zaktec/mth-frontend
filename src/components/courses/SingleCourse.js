import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleCourseApi } from "../../utils/api";
import EditCourse from "./EditCourse";
import DeleteCourse from "./DeleteCourse";

function SingleCourse() {
  const { course_id } = useParams();
  const [course, setCourse] = useState({});
  const [courseName, setCourseName] = useState([]);

  useEffect(() => {
    getSingleCourseApi(course_id).then((res) => {
      //console.log(res);
      setCourse(res);
    });
  }, [course_id]);

  return (
    <main className="SingleCoursePage">
      <h1>Single Course Page</h1>
      <ul className="CourseList">
        <li className="CourseList__card">
          <p>
            <b>Course Name: </b> {course.course_name}
          </p>
          <p>
            <b>Course Description: </b>
            {course.course_desc}
          </p>
          <p>
            <b>Course ID: </b>
            {course.course_id}
          </p>
          <p>
            <b>Course Code: </b>
            {course.course_code}
          </p>
          <p>
            <b>Course Level:</b>
            {course.course_level}
          </p>
          <img
            className="ListImage"
            src={course.course_image}
            alt={course.course_name}
          />

          <DeleteCourse
            course_id={course.course_id}
            setCourseName={setCourse}
          />

          <EditCourse
            course_id={course.course_id}
            setCourseName={setCourseName}
          />
        </li>
      </ul>
    </main>
  );
}

export default SingleCourse;
