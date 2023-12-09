import React, { useState } from "react";
import Loading from '../loading/Loading';
import { APIsRequests } from '../../api/APIsRequests';
import Input from '../form/input';

const PostQuiz = (props) => {
  const [state, setState] = useState({
    quiz_name: "",
    quiz_code: "",
    quiz_desc: "",
    quiz_type: "",
    quiz_calc: true,
    quiz_course_fk_id: 0,
    quiz_lesson_fk_id: 0,
    quiz_topic_fk_id: 0,
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
    await APIsRequests
      .postQuizzesApi(token, state)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          message: "topic posted successfully",
        }));
        setTimeout(() => {
          window.location.replace(`/topiclist`);
        }, 3000);
      })
      .catch((error) => {
        return setState((prevState) => ({
          ...prevState,
          error: error?.response?.data?.message || error?.response?.data?.error,
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
    <div className="PostMainPage">
      {state?.displayForm === true ? (
        <button onClick={(key) => handleDisplayForm(key)}> No Add Topic</button>
      ) : (
        <button onClick={(key) => handleDisplayForm(key)}>Add Topic</button>
      )}
      {state.displayForm === true && (
        <div className="form-container">
          <div className="form-header">
            <div className="head">INSERT LESSON</div>
          </div>
          <div className="form-container">
            <div className="sections-container">
              <section className="section-two">
                <form className="form-fields">
                  <div className="attribute-container">
                    <Input
                      fieldname="Please Insert Your quiz Name"
                      type="text"
                      name="quiz_name"
                      value={state?.quiz_name}
                      handleChange={handleChange}
                    />

                    <Input
                      fieldname="Please Insert Your quiz Code "
                      type="text"
                      name="quiz_code"
                      value={state?.quiz_code}
                      handleChange={handleChange}
                    />
                    <Input
                      fieldname="Please Insert Your quiz Desc"
                      type="text"
                      name="quiz_desc"
                      value={state?.quiz_desc}
                      handleChange={handleChange}
                    />

                    <Input
                      fieldname="Please Insert Your quiz level"
                      type="text"
                      name="topic_level"
                      value={state?.topic_level}
                      handleChange={handleChange}
                    />
                    <Input
                      fieldname="Do quiz need calculator"
                      type="boolean"
                      name="quiz_cal"
                      value={state?.quiz_calc}
                      handleChange={handleChange}
                    />

                    <Input
                      fieldname="Please Insert Your course id"
                      type="number"
                      name="quiz_course_fk_id"
                      value={state?.quiz_course_fk_id}
                      handleChange={handleChange}
                    />
                    <Input
                      fieldname="Please Insert Your lesson id"
                      type="number"
                      name="quiz_lesson_fk_id"
                      value={state?.quiz_lesson_fk_id}
                      handleChange={handleChange}
                    />
                    <Input
                      fieldname="Please Insert Your topic id"
                      type="number"
                      name="quiz_topic_fk_id"
                      value={state?.quiz_topic_fk_id}
                      handleChange={handleChange}
                    />

                    <div>
                      {state?.error !== null ? state?.error : state?.message}
                    </div>
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
                </form>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostQuiz;
