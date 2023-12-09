import Loading from '../loading/Loading';
import React, { useState } from "react";
import { APIsRequests } from '../../api/APIsRequests';
import Input from '../form/input';

const PostTopic = (props) => {
  const [state, setState] = useState({
    topic_unit: 0,
    topic_name: "",
    topic_code: "",
    topic_desc: "",
    topic_level: "",
    topic_course_fk_id: 0,

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
      .postTopicsApi(token, state)
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
                  fieldname="Please Insert Your topic Name"
                  type="text"
                  name="topic_name"
                  value={state?.topic_name}
                  handleChange={handleChange}
                />

                <Input
                  fieldname="Please Insert Your topic Code "
                  type="text"
                  name="topic_code"
                  value={state?.topic_code}
                  handleChange={handleChange}
                />
                <Input
                  fieldname="Please Insert Your topic Desc"
                  type="text"
                  name="topic_desc"
                  value={state?.lesson_desc}
                  handleChange={handleChange}
                />

                <Input
                  fieldname="Please Insert Your topic level"
                  type="text"
                  name="topic_level"
                  value={state?.topic_level}
                  handleChange={handleChange}
                />

                <Input
                  fieldname="Please Insert Your course id"
                  type="number"
                  name="lesson_body"
                  value={state?.topic_course_fk_id}
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
export default PostTopic;