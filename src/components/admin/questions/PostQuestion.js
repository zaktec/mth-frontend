import React, { useState } from "react";
import Loading from "../../loading/Loading";
import { authAPIsRequests } from "../../../api/APIsRequests";
import Input from "../../form/input";
import ImageUploader from "react-images-upload";
import JoinPattern from "../../patterns/joinPattern";
import Avatar from "../../../assets/images/avatar.png";


const PostQuestion = (props) => {

  const [state, setState] = useState({
    question_body: '',
    question_ans1: '',
    question_mark: 0,
    question_grade: 0,
    question_calc: false,
    question_explaination: '',
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
  
  
  
    const handleSubmit = async (event, token) => {
      event.preventDefault();
      setState((prevState) => ({
        ...prevState,
        buttonStatus: true,
        loading: true,
        error: null,
      }));
  
      await authAPIsRequests
        .postquestionApi(token, state)
        .then((response) => {
          setState((prevState) => ({
            ...prevState,
            message: "question posted successfully",
          }));
          setTimeout(() => {
            window.location.replace(`/questionlist`);
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
    <div className="PostMainPage">
      {state?.displayForm === true ? (
        <button onClick={(event) => handleDisplayForm(event)}>
          {" "}
          No Add question{" "}
        </button>
      ) : (
        <button onClick={(event) => handleDisplayForm(event)}> Add question </button>
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
            fieldname="Please Insert Your question Code"
            type="text"
            name="question_code"
            value={state?.question_code}
            handleChange={handleChange}
          />

          <Input
            fieldname="Please Insert Your question Name"
            type="text"
            name="question_name"
            value={state?.question_name}
            handleChange={handleChange}
          />
          <Input
            fieldname="Please Insert Your question Description"
            type="text"
            name="question_desc"
            value={state?.question_desc}
            handleChange={handleChange}
          />
          <Input
            fieldname="Please Insert Your question Level"
            type="text"
            name="question_level"
            value={state?.question_level}
            handleChange={handleChange}
          />

         
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
  );
};

export default PostQuestion;
