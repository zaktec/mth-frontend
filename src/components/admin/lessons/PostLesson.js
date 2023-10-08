import React, { useState } from "react";
import { authAPIsRequests } from "../../../api/APIsRequests";
import Loading from "../../loading/Loading";

const PostLesson = (props) => {
  const [state, setState] = useState({
    lesson_topic: '',
    lesson_name: '',
    lesson_code: '',
    lesson_desc: '',
    lesson_grade: 0,
    lesson_body: '',
    lesson_topic_fk_id: 0,
    error: null,
    loading: false,
    displayForm: false,
    buttonStatus: false,
  });

  const handleChange = (key) => {
    key.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      [key.target.name]: key.target.value,
    }));
  };

  const handleSubmit = async (key, token) => {
    key.preventDefault();
    setState((prevState) => ({
      ...prevState,
      buttonStatus: true,
      loading: true,
      error: null,
    }));
    await authAPIsRequests
      .postLessonApi(token, state)
      .then((response) => {
        window.location.replace(`/lessonlist`);
      })
      .catch((error) => {
        return setState((prevState) => ({
          ...prevState,
          error: error?.response?.data?.message,
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
    <div>
      {state?.displayForm === true ? (
        <button onClick={(key) => handleDisplayForm(key)}>
          {" "}
          No Add Lesson
        </button>
      ) : (
        <button onClick={(key) => handleDisplayForm(key)}>Add Lesson</button>
      )}
      {state.displayForm === true && (
        <div>
          <p style={{ margin: '10px 10px' }}>Please Insert Your lesson Name </p>
          <input
            type="text"
            name="lesson_name"
            placeholder="Insert Lesson Name"
            value={state?.lesson_name}
            onChange={(name) => handleChange(name)}
          />
          <p style={{ margin: '10px 00px' }}>Please Insert Your lesson Code </p>
          <input
            type="text"
            name="lesson_code"
            placeholder="Lesson Code"
            value={state?.lesson_code}
            onChange={(name) => handleChange(name)}
          />
          <p style={{ margin: '10px 00px' }}>Please Insert Your lesson Description </p>
          <input
            type="text"
            name="lesson_desc"
            placeholder="Lesson Description"
            value={state?.lesson_desc}
            onChange={(name) => handleChange(name)}
          />
          <p style={{ margin: '10px 00px' }}>Please Insert Your lesson Topic </p>
          <input
            type="text"
            name="lesson_topic"
            placeholder="Upload Lesson Worksheet"
            value={state?.lesson_topic}
            onChange={(name) => handleChange(name)}
          />
          <p style={{ margin: '10px 00px' }}>Please Insert Your lesson body </p>
          <input
            type="text"
            name="lesson_body"
            placeholder="Upload Lesson Body"
            value={state?.lesson_body}
            onChange={(name) => handleChange(name)}
          />

          <p style={{ margin: '10px 00px' }}>Please Insert Your lesson topic id </p>
          <input
            type="number"
            min="1"
            max="15"
            name="lesson_topic_fk_id"
            placeholder="Lesson Topic ID"
            value={state?.lesson_topic_fk_id}
            onChange={(name) => handleChange(name)}
          />

<p style={{ margin: '10px 00px' }}>Please Insert Your grade </p>
          <input
            type="number"
            min="1"
            max="15"
            name="lesson_grade"
            placeholder="Lesson Topic ID"
            value={state?.lesson_grade}
            onChange={(name) => handleChange(name)}
          />
          <div style={{ margin: "10px 00px" }}>
            <button
              disabled={state.buttonStatus}
              onClick={(key) => handleSubmit(key, props?.token)}
              type="submit"
            >
              {state.loading === true ? <Loading /> : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PostLesson;
