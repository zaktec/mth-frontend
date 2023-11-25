import React, { useState, useEffect } from "react";
import Loading from "../../loading/Loading";
import { APIsRequests } from "../../../api/APIsRequests";
import Input from "../../form/input";
import ImageUploader from "react-images-upload";
import JoinPattern from "../../patterns/joinPattern";
import Avatar from "../../../assets/images/avatar.png";


const EditQuestion = (props) => {
  const [state, setState] = useState({
    error: null,
    loading: false,
    displayForm: false,
    buttonStatus: false,
  });

  useEffect(() => {
    for (let objKey in props?.question)
      setState((prevState) => ({
        ...prevState,
        [objKey]: props?.question[objKey],
      }));
  }, [props?.question]);

  const handleChange = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event, token, question_id) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      buttonStatus: true,
      loading: true,
      error: null,
    }));

    await APIsRequests
      .editQuestionApi(token, question_id, state)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          message: "question updated successfully",
        }));
        setTimeout(() => {
          window.location.replace(`/questions/${question_id}`);
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
      question_image: picture[picture.length - 1],
    }));
  };
  let profilePicturePreview = null;
  if (state?.coourse_image) {
    if (state?.admin_image.name) {
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
        profilePicturePreview = URL.createObjectURL(state?.admin_image);
      }
    }
  }
  return (
    <div className="PostMainPage">
    {state?.displayForm === true ? (
      <button onClick={(event) => handleDisplayForm(event)}>
        {" "}
        No Edit question{" "}
      </button>
    ) : (
      <button onClick={(event) => handleDisplayForm(event)}> Edit question </button>
    )}

    {state.displayForm === true && (
       <div className="form-container">
       <div className="form-header">
         <div className="head">EDIT QUESTION</div>
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

export default EditQuestion;
