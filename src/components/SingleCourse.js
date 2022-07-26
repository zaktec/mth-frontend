import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleCourse } from "../utils/api";

function SingleCourse() {
  const { course_id } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    getSingleCourse(course_id).then((res) => {
      console.log(res);
      setCourse(res);
    });
  }, [course_id]);

  return (
    <main>
      <h1>Single Course Page</h1>
      <ul className="List">
        <li className="List__card">
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
            clasName="ListImage"
            src={course.course_image}
            alt={course.course_name}
          />
        </li>
      </ul>
    </main>
  );
}

export default SingleCourse;
