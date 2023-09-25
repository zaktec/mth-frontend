import React, { useState } from "react";
import { patchTutorApi } from "../../api/axios";
import TutorCSS from "../../css/tutor.module.css";

function EditTutor(props) {
  const { tutor } = props;
  const [displayPost, setPostDisplay] = useState(false);
  const [newStudentActive, setnewStudentActive] = useState(false);
  const [newFirstName, setnewFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newImage, setnewImage] = useState("");

  const [newEmail, setNewTopicDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = {
      tutor_firstname:
        newFirstName === "" ? tutor.tutor_firstname : newFirstName,
      tutor_lastname: lastName === "" ? tutor.tutor_lastname : lastName,
      tutor_email: newEmail === "" ? tutor.tutor_email : newEmail,
      tutor_password: newPassword === "" ? tutor.tutor_password : newPassword,
      tutor_active:
        newStudentActive === "" ? tutor.tutor_active : newStudentActive,
      tutor_image: newImage === "" ? tutor.tutor_image : newImage,
    };

    // newObject.course_image = 0;

    patchTutorApi(newObject).then((response) => {});
  };
  return (
    <div className={TutorCSS.EditTutorPage}>
      <button
        onClick={() =>
          setPostDisplay((currentValue) => {
            return !currentValue;
          })
        }
      >
        Edit Tutor
      </button>
      {displayPost ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Please Insert Your First Name </p>
              <input
                name="newFirstName"
                placeholder={tutor.tutor_firstname}
                onChange={(event) => setnewFirstName(event.target.value)}
                value={newFirstName}
              />
              <p>Please Insert Your Last Name </p>
              <input
                name="lastName"
                placeholder={tutor.tutor_lastname}
                onChange={(event) => setlastName(event.target.value)}
                value={lastName}
              />
              <p>Please Insert Your Email </p>
              <input
                name="newEmail"
                placeholder={tutor.tutor_email}
                onChange={(event) => setNewTopicDescription(event.target.value)}
                value={newEmail}
              />
              <p>Please Insert Your Password </p>
              <input
                type="password"
                name="newPassword"
                placeholder={tutor.tutor_password}
                onChange={(event) => setnewPassword(event.target.value)}
                value={newPassword}
              />
              <fieldset>
                <legend>Is Tutor Active</legend>
                <div>
                  <input
                    type="checkbox"
                    name="newStudentActive"
                    //value="true"
                    onChange={(event) => setnewStudentActive(true)}
                    value={newStudentActive}
                  />
                  <label htmlFor="true">True</label>
                  <input
                    type="checkbox"
                    name="newStudentActive"
                    //value="false"
                    onChange={(event) => setnewStudentActive(true)}
                    value={newStudentActive}
                  />
                  <label htmlFor="false">False</label>
                </div>
              </fieldset>

              <p>Please Insert Your tutor image path </p>
              <input
                type="text"
                name="newImage"
                placeholder={tutor.tutor_image}
                onChange={(event) => setnewImage(event.target.value)}
                value={newImage}
              />
            </label>
            <p></p>
            <button>Update</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default EditTutor;
