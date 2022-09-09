import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleTutorApi } from "../../utils/api";


function SingleTutor() {
  const { tutor_id } = useParams();
  const [tutor, setTutor] = useState({});
  const [courseName, setCourseName] = useState([]);

  useEffect(() => {
    getSingleTutorApi(tutor_id).then((tutorsFromApi) => {
    console.log(tutorsFromApi);
      setTutor(tutorsFromApi);
    });
  }, [tutor_id]);

  return (
    <main className="SingleTutorPage">
      <h1>Single Tutor Page</h1>
      <ul className="TutorList">
        <li className="TutorList__card">
          <p>
            <b>Tutor Name: </b> {tutor.tutor_firstname}
          </p>
          <p>
            <b>Tutor Last Name: </b>
            {tutor.tutor_lastname}
          </p>
          <p>
            <b>Tutor ID: </b>
            {tutor.tutor_id}
          </p>
          <p>
            <b>Tutor Code: </b>
            {tutor.tutor_email}
          </p>
          <p>
            <b>Tutor Password</b>
            {tutor.tutor_password}
          </p>
          <img
            className="ListImage"
            src={tutor.tutor_image}
            alt={tutor.tutor_firstname}
          />

          {/* <DeleteCourse
            course_id={course.course_id}
            setCourseName={setCourse}
          />

          <EditCourse
            course_id={course.course_id}
            setCourseName={setCourseName}
          /> */}
        </li>
      </ul>
    </main>
  );
}

export default SingleTutor;
