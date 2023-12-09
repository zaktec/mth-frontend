import React from "react";
import PostCourse from "./PostCourse";
import { Link } from "react-router-dom";

const CourseList = (props) => {
  if (props?.isLoading) return <p>Loading....</p>;

  return (
    <div className="MainListPage">
      <h1 className="MainList__h1"> CourseList </h1>

      <PostCourse authData= {props?.authData} role={props?.role} />

      <ul className="Main__List">
        {props?.data.map((element) => {
          return (
            <Link key={element.course_id} to={`/${props?.role}/courses/${element.course_id}`}>
              <li className="MainList__card">
                <p style={{ margin: '10px auto'}}> Course Name: {element.course_name} </p>
                <p style={{ margin: '10px auto'}}> Course Code: {element.course_code} </p>
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
