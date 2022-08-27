import React from "react";
import { useEffect, useState } from "react";
import { getCoursesApi } from '../../utils/api'
import { Link } from "react-router-dom";
import PostCourse from "./PostCourse";
import Search from "../Search";

function CourseList(props) {
  const [coursesList, setCoursesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [course, setCourse] = useState({});
  const { SortBy } =props

  useEffect(() => {
    getCoursesApi(SortBy).then((coursesFromApi) => {
      console.log(coursesFromApi);
      setCoursesList(coursesFromApi);
      setIsLoading(false);
    });
  }, [SortBy]);

  if (isLoading) return <p>Loading....</p>;

  return (
    <main className="CourseListPage">
  <Search setSearchTerm={setSearchTerm} />
     

      <h1 className="List__h1"> CourseList </h1>
      
      <PostCourse
            course_id={course.course_id}
            setCourseName={setCourse}
          />


      <ul className="List">
        {coursesList.map((course) => {
          return (
            <Link key={course.course_id} to={`/courses/${course.course_id}`}>
              <li className="List__card">
                <p><b>Course Name: </b> {course.course_name}</p>
                <p><b>Course Code: </b>{course.course_code}</p>
                <button> Click for more detail</button>
                {/* <p><b>Course Description: </b>{course.course_desc}</p>
                <p><b>Course ID: </b>{course.course_id}</p>
                <p><b>Course Level:</b>{course.course_level}</p> 
                <img className="ListImage" src={course.course_image}
                  alt={course.course_name}/> */}
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}

export default CourseList;
