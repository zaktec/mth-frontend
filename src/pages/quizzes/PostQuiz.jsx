import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Input from "../../components/form/Input";
import Loading from "../../components/loading/Loading";
import { APIsRequests } from "../../api/APIsRequests";

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

  const handleChange = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      buttonStatus: true,
      loading: true,
      error: null,
    }));
    await APIsRequests.postQuizzesApi(props?.authData?.token, state)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          message: "topic posted successfully",
        }));
        toast.success("Quiz posted successfully");
        setTimeout(() => {
          window.location.replace(`/${props?.role}/quizzes`);
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
  const handleDisplayForm = async (event) => {
    event.preventDefault();
    if (state.displayForm === true)
      return setState((prevState) => ({ ...prevState, displayForm: false }));
    if (state.displayForm === false)
      return setState((prevState) => ({ ...prevState, displayForm: true }));
  };
  return (
    <>
      <ToastContainer />
      <div className="PostMainPage">
        { state?.displayForm === true
          ? (<button onClick={(key) => handleDisplayForm(key)}> COLLAPSE INSERT LESSON </button>)
          : (<button onClick={(key) => handleDisplayForm(key)}> EXPAND INSERT LESSON </button>)
        }

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
                          {state.loading === true ? (
                            <Loading buttonLoading={true} />
                          ) : (
                            "Save"
                          )}
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
    </>
  );
};

export default PostQuiz;
