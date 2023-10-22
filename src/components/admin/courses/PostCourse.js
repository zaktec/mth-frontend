import Loading from "../../loading/Loading";
import React, { useState } from "react";
import { authAPIsRequests } from "../../../api/APIsRequests";
import Input from "../../form/input";

const PostCourse = (props) => {
  const [state, setState] = useState({
    course_name: "",
    course_code: "",
    course_desc: "",
    course_level: "",
    course_image: "",
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

  const handleSubmit = async (event, token) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      buttonStatus: true,
      loading: true,
      error: null,
    }));

    await authAPIsRequests
      .postCourseApi(token, state)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          message: "course posted successfully",
        }));
        setTimeout(() => {
          window.location.replace(`/courselist`);
        }, 2000);
      })
      .catch((error) => {
        return setState((prevState) => ({
          ...prevState,
          loading: false,
          buttonStatus: false,
          error: error?.response?.data?.message || error?.response?.data?.error,
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
    <div className="PostMainPage">
      {state?.displayForm === true ? (
        <button onClick={(event) => handleDisplayForm(event)}>
          {" "}
          No Add Course{" "}
        </button>
      ) : (
        <button onClick={(event) => handleDisplayForm(event)}> Add Course </button>
      )}

      {state.displayForm === true && (
        <div>
          <Input
            fieldname="Please Insert Your course Code"
            type="text"
            name="course_code"
            value={state?.course_code}
            handleChange={handleChange}
          />

          <Input
            fieldname="Please Insert Your course Name"
            type="text"
            name="course_name"
            value={state?.course_name}
            handleChange={handleChange}
          />
          <Input
            fieldname="Please Insert Your Course Description"
            type="text"
            name="course_desc"
            value={state?.course_desc}
            handleChange={handleChange}
          />
          <Input
            fieldname="Please Insert Your Course Level"
            type="text"
            name="course_level"
            value={state?.course_level}
            handleChange={handleChange}
          />
          <Input
            fieldname="Please Insert Your Course Image"
            type="text"
            name="course_image"
            value={state?.course_image}
            handleChange={handleChange}
          />
          <div>{state?.error !== null ? state?.error : state?.message}</div>
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

export default PostCourse;
