import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleStudentApi } from "../../api/axios";
import DeleteStudent from "./DeleteStudent";
import EditStudent from "./EditStudent";
import StudentCSS from "../../css/student.module.css";

function SingleStudent() {
  const { student_id } = useParams();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    
    getSingleStudentApi(student_id).then((res) => {
      setStudent(res);
     
    });
  }, [student_id]);
  console.log(student_id)

  return (
  <main className={StudentCSS.SingleStudentPage}>
      <h1> Single Student page </h1>
      <ul className={StudentCSS.StudentList}>
        <li className="StudentList__card">
        <p>
            <b>Student ID :</b> {student.student_id}
          </p>
          <p>
            <b>Student Firstname :</b> {student.student_firstname}
          </p>
          <p>
            <b>Student Lastname :</b> {student.student_lastname}
          </p>
          <p>
            <b>Student Email :</b> {student.student_email}
          </p>

          <p>
            <b>Student Password :</b> {student.student_password}
          </p>

          <p>
            <b>Student Active :</b> {student.student_active}
          </p>
          <p>
            <b>Student Grade :</b> {student.student_grade}
          </p>
          <p>
            <b>Student TargetGrade :</b> {student.student_targetgrade}
          </p>
          <p>
            <b>Student Notes :</b> {student.student_notes}
          </p>
          <p>
            <b>Student ProgressBar :</b> {student.student_progressbar}
          </p>
          <p>
            <b>Student Image :</b> {student.student_image}
          </p>

          <DeleteStudent student_id={student.student_id} 
          setStudent={setStudent} 
          />
          <EditStudent student = {student}/>
        </li>
      </ul>
    </main>
  );
}

export default SingleStudent;