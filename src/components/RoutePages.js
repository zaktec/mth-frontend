import React from "react";
import { Routes, Route } from "react-router-dom";

import "../App.scss";
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
import SortTutors from "./admin/tutors/SortTutors";
import SingleTutor from "./admin/tutors/SingleTutor";
import SortTopics from "./admin/topics/SortTopics";
import SingleTopic from "./admin/topics/SingleTopic";
import SortQuizzes from "./admin/quizzes/SortQuizzes";
import SingleQuiz from "./admin/quizzes/SingleQuiz";
import SortQuestions from "./admin/questions/SortQuestions";
import SingleQuestion from "./admin/questions/SingleQuestion";

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

         <Route path="/tutorlist" element={<SortTutors />}></Route>
        <Route path="/tutors/:tutor_id" element={<SingleTutor />}></Route>  

        <Route path="/topiclist" element={<SortTopics />}></Route>
        <Route path="/topics/:topic_id" element={<SingleTopic />}></Route> 

        <Route path="/quizlist" element={<SortQuizzes />}></Route>
        <Route path="/quizzes/:quiz_id" element={<SingleQuiz />}></Route>  

        <Route path="/questionlist" element={<SortQuestions />}></Route>
        <Route path="/questions/:question_id" element={<SingleQuestion />}></Route>  
        
        <Route path="/tutorprofile/:role" element={<TutorProfile />}></Route>
      </Routes>
    </div>
  );
};

export default RoutePages;
