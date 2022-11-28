import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleTutorApi } from "../../utils/api";
import EditTutor from "./EditTutor";
import DeleteTutor from "./DeleteTutor";
import TutorCSS from "../../css/tutor.module.css";

function SingleTutor() {
  const { tutor_id } = useParams();
  const [tutor, setTutor] = useState({});

  useEffect(() => {
    getSingleTutorApi(tutor_id).then((tutorsFromApi) => {
      console.log(tutorsFromApi);
      setTutor(tutorsFromApi);
    });
  }, [tutor_id]);

  return (
    <main className= {TutorCSS.SingleTutorPage}>
      <h1>Single Tutor Page</h1>
      <ul className={TutorCSS.TutorList}>
        <li className= {TutorCSS.TutorList__card}>
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

          <DeleteTutor tutor_id={tutor.tutor_id} setTutor={setTutor} />

          <EditTutor tutor={tutor} />
        </li>
      </ul>
    </main>
  );
}

export default SingleTutor;
