import React from "react";
import { Link } from "react-router-dom";
 import PostStudent from "./PostStudent"; 

const StudentList = (props) => {
  if (props?.isLoading) return <p>Loading....</p>
  console.log(props);

  return (
    <div className={"MainListPage"}>
      <h2 className="MainList__h1">Students</h2>
     
       <PostStudent token = {props?.token} /> 

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

                {/* <img
                className="Student__avatar-img"
                src={student.student_image}
                alt={student.student_firstname}
              ></img> */}
                <button> Click for more detail</button>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default StudentList;
