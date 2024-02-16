import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { APIsRequests } from '../../../api/APIsRequests';


const TutorStudents = (props) => {
  const [state, setState] = useState({
    displayForm: false,
    isLoading: true,
    data: [],
   
  });

  useEffect(() => {
    const getTutorStudentsApi = async (token) => {
      await APIsRequests.getTutorStudentsApi(token)
        .then((response) => {
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
  
  if (state.isLoading) return <p>Loading....</p>;

  return (
    <div className='EditMainPage'>
      {state?.displayForm === true ? (
        <button onClick={(event) => handleDisplayForm(event)}>  STUDENT </button>
      ) : (
        <button onClick={(event) => handleDisplayForm(event)}> SEE STUDENT </button>
      )}

      {state.displayForm === true && (
        <ul className='Main__List'>
          { state.data.map((element) => (
              <Link key={element.student_id} to={`/tutor/get-students/${element.student_id}`} >
                <li key={element.student_id} className='MainList__card'>
                  <p>
                    <b>Student ID :</b> {element.student_id}
                  </p>
                  <p>
                    <b>Student Firstname :</b> {element.student_firstname}
                  </p>
                  <p>
                    <b>Student Lastname :</b> {element.student_lastname}
                  </p>
                  <button> Click for more detail</button>
                </li>
              </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TutorStudents;
