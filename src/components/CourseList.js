import React from "react";
import { useEffect, useState } from "react";
import { getCourses } from "../utils/api";
import { Link } from "react-router-dom";
import Search from "./Search";

function CourseList() {
  const [coursesList, setCoursesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCourses().then((res) => {
      console.log(res);
      setCoursesList(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading....</p>;

  return (
    <main className="CourseListPage">
      <Search setSearchTerm={setSearchTerm} />
      <h1 className="List__h1"> CourseList </h1>

      <ul className="List">
        {coursesList.map((course) => {
          return (
            <Link key={course.course_id} to={`/courses/${course.course_id}`}>
              <li className="List__card">
                <p><b>Course Name: </b> {course.course_name}</p>
                <p><b>Course Description: </b>{course.course_desc}</p>
                <p><b>Course ID: </b>{course.course_id}</p>
                <p><b>Course Code: </b>{course.course_code}</p>
                <p><b>Course Level:</b>{course.course_level}</p>
                <img clasName="ListImage" src={course.course_image}
                  alt={course.course_name}/>
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}

export default CourseList;
