import Loading from "../../loading/Loading";
import React, { useEffect, useState } from "react";
import { authAPIsRequests } from "../../../api/APIsRequests";
import Input from "../../form/input";

const EditCourse = (props) => {
  const [state, setState] = useState({
    error: null,
    loading: false,
    displayForm: false,
    buttonStatus: false,
  });

  useEffect(() => {
    for (let objKey in props?.course)
      setState((prevState) => ({
        ...prevState,
        [objKey]: props?.course[objKey],
      }));
  }, [props?.course]);

  const handleChange = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event, token, course_id) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      buttonStatus: true,
      loading: true,
      error: null,
    }));

    await authAPIsRequests
      .editCourseApi(token, course_id, state)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          message: "course updated successfully",
        }));
        setTimeout(() => {
          window.location.replace(`/courses/${course_id}`);
        }, 2000);
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

  const handleDisplayForm = async (event) => {
    event.preventDefault();
    if (state.displayForm === true)
      return setState((prevState) => ({ ...prevState, displayForm: false }));
    if (state.displayForm === false)
      return setState((prevState) => ({ ...prevState, displayForm: true }));
  };

  return (
    <div className="EditMainPage">
      {state?.displayForm === true ? (
        <button onClick={(key) => handleDisplayForm(key)}> No Edit </button>
      ) : (
        <button onClick={(key) => handleDisplayForm(key)}> Edit Course </button>
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
              onClick={(key) =>
                handleSubmit(key, props?.token, props?.course?.course_id)
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

export default EditCourse;
