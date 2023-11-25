import React, { useEffect, useState } from "react";
import { APIsRequests } from "../../../api/APIsRequests";
import Loading from "../../loading/Loading";
import Input from "../../form/input";
import ImageUploader from "react-images-upload";
import JoinPattern from "../../patterns/joinPattern";
import Avatar from "../../../assets/images/avatar.png";

const EditAdmin = (props) => {
  const [isAdminActiveTrue, setIsAdminActiveTrue] = useState(false);
  const [isAdminActiveFalse, setIsAdminActiveFalse] = useState(false);
  const [state, setState] = useState({
    error: null,
    message: null,
    loading: false,
    displayForm: false,
    buttonStatus: false,
  });

  useEffect(() => {
    for (let objKey in props?.admin)
      setState((prevState) => ({
        ...prevState,
        [objKey]: props?.admin[objKey],
      }));
  }, [props?.admin]);

  const handleChange = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      [event.target.name]: event.target.value,
    }));
  };

  const handleIsAdminActiveTrue = () => {
    if (isAdminActiveFalse === false) {
      setIsAdminActiveTrue(!isAdminActiveTrue);
      setState((prevState) => ({ ...prevState, admin_active: true }));
    }
  };

  const handleIsAdminActiveFalse = () => {
    if (isAdminActiveTrue === false) {
      setIsAdminActiveFalse(!isAdminActiveFalse);
      setState((prevState) => ({ ...prevState, admin_active: false }));
    }
  };

  const handleSubmit = async (event, token, admin_id) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      buttonStatus: true,
      loading: true,
      error: null,
    }));

    await APIsRequests
      .editAdminApi(token, admin_id, state)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          message: "Admin updated successfully",
        }));
        setTimeout(() => {
          window.location.replace(`/admins/${admin_id}`);
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
      admin_image: picture[picture.length - 1],
    }));
  };
  let profilePicturePreview = null;
  if (state?.admin_image) {
    if (state?.admin_image.name) {
      const getDocName = state?.admin_image.name;
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
    <div className="EditMainPage">
      {state?.displayForm === true ? (
        <button onClick={(key) => handleDisplayForm(key)}> No Edit </button>
      ) : (
        <button onClick={(key) => handleDisplayForm(key)}>Edit Admin </button>
      )}
      {state.displayForm === true && (
        <div className="form-container">
          <div className="form-header">
            <div className="head">Edit ADMIN</div>
          </div>

          <JoinPattern />

          <div className="form-container">
            <div className="sections-container">
              1
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
                        fieldname="Please Insert Your username"
                        type="text"
                        name="admin_username"
                        value={state?.admin_username}
                        handleChange={handleChange}
                      />
                      <Input
                        fieldname="Insert Your First Name"
                        type="text"
                        name="admin_firstname"
                        value={state?.admin_firstname}
                        handleChange={handleChange}
                      />
                      <Input
                        fieldname="Please Insert Your Last Name"
                        type="text"
                        name="admin_lastname"
                        value={state?.admin_lastname}
                        handleChange={handleChange}
                      />

                      <Input
                        fieldname="Please Insert Your Email"
                        type="text"
                        name="admin_email"
                        value={state?.admin_email}
                        handleChange={handleChange}
                      />

                      <Input
                        fieldname="Please Insert Your Password"
                        type="password"
                        name="admin_password"
                        value={state?.admin_password}
                        handleChange={handleChange}
                      />

                      <div>
                        <p style={{ margin: "10px 00px" }}> Is Admin Active </p>
                        <label>
                          <input
                            type="checkbox"
                            checked={isAdminActiveTrue}
                            onChange={handleIsAdminActiveTrue}
                          />
                          True
                        </label>

                        <label>
                          <input
                            type="checkbox"
                            checked={isAdminActiveFalse}
                            onChange={handleIsAdminActiveFalse}
                          />
                          False
                        </label>
                      </div>

                      <div className="result-container">
                        {state?.error !== null ? state?.error : state?.message}</div>
                      <button
                        disabled={state.buttonStatus}
                        type="button"
                        onClick={(key) =>
                          handleSubmit(
                            key,
                            props?.token,
                            props?.admin?.admin_id
                          )
                        }>
                        {state.loading === true ? <Loading /> : "Update"}
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAdmin;
