import Loading from "../../loading/Loading";
import React, { useState } from "react";
import { authAPIsRequests } from "../../../api/APIsRequests";
import Input from "../../form/input";

const PostAdmin = (props) => {
  const [state, setState] = useState({
    admin_username: "",
    admin_firstname: "",
    admin_lastname: "",
    admin_email: "",
    admin_password: "",
    admin_active: "TRUE",
    admin_image: "",
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
      .postadminApi(token, state)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          message: "admin posted successfully",
        }));
        setTimeout(() => {
          window.location.replace(`/adminlist`);
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
          No Add admin
        </button>
      ) : (
        <button onClick={(event) => handleDisplayForm(event)}>
          {" "}
          Add admin{" "}
        </button>
      )}
      {state.displayForm === true && (
        <div>
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

          <fieldset>
            <legend>Is Admin Active</legend>
            <div>
              <input
                type="checkbox"
                name="newAdminActive"
                //value="true"
              />
              <label htmlFor="true">True</label>
              <input
                type="checkbox"
                name="newAdminActive"
                //value="false"
              />
              <label htmlFor="false">False</label>
            </div>
          </fieldset>

          <Input
            fieldname="Please Insert Your Admin Image"
            type="text"
            name="admin_image"
            value={state?.admin_image}
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

export default PostAdmin;
