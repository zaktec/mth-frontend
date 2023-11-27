import React, { useState, useEffect } from "react";
import { APIsRequests } from "../../../api/APIsRequests";
import { Link } from "react-router-dom";

const TutorStudents = (props) => {
  console.log("propos>>>",props);
  const [state, setState] = useState({
    displayForm: false,
    data: [],
    isLoading: true
   
  });

  useEffect(() => {
    const getTutorStudentsApi = async (token) => {
      await APIsRequests.getTutorStudentsApi(token)
        .then((response) => {
          console.log("22",response)
          return setState((prevState) => ({
            ...prevState,
            isLoading: false,
            data: response?.data?.data,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getTutorStudentsApi(props?.authData?.token);
  }, [props?.authData?.token]);

  const handleDisplayForm = async (event) => {
    event.preventDefault();
    if (state.displayForm === true)
      return setState((prevState) => ({ ...prevState, displayForm: false }));
    if (state.displayForm === false)
      return setState((prevState) => ({ ...prevState, displayForm: true }));
  };


/*   if (state.isLoading) return <p>Loading....</p>; */
  return (
    <div className="EditMainPage">
      {state?.displayForm === true ? (
        <button onClick={(event) => handleDisplayForm(event)}>
          No Students{" "}
        </button>
      ) : (
        <button onClick={(event) => handleDisplayForm(event)}>
          See Student
        </button>
      )}
      {state.displayForm === true && (
        <ul className={"Main__List"}>
          {props?.data.map((student) => {
            return (
              <Link
                key={student.student_id}
                to={`/students/${student.student_id}`}
              >
                <li key={student.student_id} className={"MainList__card"}>
                  <p>
                    <b>Student ID :</b> {student.student_id}
                  </p>
                  <p>
                    <b>Student Firstname :</b> {student.student_firstname}
                  </p>
                  <p>
                    <b>Student Lastname :</b> {student.student_lastname}
                  </p>

                  <button> Click for more detail</button>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TutorStudents;
