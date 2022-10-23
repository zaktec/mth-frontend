import React from "react";
import "../../styles/App.css";
import { useEffect, useState } from "react";
import { getStudentsApi } from '../../utils/api';
import { Link } from "react-router-dom";
import PostStudent from "./PostStudent";

const StudentList = (props) => {
  console.log(props)
  const [isLoading, setIsLoading] = useState(true);
  const [studentList, setStudentList] = useState([]);

  
  useEffect(() => {
    getStudentsApi(props.sortBy).then((studentsFromApi) => {
      setStudentList(studentsFromApi);
      console.log(studentsFromApi)
      setIsLoading(false);
      
      
    });
  }, [props.sortBy]);
  // console.log("Studnetlist>>",studentList)
  // console.log(studentList.student_id)

if (isLoading) return <p>Loading....</p>;

  return (
    <main className="StudentPage">
      <h2>Students</h2>
      <ul className="Students__list">

       <PostStudent setStudents={setStudentList}/> 

        {studentList.map((student) => {
          return (
            <Link key={student.student_id} to={`/students/${student.student_id}`}>
            <li key={student.student_id} className="Student__card">
            <p><b>Student ID :</b> {student.student_id}</p>
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
    </main>
  );
};

export default StudentList;
