import React from "react";
import { useEffect, useState } from "react";
import { getLessonApi } from "../../utils/api";
import { Link } from "react-router-dom";
import PostLesson from "./PostLesson";

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
      <PostLesson setLessonList={setLessonList} />

      <h1 className="LessonList__h1"> Lesson List </h1>

      <ul className="Lesson__List">
        {lessonList.map((lesson) => {
          return (
            <Link key={lesson.lesson_id} to={`/lessons/${lesson.lesson_id}`}>
              <li className="LessonList__card">
                <p>
                  <b>Lesson Name: </b> {lesson.lesson_name}
                </p>
                <p>
                  <b>Lesson Code: </b>
                  {lesson.lesson_code}
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

export default LessonList;
