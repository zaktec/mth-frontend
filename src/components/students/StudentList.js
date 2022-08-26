import React from "react";
import "../../styles/App.css";
import { useEffect, useState } from "react";
import { getStudents } from '../../utils/api';
import { Link } from "react-router-dom";
import PostStudent from "./PostStudent";

const StudentList = (props) => {
  console.log(props)
 const { SortBy } = props
  const [isLoading, setIsLoading] = useState(true);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    getStudents(SortBy).then((studentsFromApi) => {
      setStudentList(studentsFromApi);
      setIsLoading(false);
      
    });
  }, [SortBy]);

if (isLoading) return <p>Loading....</p>;

  return (
    <main className="StudentPage">
      <h2>Students</h2>
      <ul className="Students__list">

      <PostStudent
            student_id={studentList.student_id}
            setStudents={setStudentList}
          />

        {studentList.map((student) => {
          return (
            <Link key={student.student_id} to={`/students/${student.student_id}`}>
            <li key={student.student_id} className="Student__card">
              <h4> {student.student_firstname} {student.student_lastname}</h4>
             
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
