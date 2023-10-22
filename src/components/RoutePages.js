import React from "react";
import { Routes, Route } from "react-router-dom";

import "../App.scss";
//  import "../css/App.css"

/* import Endpoint from "./Endpoint";

import SortTopics from "./topics/SortTopics";
import SortTutors from "./tutors/SortTutors";
import SingleQuiz from "./quizzes/SingleQuiz";
import SingleTutor from "./tutors/SingleTutor";
import SingleTopic from "./topics/SingleTopic";

import SortLessons from "./lessons/SortLessons";
import SortQuizzes from "./quizzes/SortQuizzes";
import SingleLesson from "./lessons/SingleLesson";
import SingleCourse from "./courses/SingleCourse";
import SortStudents from "./students/SortStudents";
import Userhomepage from "./userpages/Userhomepage";
import SingleStudent from "./students/SingleStudent";
import SortQuestions from "./questions/SortQuestions";
import SingleQuestion from "./questions/SingleQuestion"; */

import HomePage from "./home/Home";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Dashboard from "./dashboard/Dashboard";
import TutorProfile from "./dashboard/tutordashboard/TutorProfile";
import SortCourses from "./admin/courses/SortCourses";
import SingleCourse from "./admin/courses/SingleCourse";
import SortLessons from "./admin/lessons/SortLessons";
import SingleLesson from "./admin/lessons/SingleLesson";
import SortStudents from "./admin/students/SortStudents";
import SingleStudent from "./admin/students/SingleStudent";
import SortAdmins from "./admin/admins/SortAdmins";
import SingleAdmin from "./admin/admins/SingleAdmin";

const RoutePages = () => {
  return (
    <div className="App">
      <Routes>
       {/*  No Authorisation  */}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signin/:role" element={<Signin />}></Route>
        <Route path="/signup/:role" element={<Signup />}></Route>



         {/*  Authorisation Route  */}
         
        <Route path="/dashboard/:role" element={<Dashboard />}></Route>
        <Route path="/courselist" element={<SortCourses />}></Route>
        <Route path="/courses/:course_id" element={<SingleCourse />}></Route>
        <Route path="/lessonlist" element={<SortLessons />}></Route>
        <Route path="/lessons/:lesson_id" element={<SingleLesson />}></Route>
        <Route path="/studentlist" element={<SortStudents />}></Route>
        <Route path="/students/:student_id" element={<SingleStudent />}></Route> 

        <Route path="/adminlist" element={<SortAdmins />}></Route>
        <Route path="/admins/:admin_id" element={<SingleAdmin />}></Route> 
        
        <Route path="/tutorprofile/:role" element={<TutorProfile />}></Route>
      </Routes>
    </div>
  );
};

export default RoutePages;
