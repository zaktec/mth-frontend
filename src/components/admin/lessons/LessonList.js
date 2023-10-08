import React from "react";
import { useEffect, useState } from "react";
import { getLessonApi } from "../../../api/axios";
import { Link } from "react-router-dom";
import PostLesson from "./PostLesson";
import LessonCSS from "../../../css/lesson.module.css";

// import Search from "../Search";

const LessonList = (props) => {
  if (props?.isLoading) return <p>Loading....</p>;

  return (
    <main className={LessonCSS.LessonListPage}>
      <h1 className={LessonCSS.LessonList__h1}> Lesson List </h1>

      <PostLesson token={props?.token} />
      <ul className={LessonCSS.Lesson__List}>
        {props?.data.map((lesson) => {
          return (
            <Link key={lesson.lesson_id} to={`/lessons/${lesson.lesson_id}`}>
              <li className={LessonCSS.LessonList__card}>
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
