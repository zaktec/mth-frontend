import React from 'react';
import { Routes, Route } from 'react-router-dom';

import '../App.scss';

import QuizFeedback from './quizzes/QuizFeedback.jsx';
import QuizQuestion from './quizzes/QuizQuestion.jsx';
import QuizQuestions from './quizzes/QuizQuestions.jsx';
import QuizInstruction from './quizzes/QuizInstruction.jsx';

import HomePage from './home/Home.jsx';
import Signin from './auth/Signin.jsx';
import Signup from './auth/Signup.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
import SortTopics from './topics/SortTopics.jsx';
import SortAdmins from './admins/SortAdmins.jsx';
import SortTutors from './tutors/SortTutors.jsx';
import SingleQuiz from './quizzes/SingleQuiz.jsx';
import SingleAdmin from './admins/SingleAdmin.jsx';
import SingleTutor from './tutors/SingleTutor.jsx';
import SingleTopic from './topics/SingleTopic.jsx';
import SortQuizzes from './quizzes/SortQuizzes.jsx';
import SortLessons from './lessons/SortLessons.jsx';
import SortCourses from './courses/SortCourses.jsx';
import SingleCourse from './courses/SingleCourse.jsx';
import SingleLesson from './lessons/SingleLesson.jsx';
import SortStudents from './students/SortStudents.jsx';
import VerifyShareable from './auth/VerifyShareable.jsx';
import SingleStudent from './students/SingleStudent.jsx';
import SortQuestions from './questions/SortQuestions.jsx';
import SingleQuestion from './questions/SingleQuestion.jsx';

const RoutePages = () => {
  return (
    <div className='App'>
      <Routes>
        {/*  No Authorisation  */}
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/:role/signin' element={<Signin />}></Route>
        <Route path='/:role/signup' element={<Signup />}></Route>
        <Route path='/:role/dashboard' element={<Dashboard />}></Route>
        
        <Route path='/:role/admins' element={<SortAdmins />}></Route>
        <Route path='/:role/tutors' element={<SortTutors />}></Route>
        <Route path='/:role/students' element={<SortStudents />}></Route>
        
        {/*  new routes */}
        <Route path='/:role/questions' element={<SortQuestions />}></Route> 
        <Route path='/:role/questions/:question_id' element={<SingleQuestion />}></Route>

        <Route path='/:role/lessons' element={<SortLessons />}></Route>
        <Route path='/:role/lessons/:lesson_id' element={<SingleLesson />}></Route>

        <Route path='/:role/courses' element={<SortCourses />}></Route>
        <Route path='/:role/courses/:course_id' element={<SingleCourse />}></Route>

        <Route path='/:role/quizzes' element={<SortQuizzes />}></Route>
        <Route path='/:role/quizzes/:quiz_id' element={<SingleQuiz />}></Route>

        <Route path='/:role/topics' element={<SortTopics />}></Route>
        <Route path='/:role/topics/:topic_id' element={<SingleTopic />}></Route> 

        <Route path='/:role/get-admins/:admin_id' element={<SingleAdmin />}></Route>
        <Route path='/:role/get-tutors/:tutor_id' element={<SingleTutor />}></Route>

        <Route path='/:role/get-students/:student_id' element={<SingleStudent />}></Route>
        <Route path='/:role/verify-shareable-link/:session' element={<VerifyShareable />}></Route>


        <Route path='/:role/quiz-feedback' element={<QuizFeedback />}></Route>
        <Route path='/:role/quiz-question' element={<QuizQuestion />}></Route>
        <Route path='/:role/quiz-questions' element={<QuizQuestions />}></Route>
        <Route path='/:role/quiz-instruction' element={<QuizInstruction />}></Route>
      </Routes>
    </div>
  );
};

export default RoutePages;
