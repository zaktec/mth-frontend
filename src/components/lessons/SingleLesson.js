import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from '../navbar/Navbar';
import EditLesson from "./EditLesson"; 
import DeleteLesson from "./DeleteLesson";
import { verifyAuth } from '../../helpers';
import { APIsRequests } from '../../api/APIsRequests';

const SingleLesson = () => {
  const { role, lesson_id } = useParams();
  const [state, setState] = useState({
    data: {},
    isLoading: true,
    authData: {},
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData }));
    const getLessonApi = async (token, lesson_id) => {
      await APIsRequests
        .getLessonApi(token, lesson_id)
        .then((response) => {
          return setState((prevState) => ({
            ...prevState,
            data: response?.data?.data,
            isLoading: false,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getLessonApi(authData?.token, lesson_id);
  }, [lesson_id]);

  if (state?.isLoading) return <p>Loading...</p>;

  return (
    <main className="SingleMainPage">
      <Navbar authData={state?.authData} page={`${role}-dashboard`} />

      <h1> Single Lesson page </h1>
      <ul className="Main__List">
        <li className="MainList__card">
          <p>
            <b>Lesson ID :</b> {state?.data?.lesson_id}
          </p>
          <p>
            <b>Lesson Name :</b> {state?.data?.lesson_name}
          </p>
          <p>
            <b>Lesson Code :</b> {state?.data?.lesson_code}
          </p>
          <p>
            <b>Lesson Description :</b> {state?.data?.lesson_desc}
          </p>

          <p>
            <b>Lesson Topic :</b> {state?.data?.lesson_topic}
          </p>

          <p>
            <b>Lesson Body :</b> {state?.data?.lesson_body}
          </p>
          <p>
            <b>Lesson Topic Id :</b> {state?.data?.lesson_topic_fk_id}
          </p>
        </li>
      </ul>
      <div style={{ margin: "20px 20px" }}>
        <DeleteLesson authData={state?.authData} role ={role} lesson_id={lesson_id} />
      </div>

      <div style={{ margin: "20px 20px" }}>
        <EditLesson authData= {state?.authData} role ={role} lesson={state?.data} />
      </div> 
    </main>
  );
};

export default SingleLesson;
