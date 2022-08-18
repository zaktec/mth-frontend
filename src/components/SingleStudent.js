import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getSingleStudentApi } from '../utils/api';

function SingleStudent() {
    const { student_id } =useParams();
    const [student, setStudent]= useState({});
    
useEffect(() => {
    getSingleStudentApi(student_id).then((res) => {
        setStudent(res)
    });
}, [student_id]);


    return (
        <main className='SingleStudentPage'>
            <h1> Single Student page </h1>
            <ul className='StudentList'>
                <li className='StudentList__card'>
                <p><b>Student Firstname :</b> {student.student_firstname}</p>
                <p><b>Student Lastname :</b> {student.student_lastname}</p>
                <p><b>Student Lastname :</b> {student.student_lastname}</p>
{/* 
   "student_id": 1,
      "student_firstname": "Student1FN",
      "student_lastname": "Student1LN",
      "student_email": "csheraz@hotmail.com",
      "student_password": "password",
      "student_active": true,
      "student_grade": 2,
      "student_targetgrade": 5,
      "student_notes": "Working well",
      "student_progressbar": 3,
      "student_image": "/student/student1.png" */}


                </li>






            </ul>




        </main>
       
    )
}

export default SingleStudent
