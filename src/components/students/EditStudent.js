import React, { useState } from "react";
import { postStudentApi } from "../../api/axios";
import StudentCSS from "../../css/student.module.css";

function EditStudent(props) {
  const { student } = props;
  const [displayPost, setPostDisplay] = useState(false);
  const [newStudentActive, setnewStudentActive] = useState(false);
  const [newFirstName, setnewFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newImage, setnewImage] = useState("");
  const [newGrade, setNewGrade] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newEmail, setNewTopicDescription] = useState("");
  const [newTargetGrade, setNewTargetGrade] = useState("");
  const [newProgressBar, setnewProgressBar] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = {
      student_firstname:
        newFirstName === "" ? student.student_firstname : newFirstName,
      student_lastname: lastName === "" ? student.student_lastname : lastName,
      student_email: newEmail === "" ? student.student_email : newEmail,
      student_password:
        newPassword === "" ? student.student_password : newPassword,
      student_active:
        newStudentActive === "" ? student.student_active : newStudentActive,
      student_grade: newGrade === "" ? student.student_grade : newGrade,
      student_targetgrade:
        newTargetGrade === "" ? student.student_targetgrade : newTargetGrade,
      student_notes: newNotes === "" ? student.student_notes : newNotes,
      student_progressbar:
        newProgressBar === "" ? student.student_progressbar : newProgressBar,
      student_image: newImage === "" ? student.student_image : newImage,
    };

    // newObject.course_image = 0;

    postStudentApi(newObject).then((response) => {});
  };
  return (
    <div className={StudentCSS.EditStudentPage}>
      <button
        onClick={() =>
          setPostDisplay((currentValue) => {
            return !currentValue;
          })
        }
      >
        Edit Student
      </button>
      {displayPost ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Please Insert Your First Name </p>
              <input
                name="newFirstName"
                placeholder={student.student_firstname}
                onChange={(event) => setnewFirstName(event.target.value)}
                value={newFirstName}
              />
              <p>Please Insert Your Last Name </p>
              <input
                name="lastName"
                placeholder={student.student_lastname}
                onChange={(event) => setlastName(event.target.value)}
                value={lastName}
              />
              <p>Please Insert Your Email </p>
              <input
                name="newEmail"
                placeholder={student.student_email}
                onChange={(event) => setNewTopicDescription(event.target.value)}
                value={newEmail}
              />
              <p>Please Insert Your Password </p>
              <input
                type="password"
                name="newPassword"
                placeholder={student.student_password}
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

              <p>Please Insert Your Grade </p>
              <input
                type="number"
                min="1"
                max="15"
                name="newGrade"
                placeholder={student.student_grade}
                onChange={(event) => setNewGrade(event.target.value)}
                value={newGrade}
              />
              <p>Please Insert Your Target grade </p>
              <input
                type="number"
                min="1"
                max="15"
                name="newTargetGrade"
                placeholder={student.student_targetgrade}
                onChange={(event) => setNewTargetGrade(event.target.value)}
                value={newTargetGrade}
              />
              <p>Please Insert Your notes </p>
              <input
                type="text"
                name="newNotes"
                placeholder={student.student_notes}
                onChange={(event) => setNewNotes(event.target.value)}
                value={newNotes}
              />
              <p>Please Insert the progress bar </p>
              <input
                type="number"
                min="1"
                max="15"
                name="newProgressBar"
                placeholder={student.student_progressbar}
                onChange={(event) => setnewProgressBar(event.target.value)}
                value={newProgressBar}
              />
              <p>Please Insert Your student image path </p>
              <input
                type="text"
                name="newImage"
                placeholder={student.student_image}
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

export default EditStudent;
