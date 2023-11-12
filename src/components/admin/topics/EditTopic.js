import Loading from "../../loading/Loading";
import React, { useEffect, useState } from "react";
import { authAPIsRequests } from "../../../api/APIsRequests";
import Input from "../../form/input";


const EditTopic = (props) => {
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
    <div className="PostMainPage">
    {state?.displayForm === true ? (
      <button onClick={(key) => handleDisplayForm(key)}> No Edit </button>
    ) : (
      <button onClick={(key) => handleDisplayForm(key)}>Edit Topic</button>
    )}
    {state.displayForm === true && (
       <div className="form-container">
       <div className="form-header">
         <div className="head">INSERT TOPIC</div>
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
                value={state?.topic_desc}
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

export default EditTopic
