import React from "react";
import { Link } from "react-router-dom";
import PostLesson from "./PostLesson";

// import Search from "../Search";

const LessonList = (props) => {
  if (props?.isLoading) return <p>Loading....</p>;

  return (
    <main className="MainListPage">
      <h1 className="MainList__h1"> Lesson List </h1>

      <PostLesson token={props?.token} />
      <ul className="Main__List">
        {props?.data.map((lesson) => {
          return (
            <Link key={lesson.lesson_id} to={`/lessons/${lesson.lesson_id}`}>
              <li className="MainList__card">
                <p style={{ margin: "10px auto" }}>
                  <b>Lesson Name: </b> {lesson.lesson_name}
                </p>
                <p style={{ margin: "10px auto" }}>
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
};

export default LessonList;
