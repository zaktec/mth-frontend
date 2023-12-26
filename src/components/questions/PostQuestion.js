import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Input from "../form/input";
import Loading from "../loading/Loading";
import ImageUploader from "react-images-upload";
import Avatar from "../../assets/images/avatar.png";
import JoinPattern from "../patterns/joinPattern";
import { APIsRequests } from "../../api/APIsRequests";

const PostQuestion = (props) => {
  const [useCalcTrue, setuseCalcTrue] = useState(false);
  const [useCalcFalse, setCalcFalse] = useState(false);
  const [state, setState] = useState({
    question_body: "",
    question_ans1: "",
    question_mark: 0,
    question_grade: 0,
    question_calc: false,
    question_explaination: "",
    question_ans2: null,
    question_ans3: null,
    question_correct: null,
    question_type: null,
    question_ans_image: null,
    question_ans_mark: null,
    question_ans_sym_a: null,
    question_ans_sym_b: null,
    question_image: null,
    question_quiz_fk_id: 4,
    question_response1: null,
    question_response2: null,
    question_response3: null,
    question_workingout: null,
    question_feedback: null,

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

    await APIsRequests.postquestionApi(props?.authData?.token, state)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          message: "question posted successfully",
        }));
        toast.success("Course posted successfully");
        setTimeout(() => {
          window.location.replace(`/questions`);
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
  const handleUseCalcTrue = () => {
    if (useCalcFalse === false) {
      setuseCalcTrue(!useCalcTrue);
      setState((prevState) => ({ ...prevState, question_calc: true }));
    }
  };

  const handleUseCalcFalse = () => {
    if (useCalcTrue === false) {
      setCalcFalse(!setCalcFalse);
      setState((prevState) => ({ ...prevState, question_calc: false }));
    }
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
      question_image: picture[picture.length - 1],
    }));
  };

  let profilePicturePreview = null;
  if (state?.question_image) {
    if (state?.question_image.name) {
      const getDocName = state?.question_image.name;
      const docLength = getDocName.length;
      const point = getDocName.lastIndexOf(".");
      const getExtensionFile = getDocName.substring(point, docLength);
      const lowCaseExtensionFile = getExtensionFile.toLowerCase();
      if (
        lowCaseExtensionFile === ".jpg" ||
        lowCaseExtensionFile === ".png" ||
        lowCaseExtensionFile === ".gif"
      ) {
        profilePicturePreview = URL.createObjectURL(state?.question_image);
      }
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="PostMainPage">
        {state?.displayForm === true ? (
          <button onClick={(event) => handleDisplayForm(event)}>
            {" "}
            No Add question{" "}
          </button>
        ) : (
          <button onClick={(event) => handleDisplayForm(event)}>
            {" "}
            Add question{" "}
          </button>
        )}

        {state.displayForm === true && (
          <div className="form-container">
            <div className="form-header">
              <div className="head">INSERT QUESTION</div>
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
                    buttonStyles={{
                      backgroundColor: "#808080",
                      color: "#ffff",
                    }}
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
                        fieldname="Please Insert Question Body"
                        type="text"
                        name="question_body"
                        handleChange={handleChange}
                        value={state?.question_body}
                      />

                      <Input
                        fieldname="Please Insert Answer 1"
                        type="text"
                        name="question_name"
                        handleChange={handleChange}
                        value={state?.question_ans1}
                      />
                      <Input
                        fieldname="Please Insert Your question Mark"
                        type="number"
                        name="question_mark"
                        handleChange={handleChange}
                        value={state?.question_mark}
                      />
                      <Input
      fieldname="Please Insert Your question Grade"
                        type="number"
                        name="question_grade"
                        handleChange={handleChange}
                        value={state?.question_grade}
                      />
                      <Input
      fieldname="Does the questions require a calculator"
                        type="boolean"
                        name="question_calc"
                        handleChange={handleChange}
                        value={state?.question_calc}
                      />
                       <Input
      fieldname="Please Insert Answer 2"
                        type="text"
                        name="question_ans2"
                        handleChange={handleChange}
                        value={state?.question_ans2}
                      />
                      <Input
      fieldname="Please Insert Answer 3"
                        type="text"
                        name="question_ans3"
                        handleChange={handleChange}
                        value={state?.question_ans3}
                      />
                          <Input
      fieldname="Please Insert Answer 3"
                        type="text"
                        name="question_ans3"
                        handleChange={handleChange}
                        value={state?.question_ans3}
                      />
                                      <Input
      fieldname="Please Insert Image Url"
                        type="text"
                        name="question_image"
                        handleChange={handleChange}
                        value={state?.question_image}
                      />
                       <Input
      fieldname="Please Insert Answer symbol before"
                        type="text"
                        name=" question_ans_sym_b"
                        handleChange={handleChange}
                        value={state?.question_ans_sym_b}
                      />
                                  <Input
      fieldname="Please Insert Answer symbol after"
                        type="text"
                        name=" question_ans_sym_b"
                        handleChange={handleChange}
                        value={state?.question_ans_sym_b}
                      />
                       <Input
      fieldname="Please Insert Question Explaination"
                        type="text"
                        name="question_ans_sym_b"
                        handleChange={handleChange}
                        value={state?.question_ans_sym_b}
                      />
                    <Input
      fieldname="Please Insert Answer Mark"
                        type="number"
                        name="question_ans_mark"
                        handleChange={handleChange}
                        value={state?.question_ans_mark}
                        />
                        <Input
      fieldname="Please Insert Answer Image"
                        type="text"
                        name="question_ans_image"
                        handleChange={handleChange}
                        value={state?.question_ans_image}
                        />
                         <Input
      fieldname="Please Insert Question response 1"
                        type="text"
                        name="question_response1"
                        handleChange={handleChange}
                        value={state?.question_response1}
                        />
                         <Input
      fieldname="Please Insert Question response 2"
                        type="text"
                        name="question_response2"
                        handleChange={handleChange}
                        value={state?.question_response2}
                        />
                         <Input
      fieldname="Please Insert Question response 3"
                        type="text"
                        name="question_response3"
                        handleChange={handleChange}
                        value={state?.question_response3}
                        />
                         <Input
      fieldname="Please Insert Question work"
                        type="text"
                        name="question_workingout"
                        handleChange={handleChange}
                        value={state?.question_workingout}
                        />
                        <Input
      fieldname="Please Insert Feedback"
                        type="text"
                        name="question_feedback"
                        handleChange={handleChange}
                        value={state?.question_feedback}
                        />
                         <Input
      fieldname="Please Insert question Quiz Id"
                        type="number"
                        name="question_quiz_fk_id"
                        handleChange={handleChange}
                        value={state?.question_quiz_fk_id}
                        />
                        <div>
      <p style={{ margin: '10px 00px' }}> Is Calculator Allowed </p>
                      <label>
                        <input
                          type='checkbox'
                          checked={useCalcTrue}
                          onChange={handleUseCalcTrue}
                        />
                        True
                      </label>

                      <label>
                        <input
                          type='checkbox'
                          checked={useCalcFalse}
                          onChange={handleUseCalcFalse}
                        />
                        False
                      </label>
                    </div>

                      <div className="result-container">
                        {state?.error !== null ? state?.error : state?.message}
                      </div>
                      <button
                        disabled={state.buttonStatus}
                        onClick={(key) => handleSubmit(key, props?.token)}
                        type="button"
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
    </>
  );
};

export default PostQuestion;
