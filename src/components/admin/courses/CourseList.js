import React from "react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import PostCourse from "./PostCourse";
import CourseCSS from "../../../css/course.module.css";
import { getCoursesApi } from "../../../api/axios";
import { verifyAuth } from "../../../helpers";
import { authAPIsRequests } from "../../../api/APIsRequests";

function CourseList(props) {
  const [coursesList, setCoursesList] = useState([]);
  const [state, setState] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCourseApi = async (sortBy) => {
      await authAPIsRequests
        .getCourseApi(props?.token, sortBy)
        .then((response) => {
          console.log(response?.data?.data)
          setCoursesList(response?.data?.data)
          return setState((prevState) => ({...prevState, data: response?.data?.data }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

  getCourseApi(props?.sortBy)
}, [props?.token, props?.sortBy]);
  
  if (isLoading) return <p>Loading....</p>;

  console.log("rnadom", state.data)
  return (
    <main className={CourseCSS.CourseListPage}>
      <h1 className={CourseCSS.CourseList__h1}> CourseList </h1>

      <PostCourse setCourseList={setCoursesList} />

      <ul className={CourseCSS.Courses__List}>
        {coursesList.map((course) => {
          return (
            <Link key={course.course_id} to={`/courses/${course.course_id}`}>
              <li className={CourseCSS.CourseList__card}>
                <p>
                  <b>Course Name: </b> {course.course_name}
                </p>
                <p>
                  <b>Course Code: </b>
                  {course.course_code}
                </p>
                <button> Click for more detail</button>
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}

export default CourseList;
