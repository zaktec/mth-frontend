import React from "react";
import { useEffect, useState } from "react";
import { getCourses } from "../utils/api";
//import { Link } from "react-router-dom";

function CourseList() {
  const [coursesList, setCoursesList] = useState([]);
  
  useEffect(() => {
    getCourses().then((res) => {
      console.log(res);
      setCoursesList(res);
    });
  }, []);

  return (
    <div className="courseListPage">
      <h1> CourseList </h1>
      <ul className="courseList">
        {coursesList.map((course) => {
          return (
            //<Link key={course.id} to={`/course/${course.name}`}>
              <li> {course.course_name} </li>
            //</Link>
          );
        })}
      </ul>
    </div>
  );
}

export default CourseList;
