import React, { useEffect, useState } from "react";
import LessonCSS from "../../../css/lesson.module.css";
import { authAPIsRequests } from "../../../api/APIsRequests";
import Loading from "../../loading/Loading";
import Input from "../../form/input";

const EditLesson = (props) => {
  const [state, setState] = useState({
    error: null,
    message: null,
    loading: false,
    displayForm: false,
    buttonStatus: false,
  });

  useEffect(() => {
    for (let objKey in props?.lesson)
      setState((prevState) => ({
        ...prevState,
        [objKey]: props?.lesson[objKey],
      }));
  }, [props?.lesson]);

  const handleChange = (key) => {
    key.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      [key.target.name]: key.target.value,
    }));
  };
  const handleSubmit = async (key, token, lesson_id) => {
    key.preventDefault();
    setState((prevState) => ({
      ...prevState,
      buttonStatus: true,
      loading: true,
      error: null,
    }));

    await authAPIsRequests
      .editLessonApi(token, lesson_id, state)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          message: "lesson updated successfully",
        }));
        setTimeout(() => {
          window.location.replace(`/lessons/${lesson_id}`);
        }, 2000);
      })
      .catch((error) => {
        return setState((prevState) => ({
          ...prevState,
          error: error?.error?.response?.data?.message,
          buttonStatus: false,
          loading: false,
        }));
      });
  };
  const handleDisplayForm = async (key) => {
    key.preventDefault();
    if (state.displayForm === true)
      return setState((prevState) => ({ ...prevState, displayForm: false }));
    if (state.displayForm === false)
      return setState((prevState) => ({ ...prevState, displayForm: true }));
  };

  return (
    <div className={LessonCSS.EditLessonPage}>
      {state?.displayForm === true ? (
        <button onClick={(key) => handleDisplayForm(key)}> No Edit </button>
      ) : (
        <button onClick={(key) => handleDisplayForm(key)}>Edit Lesson </button>
      )}
      {state.displayForm === true && (
        <div>
          <Input
            fieldname="Please Insert Your lesson Name"
            type="text"
            name="lesson_name"
            value={state?.lesson_name}
            handleChange={handleChange}
          />
          <p style={{ margin: "10px 00px" }}>Please Insert Your lesson Code </p>
          <input
            type="text"
            name="lesson_code"
            value={state?.lesson_code}
            onChange={(name) => handleChange(name)}
          />

          <p>Please Insert Your lesson topic </p>
          <input
            type="text"
            name="lesson_topic"
            value={state?.lesson_topic}
            onChange={(name) => handleChange(name)}
          />
          <p style={{ margin: "10px 00px" }}>
            Please Insert Your lesson Description{" "}
          </p>
          <input
            type="text"
            name="lessson_desc"
            value={state?.lesson_desc}
            onChange={(name) => handleChange(name)}
          />

          <p>Please Insert Your lesson body </p>
          <input
            type="text"
            name="lesson_body"
            value={state?.lesson_body}
            onChange={(name) => handleChange(name)}
          />

          <p>Please Insert Your lesson topic id </p>
          <input
            type="number"
            min="1"
            max="15"
            name="lesson_topic_fk_id"
            value={state?.lesson_topic_fk_id}
            onChange={(name) => handleChange(name)}
          />

          <p>Please Insert Your grade </p>
          <input
            type="number"
            min="1"
            max="15"
            name="lesson_grade"
            value={state?.lesson_grade}
            onChange={(name) => handleChange(name)}
          />
          <div>{state?.error !== null ? state?.error : state?.message} </div>
          <div style={{ margin: "10px 00px" }}>
            <button
              disabled={state.buttonStatus}
              onClick={(key) =>
                handleSubmit(key, props?.token, props?.lesson?.lesson_id)
              }
              type="submit"
            >
              {state.loading === true ? <Loading /> : "Update"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditLesson;
