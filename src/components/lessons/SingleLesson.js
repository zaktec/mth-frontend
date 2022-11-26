import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleLessonApi } from "../../utils/api";
import DeleteLesson from "./DeleteLesson";
import EditLesson from "./EditLesson";
import LessonCSS from "../../css/lesson.module.css";


function SingleLesson() {
  const { lesson_id } = useParams();
  const [lesson, setLesson] = useState([]);

  useEffect(() => {
    
    getSingleLessonApi(lesson_id).then((res) => {
      setLesson(res);
    });
  }, [lesson_id]);
 

  return (
    <main className={LessonCSS.SingleLessonPage}>
      <h1> Single Lesson page </h1>
      <ul className={LessonCSS.Lesson__List}>
        <li className={LessonCSS.LessonList__card}>
        <p>
            <b>Lesson ID :</b> {lesson.lesson_id}
          </p>
          <p>
            <b>Lesson Name :</b> {lesson.lesson_name}
          </p>
          <p>
            <b>Lesson Code :</b> {lesson.lesson_code}
          </p>
          <p>
            <b>Lesson Description :</b> {lesson.lesson_desc}
          </p>

          <p>
            <b>Lesson Worksheet :</b> {lesson.lesson_ws}
          </p>

          <p>
            <b>Lesson Body :</b> {lesson.lesson_body}
          </p>
          <p>
            <b>Lesson Topic Id :</b> {lesson.lesson_topic_id}
          </p>

          <DeleteLesson
            lesson_id={lesson.lesson_id}
            setLessonName={setLesson}
          />
         
           <EditLesson lesson = {lesson} /> 
        </li>
      </ul>
    </main>
  );
}

export default SingleLesson;