import React from "react";
import { Link } from "react-router-dom";
 import PostStudent from "./PostStudent"; 

const StudentList = (props) => {
  if (props?.isLoading) return <p>Loading....</p>

  return (
    <div className={"MainListPage"}>
      <h2 className="MainList__h1">Students</h2>
     
       <PostStudent authData = {props?.authData} /> 

        <ul className={"Main__List"}>
        {props?.data.map((element) => (
            <Link key={element.student_id} to={`/admin/get-students/${element.student_id}`} >
              <li key={element.student_id} className={"MainList__card"}>
                <p>
                  <b>Student ID :</b> {element.student_id}
                </p>
                <p>
                  <b>Student Firstname :</b> {element.student_firstname}
                </p>
                <p>
                  <b>Student Lastname :</b> {element.student_lastname}
                </p>
                <p>
                  <img src={element.student_image} alt={element.student_firstname} ></img>
                </p>
                
                <button> Click for more detail</button>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default StudentList;
