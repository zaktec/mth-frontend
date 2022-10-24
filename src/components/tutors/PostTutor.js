import React, { useState } from "react";
import {  postTutorApi } from "../../utils/api";

function PostTutor(props) {
  const { setTutorList } = props;
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
      tutor_firstname:  newFirstName,
      tutor_lastname:  lastName,
      tutor_email:  newEmail,
      tutor_password:  newPassword,
      tutor_active: newStudentActive,
      tutor_image: newImage,
    };
   
    // newObject.course_image = 0;

   postTutorApi(newObject).then((response)=>{
    setTutorList((currentValue) => {
      const newTutorList = currentValue.map((tutor) => {
        return { ...tutor };
      });
      newTutorList.unshift(response);
      console.log(newTutorList);
      setPostDisplay(false)
      return newTutorList;
    });
   });  
  };
  return (
    <div>
      <button
        onClick={() =>
          setPostDisplay((currentValue) => {
            return !currentValue;
          })
        }
      >Add Tutor
      </button>
      {displayPost ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Please Insert Your First Name </p>
              <input
                name="newFirstName"
                placeholder="Insert First Name"
                onChange={(event) => setnewFirstName(event.target.value)}
                value={newFirstName}
              />
              <p>Please Insert Your Last Name  </p>
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={(event) => setlastName(event.target.value)}
                value={lastName}
              />
              <p>Please Insert Your Email </p>
              <input
                name="newEmail"
                placeholder="Email"
                onChange={(event) =>
                  setNewTopicDescription(event.target.value)
                }
                value={newEmail}
              />
<p>Please Insert Your Password </p>
              <input type="password"
                name="newPassword"
                placeholder="Password"
                onChange={(event) => setnewPassword(event.target.value)}
                value={newPassword}
              />
<fieldset>
                <legend>Is Student Active</legend>
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
              <input type="text"
                name="newImage"
                placeholder="Image Path"
                onChange={(event) => setnewImage(event.target.value)}
                value={newImage}
              />
            </label>
            <p></p>
            <button>Go!</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default PostTutor;
