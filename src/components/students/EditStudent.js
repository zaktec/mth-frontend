import React, { useState } from "react";
import { patchStudentApi } from "../../utils/api";

const EditStudent = (props) => {
  console.log(props);
  const { student_id, student_firstname, student_lastname, student_email, student_password, student_active,student_grade, student_targetgrade, student_progressbar, student_notes, student_image } = props.student

  const{ setStudent }= props.setStudent
  const [displayPost, setPostDisplay] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] =useState(student_lastname);
  console.log(lastName , "<<")
  const [email, setEmail] = useState(student_email);
  const [password, setPassword] = useState(student_password);
  const [active, setActive] = useState(student_active);
  const [grade, setGrade] = useState(student_grade);
  const [targetGrade, setTargetGrade] = useState(student_targetgrade);
  const [studentNotes, setStudentNotes] = useState(student_notes);
  const [progressbar, setProgressbar] = useState(student_progressbar);
  const [image, setImage] = useState(student_image);


  const handleChange = (event) => {
     console.log(event.target.value)
    
    // if (event.target.value) {
    //   console.log('input value is NOT empty');
     setLastName(event.target.value)
      console.log(event.target.value)
    // } else {
    
    //   console.log('input value is empty');
    //   event.target.value= student_lastname
    // }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  //  if (firstName ===""){
    setFirstName(student_firstname)
   console.log( "submitting >>>>>", firstName)
   setFirstName("")
   }
// setFirstName(student_firstname)
// // }
//     console.log(">>>>",firstName)
    const newObject = { student_firstname: firstName, student_lastname: lastName, student_email: email, student_password: password, student_active: active, student_grade:grade, student_targetgrade:targetGrade, student_progressbar: progressbar, student_notes: studentNotes, student_image:image};
   // console.log(newCourseName, newCode);
    console.log(newObject, student_id);
    patchStudentApi(student_id, newObject);  
    // setStudent((currentValue) => {
    //   const newStudentList = currentValue.map((student) => {
    //     return { ...student };
    //   });
    // //   // newObject.course_level = 0;
    // //   // newObject.course_image = 0;
    // //   // newObject.course_desc = "created now";
    //   newStudentList.unshift(newObject);
    //    console.log(newStudentList)

    //    return newStudentList;
    //  });
  
  return (
    <div>
      <button
        onClick={() =>
          setPostDisplay((currentValue) => {
            return !currentValue;
          })
        }
      >
        Edit Student Id {student_id}
      </button>
      {displayPost ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Please Edit your Detail </p>
              <div>
              <b>Student Firstname :  </b> 
                <input
                  type="text"
                  name="firstName"
                  placeholder={student_firstname}
                 
                  onChange={(event) => setFirstName(event.target.value)}
                  value={student_firstname}
                
                  
                />
              </div><br></br></label>
              <label><div>
              <b>Student Lastname :  </b>
                <input
                  type="text"
                  name="lastName"
                  placeholder={student_lastname}
                  onChange={handleChange}
                  value ={lastName}
                />
              </div></label><br></br>
              <label><div>
              <b>Student Email : </b>
                <input
                  type="email"
                  name="email"
                  placeholder={student_email}
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
              </div> </label>
              <br></br>
              <label>
              <div>
              <b>Student Password :  </b> 
                <input
                  type="password"
                  name="password"
                  placeholder={student_password}
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
              </div></label>
              <br></br>
              <label>
              <div>
              <b>Student Active :  </b>

              {/* <input type="checkbox" name="part-time" value="part"/>Part-Time
              <input type="checkbox" name="full-time" value="full"/>Full-Time */}
                <input
                  type="text"
                  name="active"
                  placeholder={student_active}
                  onChange={(event) => setActive(event.target.value)}
                  value={active}
                />
              </div> </label>
              <br></br>
              <label>
              <div>
              <b>Student Grade :  </b> 
                <input
                  type="number"
                  name="grade"
                  placeholder={student_grade}
                  onChange={(event) => setGrade(event.target.value)}
                  value={grade}
                />
              </div> </label>
              <br></br>
              <label>
              <div>
              <b>Student TargetGrade :  </b> 
                <input
                  type="number"
                  name="targetGrade"
                  placeholder={student_targetgrade}
                  onChange={(event) => setTargetGrade(event.target.value)}
                  value={targetGrade}
                />
              </div> </label>
              <br></br>
              <label>
              <div>
              <b>Student ProgressBar :  </b> 
                <input
                  type="number"
                  name="progressbar"
                  placeholder={student_grade}
                  onChange={(event) => setProgressbar(event.target.value)}
                  value={progressbar}
                />
              </div> </label>
              <br></br>
              <label>
              <div>
              <b>Student Notes :  </b> 
                <input
                  type="text"
                  name="studentNotes"
                  placeholder={student_notes}
                  onChange={(event) => setStudentNotes(event.target.value)}
                  value={studentNotes}
                />
              </div> </label>
              <br></br>
              <label>
              <div>
              <b>Student Image : </b> 
                <input
                  type="text"
                  name="image"
                  placeholder={student_image}
                  onChange={(event) => setImage(event.target.value)}
                  value={image}
                />
              </div> </label>
              <br></br>
            <button>Go!</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
      }
    

export default EditStudent;
