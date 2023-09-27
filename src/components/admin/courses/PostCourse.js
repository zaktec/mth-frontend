import Loading from '../../loading/Loading';
import React, { useState } from "react";
import { authAPIsRequests } from "../../../api/APIsRequests";

const PostCourse = (props) => {
  const [state, setState] = useState({
    course_name: '',
    course_code: '',
    course_desc: '',
    course_level: '',
    course_image: '',
    error: null,
    loading: false,
    displayForm: false,
    buttonStatus: false,
  });

  const handleChange = (key) => {
    key.preventDefault();
    setState((prevState) => ({...prevState, error: null, [key.target.name]: key.target.value }));
  }

  const handleSubmit = async (key, token) => {
    key.preventDefault();
    setState((prevState) => ({...prevState, buttonStatus: true, loading: true, error: null }));

    await authAPIsRequests.postCourseApi(token, state)
    .then(response => {
      window.location.replace(`/courselist`);
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
    <div>
      {
        state?.displayForm === true 
        ?  <button onClick={(key) => handleDisplayForm(key) } > No Add Course </button>
        : <button onClick={(key) => handleDisplayForm(key) } > Add Course </button>
      }

      { state.displayForm === true &&  (
          <div>
            <p style={{ margin: '10px 00px' }}>Please Insert Your course Code </p>
            <input
              type='text'
              name='course_code'
              placeholder='Course Code'
              value={state?.course_code}
              onChange={(name) => handleChange(name)}
            />
            <p style={{ margin: '10px 00px' }}>Please Insert Your course Name </p>
            <input
              type='text'
              name='course_name'
              placeholder='Course Name'
              value={state?.course_name}
              onChange={(name) => handleChange(name)}
            />
            <p style={{ margin: '10px 00px' }}>Please Insert Your Course Description </p>
            <input
              type='text'
              name='course_desc'
              placeholder='Course Desc'
              value={state?.course_desc}
              onChange={(name) => handleChange(name)}
            />
            <p style={{ margin: '10px 00px' }}>Please Insert Your Course Level </p>
            <input
              type='text'
              name='course_level'
              placeholder='Course Level'
              value={state?.course_level}
              onChange={(name) => handleChange(name)}
            />
            <p style={{ margin: '10px 00px' }}>Please Insert Your Course Image </p>
            <input
              type='text'
              name='course_image'
              placeholder='Course Image'
              value={state?.course_image}
              onChange={(name) => handleChange(name)}
            />

            <div style={{ margin: '10px 00px' }}>
              <button disabled={state.buttonStatus} onClick={(key) => handleSubmit(key, props?.token)} type='submit'>
                { state.loading === true ? <Loading /> : 'Save' }
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default PostCourse;
