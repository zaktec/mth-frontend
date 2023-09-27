import Loading from '../../loading/Loading';
import React, { useEffect, useState } from "react";
import CourseCSS from "../../../css/course.module.css";
import { authAPIsRequests } from "../../../api/APIsRequests";

const EditCourse = (props) => {
  const [state, setState] = useState({
    error: null,
    loading: false,
    displayForm: false,
    buttonStatus: false,
  });
  
  useEffect(() => {
    for (let objKey in props?.course) setState((prevState) => ({...prevState, [objKey]: props?.course[objKey] }));
  }, []);

  const handleChange = (key) => {
    key.preventDefault();
    setState((prevState) => ({...prevState, error: null, [key.target.name]: key.target.value }));
  }

  const handleSubmit = async (key, token, course_id) => {
    key.preventDefault();
    setState((prevState) => ({...prevState, buttonStatus: true, loading: true, error: null }));

    await authAPIsRequests.editCourseApi(token, course_id, state)
    .then(response => {
      window.location.replace(`/courses/${course_id}`);
    })
    .catch(error => {
        return setState((prevState) => ({...prevState, error: error?.response?.data?.message, buttonStatus: false, loading: false }));
    });
  }

  const handleDisplayForm = async (key) => {
    key.preventDefault();
    if (state.displayForm === true) return setState((prevState) => ({...prevState, displayForm: false }));
    if (state.displayForm === false) return setState((prevState) => ({...prevState, displayForm: true }));
  }

  return (
    <div className= {CourseCSS.EditCoursePage}>
      {
        state?.displayForm === true 
        ?  <button onClick={(key) => handleDisplayForm(key) } > No Edit </button>
        : <button onClick={(key) => handleDisplayForm(key) } > Edit Course </button>
      }
      
      { state.displayForm === true && (
          <div>
            <p style={{ margin: '10px 00px' }}>Please Insert Your course Code </p>
            <input
              type='text'
              name='course_code'
              value={state?.course_code}
              onChange={(name) => handleChange(name)}
            />
            <p style={{ margin: '10px 00px' }}>Please Insert Your course Name </p>
            <input
              type='text'
              name='course_name'
              value={state?.course_name}
              onChange={(name) => handleChange(name)}
            />
            <p style={{ margin: '10px 00px' }}>Please Insert Your Course Description </p>
            <input
              type='text'
              name='course_desc'
              value={state?.course_desc}
              onChange={(name) => handleChange(name)}
            />
            <p style={{ margin: '10px 00px' }}>Please Insert Your Course Level </p>
            <input
              type='text'
              name='course_level'
              value={state?.course_level}
              onChange={(name) => handleChange(name)}
            />
            <p style={{ margin: '10px 00px' }}>Please Insert Your Course Image </p>
            <input
              type='text'
              name='course_image'
              value={state?.course_image}
              onChange={(name) => handleChange(name)}
            />

            <div style={{ margin: '10px 00px' }}>
              <button disabled={state.buttonStatus} onClick={(key) => handleSubmit(key, props?.token, props?.course?.course_id)} type='submit'>
                { state.loading === true ? <Loading /> : 'Update' }
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default EditCourse;
