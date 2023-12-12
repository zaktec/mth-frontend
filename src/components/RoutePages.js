import React from 'react';
import { Routes, Route } from 'react-router-dom';

import '../App.scss';
import HomePage from './home/Home';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Dashboard from './dashboard/Dashboard';
import SortTopics from './topics/SortTopics';
import SortAdmins from './admins/SortAdmins';
import SortTutors from './tutors/SortTutors';
import SingleQuiz from './quizzes/SingleQuiz';
import SingleAdmin from './admins/SingleAdmin';
import SingleTutor from './tutors/SingleTutor';
import SingleTopic from './topics/SingleTopic';
import SortQuizzes from './quizzes/SortQuizzes';
import SortLessons from './lessons/SortLessons';
import SortCourses from './courses/SortCourses';
import SingleCourse from './courses/SingleCourse';
import SingleLesson from './lessons/SingleLesson';
import SortStudents from './students/SortStudents';
import QuizQuestion from './quizzes/QuizQuestion';
import SingleStudent from './students/SingleStudent';
import SortQuestions from './questions/SortQuestions';
import SingleQuestion from './questions/SingleQuestion';
import TutorProfile from './dashboard/tutordashboard/TutorProfile';

const RoutePages = () => {
  return (
    <div className='App'>
      <Routes>
       {/*  No Authorisation  */}
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/:role/signin' element={<Signin />}></Route>
        <Route path='/:role/signup' element={<Signup />}></Route>
        <Route path='/adminlist' element={<SortAdmins />}></Route>
         <Route path='/tutorlist' element={<SortTutors />}></Route>
        <Route path='/studentlist' element={<SortStudents />}></Route>
      
        <Route path='/tutorprofile/:role' element={<TutorProfile />}></Route>
       

       {/*  new routes */}
       <Route path='/:role/questions' element={<SortQuestions />}></Route> 
       <Route path='/:role/questions/:question_id' element={<SingleQuestion />}></Route>


        <Route path='/:role/lessons' element={<SortLessons />}></Route>
        <Route path='/:role/lessons/:lesson_id' element={<SingleLesson />}></Route>

        <Route path='/:role/dashboard' element={<Dashboard />}></Route>

        <Route path='/:role/courses' element={<SortCourses />}></Route>
        <Route path='/:role/courses/:course_id' element={<SingleCourse />}></Route>

        <Route path='/:role/quizzes' element={<SortQuizzes />}></Route>
        <Route path='/:role/quizzes/:quiz_id' element={<SingleQuiz />}></Route>

        <Route path='/:role/topics' element={<SortTopics />}></Route>
        <Route path='/:role/topics/:topic_id' element={<SingleTopic />}></Route> 



        <Route path='/:role/quiz-questions/:quiz_id' element={<QuizQuestion />}></Route>
        <Route path='/:role/get-admins/:admin_id' element={<SingleAdmin />}></Route>
        <Route path='/:role/get-tutors/:tutor_id' element={<SingleTutor />}></Route>
        <Route path='/:role/get-students/:student_id' element={<SingleStudent />}></Route> 
      </Routes>
    </div>
  );
};

export default RoutePages;
