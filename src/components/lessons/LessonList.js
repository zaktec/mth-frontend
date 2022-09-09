import React from "react";
import { useEffect, useState } from "react";
import { getLessonApi } from '../../utils/api'
import { Link } from "react-router-dom";

// import Search from "../Search";

function LessonList(props) {
  const [lessonList, setLessonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [searchTerm, setSearchTerm] = useState("");
 
  // const { SortBy } =props

  useEffect(() => {
    getLessonApi(props.sortBy).then((lessonsFromApi) => {
      console.log(lessonsFromApi);
      setLessonList(lessonsFromApi);
      setIsLoading(false);
    });
  }, [props.sortBy]);

  if (isLoading) return <p>Loading....</p>;

  return (
    <main className="LessonListPage">
  {/* <Search setSearchTerm={setSearchTerm} /> */}
     

      <h1 className="LessonList__h1"> CourseList </h1>
      
      {/* <PostCourse
            course_id={course.course_id}
            setCourseName={setCourse}
          /> */}


      <ul className="Lesson__List">
        {lessonList.map((lesson) => {
          return (
            <Link key={lesson.lesson_id} to={`/lesssons/${lesson.lesson_id}`}>
              <li className="LessonList__card">
                <p><b>Tutor FirstName: </b> {lesson.lesson_name}</p>
                <p><b>Tutor LastName: </b>{lesson.lesson_code}</p>
                <button> Click for more detail</button>

              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}

export default LessonList;
