import React, { useEffect, useState } from "react";
import { authAPIsRequests } from "../../../api/APIsRequests";
import Loading from "../../loading/Loading";
import Input from "../../form/input";
import ImageUploader from "react-images-upload";
import JoinPattern from "../../patterns/joinPattern";
import Avatar from "../../../assets/images/avatar.png";

const EditTutor = (props) => {
  console.log(props)
  const [isTutorActiveTrue, setIsTutorActiveTrue] = useState(false);
  const [isTutorActiveFalse, setIsTutorActiveFalse] = useState(false);
  const [state, setState] = useState({
    error: null,
    message: null,
    loading: false,
    displayForm: false,
    buttonStatus: false,
  });

  useEffect(() => {
    for (let objKey in props?.tutor)
      setState((prevState) => ({
        ...prevState,
        [objKey]: props?.tutor[objKey],
      }));
  }, [props?.tutor]);

  const handleChange = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      [event.target.name]: event.target.value,
    }));
  };

  const handleIsTutorActiveTrue = () => {
    if (isTutorActiveFalse === false) {
      setIsTutorActiveTrue(!isTutorActiveTrue);
      setState((prevState) => ({ ...prevState, tutor_active: true }));
    }
  };

  const handleIsTutorActiveFalse = () => {
    if (isTutorActiveTrue === false) {
      setIsTutorActiveFalse(!isTutorActiveFalse);
      setState((prevState) => ({ ...prevState, tutor_active: false }));
    }
  };

  const handleSubmit = async (event, token, tutor_id) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      buttonStatus: true,
      loading: true,
      error: null,
    }));

    await authAPIsRequests
      .editTutorApi(token, tutor_id, state)
      .then((response) => {
        console.log(response)
        setState((prevState) => ({
          ...prevState,
          message: "Tutor updated successfully",
        }));
        setTimeout(() => {
          window.location.replace(`/tutor/${tutor_id}`);
        }, 2000);
      })
      .catch((error) => {
        return setState((prevState) => ({
          ...prevState,
          error:
            error?.error?.response?.data?.message ||
            error?.response?.data?.error,
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
      tutor_image: picture[picture.length - 1],
    }));
  };

  let profilePicturePreview = null;
  if (state?.tutor_image) {
    if (state?.tutor_image.name) {
      const getDocName = state?.tutor_image.name;
      const docLength = getDocName.length;
      const point = getDocName.lastIndexOf(".");
      const getExtensionFile = getDocName.substring(point, docLength);
      const lowCaseExtensionFile = getExtensionFile.toLowerCase();
      if (
        lowCaseExtensionFile === ".jpg" ||
        lowCaseExtensionFile === ".png" ||
        lowCaseExtensionFile === ".gif"
      ) {
        profilePicturePreview = URL.createObjectURL(state?.tutor_image);
      }
    }
  }

  return (
    <div className="PostMainPage">
      {state?.displayForm === true ? (
        <button onClick={(event) => handleDisplayForm(event)}>No Edit</button>
      ) : (
        <button onClick={(event) => handleDisplayForm(event)}>
          Edit Tutor
        </button>
      )}

      {state.displayForm === true && (
        <div className="form-container">
          <div className="form-header">
            <div className="head">INSERT tutor</div>
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
                      name="tutor_username"
                      handleChange={handleChange}
                      value={state?.tutor_username}
                      
                    />
                    <Input
                    fieldname="Insert Your First Name"
                      type="text"
                      name="tutor_firstname"
                      handleChange={handleChange}
                      value={state?.tutor_firstname}
                      
                    />
                    <Input
                    fieldname="Please Insert Your Last Name"
                      type="text"
                      name="tutor_lastname"
                      handleChange={handleChange}
                      value={state?.tutor_lastname}
                      
                    />

                    <Input
                    fieldname="Please Insert Your Email"
                      type="text"
                      name="tutor_email"
                      value={state?.tutor_email}
                      handleChange={handleChange}
                      
                    />

                    <Input
                    fieldname="Please Insert Your Password"
                      type="password"
                      name="tutor_password"
                      handleChange={handleChange}
                      value={state?.tutor_password}
                      
                    />

                    <div>
                      <p style={{ margin: "10px 00px" }}> Is tutor Active </p>
                      <label>
                        <input
                          type="checkbox"
                          checked={isTutorActiveTrue}
                          onChange={handleIsTutorActiveTrue}
                        />
                        True
                      </label>

                      <label>
                        <input
                          type="checkbox"
                          checked={isTutorActiveFalse}
                          onChange={handleIsTutorActiveFalse}
                        />
                        False
                      </label>
                    </div>

                    <div className="result-container">
                      {state?.error !== null ? state?.error : state?.message}
                    </div>
                    <button
                      disabled={state.buttonStatus}
                      type="button"
                      onClick={(key) => handleSubmit(key, props?.token, props?.tutor?.tutor_id)}
                    >
                      {" "}
                      {state.loading === true ? <Loading /> : "Save"}{" "}
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

export default EditTutor;
