import "./css/App.css";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Endpoint from "./components/Endpoint";
import SingleStudent from "./components/students/SingleStudent";
import SingleCourse from "./components/courses/SingleCourse";
import SingleTopic from "./components/topics/SingleTopic";
import SortStudents from "./components/students/SortStudents";
import SortTopics from "./components/topics/SortTopics";
import SortCourses from "./components/courses/SortCourses";
import SortTutors from "./components/tutors/SortTutors";
import SingleTutor from "./components/tutors/SingleTutor";
import SortLessons from "./components/lessons/SortLessons";
import SingleLesson from "./components/lessons/SingleLesson";
import SortQuizzes from "./components/quizzes/SortQuizzes";
import SingleQuiz from "./components/quizzes/SingleQuiz";
import SortQuestions from "./components/questions/SortQuestions";
import SingleQuestion from "./components/questions/SingleQuestion";
import Userhomepage from "./components/userpages/Userhomepage";
import Layout from "./components/layouts/Layout";
import AdminHome from "./components/admin/Adminhome";
import RequireAuth from "./components/auth/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        {/* public routes */}

      

        {/*  Admin Protected Route */}
        <Route element={<RequireAuth />}>

        <Route path="/admindb" element={<AdminHome />}></Route>
        </Route>


        {/*  Tutor Protected Route */}
        <Route path="/endpoint" element={<Endpoint />}></Route>
        {/*  Student Protected Route */}
        <Route path="/endpoint" element={<Endpoint />}></Route>


     {/* catch All */}
     <Route path="*" element={<Home />}></Route>


        <Route path="/endpoint" element={<Endpoint />}></Route>
        <Route path="/userhomepage" element={<Userhomepage />}></Route>
        <Route path="/courselist" element={<SortCourses />}></Route>
        <Route path="/courses/:course_id" element={<SingleCourse />}></Route>
        <Route path="/topiclist" element={<SortTopics />}></Route>
        <Route path="/topics/:topic_id" element={<SingleTopic />}></Route>
        <Route path="/studentlist" element={<SortStudents />}></Route>
        <Route path="/students/:student_id" element={<SingleStudent />}></Route>
        <Route path="/tutorlist" element={<SortTutors />}></Route>
        <Route path="/tutors/:tutor_id" element={<SingleTutor />}></Route>
        <Route path="/lessonlist" element={<SortLessons />}></Route>
        <Route path="/lessons/:lesson_id" element={<SingleLesson />}></Route>
        <Route path="/lessonlist" element={<SortLessons />}></Route>
        <Route path="/lessons/:lesson_id" element={<SingleLesson />}></Route>
        <Route path="/quizlist" element={<SortQuizzes />}></Route>
        <Route path="/quizzes/:quiz_id" element={<SingleQuiz />}></Route>
        <Route path="/questionlist" element={<SortQuestions />}></Route>
        <Route path="/question/:ques_id" element={<SingleQuestion />}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
