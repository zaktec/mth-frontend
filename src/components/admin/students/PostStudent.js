import Loading from "../../loading/Loading";
import React, { useState } from "react";
import { authAPIsRequests } from "../../../api/APIsRequests";
import Input from "../../form/input";
import ImageUploader from "react-images-upload";
import JoinPattern from "../../patterns/joinPattern";
import Avatar from "../../../assets/images/avatar.png";

const PostStudent = (props) => {
  const [isStudentActiveTrue, setIsStudentActiveTrue] = useState(false);
  const [isStudentActiveFalse, setIsStudentActiveFalse] = useState(false);
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

  const handleIsStudentActiveTrue = () => {
    if (isStudentActiveFalse === false) {
      setIsStudentActiveTrue(!isStudentActiveTrue);
      setState((prevState) => ({ ...prevState, student_active: true }));
    }
  };

  const handleIsStudentActiveFalse = () => {
    if (isStudentActiveTrue === false) {
      setIsStudentActiveFalse(!isStudentActiveFalse);
      setState((prevState) => ({ ...prevState, student_active: false }));
    }
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

  const onDrop = (picture) => {
    setState((prevState) => ({
      ...prevState,
      student_image: picture[picture.length - 1],
    }));
  };

  let profilePicturePreview = null;
  if (state?.student_image) {
    if (state?.student_image.name) {
      const getDocName = state?.student_image.name;
      const docLength = getDocName.length;
      const point = getDocName.lastIndexOf(".");
      const getExtensionFile = getDocName.substring(point, docLength);
      const lowCaseExtensionFile = getExtensionFile.toLowerCase();
      if (
        lowCaseExtensionFile === ".jpg" ||
        lowCaseExtensionFile === ".png" ||
        lowCaseExtensionFile === ".gif"
      ) {
        profilePicturePreview = URL.createObjectURL(state?.student_image);
      }
    }
  }

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
        <div className="form-container">
          <div className="form-header">
            <div className="head">INSERT STUDENT</div>
          </div>

          <JoinPattern />

          <div className="form-container">
            <div className="sections-container">
              <section className="section-one">
                <div className="profile-picture">
                  {" "}
                  <img
                    src={profilePicturePreview || Avatar}
                    alt="profile"
                  />{" "}
                </div>
                <ImageUploader
                  fileContainerStyle={{
                    marginTop: "50px",
                    height: "50px",
                    width: "200px",
                    float: "left",
                  }}
                  buttonStyles={{ backgroundColor: "#808080", color: "#ffff" }}
                  imgExtension={[".jpg", ".png"]}
                  buttonText="Upload Picture"
                  maxFileSize={100000000}
                  onChange={onDrop}
                  withLabel={false}
                  withIcon
                />
              </section>

              <section className="section-two">
                <form className="form-fields">
                  <div className="attribute-container">
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

                    <div>
                      <p style={{ margin: "10px 00px" }}> Is Student Active </p>
                      <label>
                        <input
                          type="checkbox"
                          checked={isStudentActiveTrue}
                          onChange={handleIsStudentActiveTrue}
                        />
                        True
                      </label>

                      <label>
                        <input
                          type="checkbox"
                          checked={isStudentActiveFalse}
                          onChange={handleIsStudentActiveFalse}
                        />
                        False
                      </label>
                    </div>

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
                    <div className="result-container">
                      {state?.error !== null ? state?.error : state?.message}
                    </div>
                    <button
                      disabled={state.buttonStatus}
                      type="button"
                      onClick={(key) => handleSubmit(key, props?.token)}
                    >
                      {state.loading === true ? <Loading /> : "Save"}
                    </button>
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
export default PostStudent;
