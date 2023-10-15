import React from "react";
import PostCourse from "./PostCourse";
import { Link } from "react-router-dom";

const CourseList = (props) => {
  if (props?.isLoading) return <p>Loading....</p>;

  return (
    <div className="MainListPage">
      <h1 className="MainList__h1"> CourseList </h1>

      <PostCourse token= {props?.token} />

      <ul className="Main__List">
        {props?.data.map((course) => {
          return (
            <Link key={course.course_id} to={`/courses/${course.course_id}`}>
              <li className="MainList__card">
                <p style={{ margin: '10px auto'}}> Course Name: {course.course_name} </p>
                <p style={{ margin: '10px auto'}}> Course Code: {course.course_code} </p>
                <button style={{ margin: '10px auto'}}> Click for more detail</button>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default CourseList;
