import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleLessonApi } from "../../utils/api";
import EditStudent from "./EditStudent";

function SingleLesson() {
  const { lesson_id } = useParams();
  const [lesson, setLesson] = useState([]);

  useEffect(() => {
    
    getSingleLessonApi(lesson_id).then((res) => {
      setLesson(res);
      console.log("single",res)
    });
  }, [lesson_id]);
 

  return (
    <main className="SinglelessonPage">
      <h1> Single Lesson page </h1>
      <ul className="LessonList">
        <li className="LessonList__card">
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
         
          {/* <EditStudent student = {student}
           setStudent={setStudent} /> */}
        </li>
      </ul>
    </main>
  );
}

export default SingleLesson;