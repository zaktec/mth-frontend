import React from "react";
import { Routes, Route } from "react-router-dom";

import '../App.scss';
// import "../css/App.css"
import Home from "./Home";
import Endpoint from "./Endpoint";
import Footer from "./layouts/Footer";
import Layout from "./layouts/Layout";
import AdminHome from "./admin/Adminhome";
import RequireAuth from "./auth/RequireAuth";
import SortTopics from "./topics/SortTopics";
import SortTutors from "./tutors/SortTutors";
import SingleQuiz from "./quizzes/SingleQuiz";
import SingleTutor from "./tutors/SingleTutor";
import SingleTopic from "./topics/SingleTopic";
import SortCourses from "./courses/SortCourses";
import SortLessons from "./lessons/SortLessons";
import SortQuizzes from "./quizzes/SortQuizzes";
import SingleLesson from "./lessons/SingleLesson";
import SingleCourse from "./courses/SingleCourse";
import SortStudents from "./students/SortStudents";
import Userhomepage from "./userpages/Userhomepage";
import SingleStudent from "./students/SingleStudent";
import SortQuestions from "./questions/SortQuestions";
import SingleQuestion from "./questions/SingleQuestion";

import HomePage from "./home/Home";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Dashboard from "./dashboard/Dashboard";

const RoutePages = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Home />}></Route>
        <Route path="/" element={<Layout />}></Route>
        <Route element={<RequireAuth />}>
            <Route path="/admindb" element={<AdminHome />}></Route>
        </Route>

        <Route path="/endpoint" element={<Endpoint />}></Route>
        <Route path="/endpoint" element={<Endpoint />}></Route>
        <Route path="/endpoint" element={<Endpoint />}></Route>
        <Route path="/quizlist" element={<SortQuizzes />}></Route>
        <Route path="/tutorlist" element={<SortTutors />}></Route>
        <Route path="/topiclist" element={<SortTopics />}></Route>
        <Route path="/courselist" element={<SortCourses />}></Route>
        <Route path="/lessonlist" element={<SortLessons />}></Route>
        <Route path="/lessonlist" element={<SortLessons />}></Route>
        <Route path="/studentlist" element={<SortStudents />}></Route>
        <Route path="/userhomepage" element={<Userhomepage />}></Route>
        <Route path="/questionlist" element={<SortQuestions />}></Route>
        <Route path="/quizzes/:quiz_id" element={<SingleQuiz />}></Route>
        <Route path="/tutors/:tutor_id" element={<SingleTutor />}></Route>
        <Route path="/topics/:topic_id" element={<SingleTopic />}></Route>
        <Route path="/courses/:course_id" element={<SingleCourse />}></Route>
        <Route path="/lessons/:lesson_id" element={<SingleLesson />}></Route>
        <Route path="/lessons/:lesson_id" element={<SingleLesson />}></Route>
        <Route path="/question/:ques_id" element={<SingleQuestion />}></Route>
        <Route path="/students/:student_id" element={<SingleStudent />}></Route>

        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/signin/:role" element={<Signin />}></Route>
        <Route path="/signup/:role" element={<Signup />}></Route>
        <Route path="/dashboard/:role" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default RoutePages;
