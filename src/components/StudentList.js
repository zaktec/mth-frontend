import React from "react";
import { useEffect, useState } from "react";
import { getStudents } from "../utils/api";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents().then((studentsFromApi) => {
      setStudents(studentsFromApi);
    });
  }, []);
console.log(students)
  return (
    <main className="StudentPage">
      <h2>Students</h2>
      <ul className="Students__list">
        {students.map((student) => {
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
