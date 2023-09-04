import React from "react";
import { useEffect, useState } from "react";
import { getCoursesApi } from '../../api/axios'
import { Link } from "react-router-dom";
import PostCourse from "./PostCourse";
import CourseCSS from "../../css/course.module.css";

function CourseList(props) {
  const [coursesList, setCoursesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    getCoursesApi(props.sortBy).then((coursesFromApi) => {
      console.log(coursesFromApi);
      setCoursesList(coursesFromApi);
      setIsLoading(false);
    });
  }, [props.sortBy]);

  if (isLoading) return <p>Loading....</p>;

  return (
    <main className={CourseCSS.CourseListPage}>

      <h1 className={CourseCSS.CourseList__h1}> CourseList </h1>
      
      <PostCourse
            setCourseList={setCoursesList}/>


      <ul className={CourseCSS.Courses__List}>
        {coursesList.map((course) => {
          return (
            <Link key={course.course_id} to={`/courses/${course.course_id}`}>
              <li className={CourseCSS.CourseList__card}>
                <p><b>Course Name: </b> {course.course_name}</p>
                <p><b>Course Code: </b>{course.course_code}</p>
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
