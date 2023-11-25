import Loading from "../../loading/Loading";
import React, { useState } from "react";
import { APIsRequests } from "../../../api/APIsRequests";
import Input from "../../form/input";
import ImageUploader from "react-images-upload";
import JoinPattern from "../../patterns/joinPattern";
import Avatar from "../../../assets/images/avatar.png";

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

    await APIsRequests
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
  const onDrop = (picture) => {
    setState((prevState) => ({
      ...prevState,
      course_image: picture[picture.length - 1],
    }));
  };

  let profilePicturePreview = null;
  if (state?.course_image) {
    if (state?.course_image.name) {
      const getDocName = state?.course_image.name;
      const docLength = getDocName.length;
      const point = getDocName.lastIndexOf(".");
      const getExtensionFile = getDocName.substring(point, docLength);
      const lowCaseExtensionFile = getExtensionFile.toLowerCase();
      if (
        lowCaseExtensionFile === ".jpg" ||
        lowCaseExtensionFile === ".png" ||
        lowCaseExtensionFile === ".gif"
      ) {
        profilePicturePreview = URL.createObjectURL(state?.course_image);
      }
    }
  }

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
         <div className="form-container">
         <div className="form-header">
           <div className="head">INSERT ADMIN</div>
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

export default PostCourse;
