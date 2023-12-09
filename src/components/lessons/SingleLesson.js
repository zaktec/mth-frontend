import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeleteLesson from "./DeleteLesson";
 import EditLesson from "./EditLesson"; 
import { verifyAuth } from '../../helpers';
import { APIsRequests } from '../../api/APIsRequests';
import Navbar from '../navbar/Navbar';

const SingleLesson = () => {
  const { lesson_id } = useParams();
  const [state, setState] = useState({
    data: {},
    isLoading: true,
    token: null,
  });

  useEffect(() => {
    const token = verifyAuth();
    setState((prevState) => ({ ...prevState, token: token?.token }));
    const getLessonApi = async (token, lesson_id) => {
      await APIsRequests
        .getLessonApi(token?.token, lesson_id)
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

    getLessonApi(token, lesson_id);
  }, [lesson_id]);

  if (state?.isLoading) return <p>Loading...</p>;

  return (
    <main className="SingleMainPage">
      <Navbar page='admin-dashboard' />
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
        <DeleteLesson token={state?.token} lesson_id={state?.data?.lesson_id} />{" "}
      </div>

     <div style={{ margin: "20px 20px" }}>
        <EditLesson token={state?.token} lesson={state?.data} />
      </div> 
    </main>
  );
};

export default SingleLesson;
