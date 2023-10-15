import Loading from "../../loading/Loading";
import React, { useState } from "react";
import { authAPIsRequests } from "../../../api/APIsRequests";
import Input from "../../form/input";

const PostStudent = (props) => {
  const [state, setState] = useState({
    student_username: "",
    student_firstname: "",
    student_lastname: "",
    student_email: "",
    student_password: "",
    student_active: "TRUE",
    student_grade: 0,
    student_targetgrade: 0,
    student_progressbar: 0,
    student_notes: "",
    student_image: "",
    student_msg_count: 0,
    student_msg_input: "",
    student_msg_output: "",
    student_course_fk_id: 0,
    student_tutor_fk_id: 0,
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
      .postStudentApi(token, state)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          message: "student posted successfully",
        }));
        setTimeout(() => {
          window.location.replace(`/studentlist`);
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
    <div className="PostMainPage">
      {state?.displayForm === true ? (
        <button onClick={(event) => handleDisplayForm(event)}>
          No Add Student
        </button>
      ) : (
        <button onClick={(event) => handleDisplayForm(event)}>
          {" "}
          Add Student{" "}
        </button>
      )}
      {state.displayForm === true && (
        <div>
          <Input
            fieldname="Please Insert Your username"
            type="text"
            name="student_username"
            value={state?.student_username}
            handleChange={handleChange}
          />
          <Input
            fieldname="Insert Your First Name"
            type="text"
            name="student_firstname"
            value={state?.student_firstname}
            handleChange={handleChange}
          />
          <Input
            fieldname="Please Insert Your Last Name"
            type="text"
            name="student_lastname"
            value={state?.student_lastname}
            handleChange={handleChange}
          />

          <Input
            fieldname="Please Insert Your Email"
            type="text"
            name="student_email"
            value={state?.student_email}
            handleChange={handleChange}
          />

          <Input
            fieldname="Please Insert Your Password"
            type="text"
            name="student_password"
            value={state?.student_password}
            handleChange={handleChange}
          />

          <fieldset>
            <legend>Is Student Active</legend>
            <div>
              <input
                type="checkbox"
                name="newStudentActive"
                //value="true"
              
              />
              <label htmlFor="true">True</label>
              <input
                type="checkbox"
                name="newStudentActive"
                //value="false"
               
              />
              <label htmlFor="false">False</label>
            </div>
          </fieldset>

          <Input
            fieldname="Please Insert Your Grade"
            type="number"
            name="student_grade"
            value={state?.student_grade}
            handleChange={handleChange}
          />
          <Input
            fieldname="Please Insert Your Grade"
            type="number"
            name="student_grade"
            value={state?.student_grade}
            handleChange={handleChange}
          />
          <Input
            fieldname="Please Insert Your Target grade"
            type="number"
            name="student_targetgrade"
            value={state?.target_grade}
            handleChange={handleChange}
          />
          <Input
            fieldname="Please Insert Your Target grade"
            type="number"
            name="student_targetgrade"
            value={state?.target_grade}
            handleChange={handleChange}
          />
          <Input
            fieldname="Please Insert Your Progressbar"
            type="number"
            name="student_progressbar"
            value={state?.student_progressbar}
            handleChange={handleChange}
          />
           <Input
            fieldname="Please Insert Your Student Notes"
            type="text"
            name="student_notes"
            value={state?.student_notes}
            handleChange={handleChange}
          />
          <Input
            fieldname="Please Insert Your Student Image"
            type="text"
            name="student_image"
            value={state?.student_image}
            handleChange={handleChange}
          />
            <Input
            fieldname="Please Insert Your Message Count"
            type="number"
            name="student_msg_count"
            value={state?.student_msg_count}
            handleChange={handleChange}
          />
            <Input
            fieldname="Please Insert Your Message Input"
            type="text"
            name="student_msg_input"
            value={state?.student_msg_input}
            handleChange={handleChange}
          />
          <Input
            fieldname="Please Insert Your Message Output"
            type="text"
            name="student_msg_input"
            value={state?.student_msg_input}
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

export default PostStudent;
