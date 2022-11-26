import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleCourseApi } from "../../utils/api";
import EditCourse from "./EditCourse";
import DeleteCourse from "./DeleteCourse";
import CourseCSS from "../../css/course.module.css";


function SingleCourse() {
  const { course_id } = useParams();
  const [course, setCourse] = useState({});


  useEffect(() => {
    getSingleCourseApi(course_id).then((res) => {
      //console.log(res);
      setCourse(res);
    });
  }, [course_id]);

  return (
    <main className={CourseCSS.SingleCoursePage}>
      <h1>Single Course Page</h1>
      <ul className={CourseCSS.CourseList}>
        <li className={CourseCSS.CourseList__card}>
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

          
        </li>
      </ul>
      <div>
          <EditCourse
            course={course}
          />
          </div>
      <div>
          <DeleteCourse
            course_id={course.course_id}
            setCourseName={setCourse}
          />
          </div>
    </main>
  );
}

export default SingleCourse;
