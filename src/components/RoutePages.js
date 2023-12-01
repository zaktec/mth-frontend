import React from 'react';
import { Routes, Route } from 'react-router-dom';

import '../App.scss';
import HomePage from './home/Home';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Dashboard from './dashboard/Dashboard';
import SortTopics from './admin/topics/SortTopics';
import SortAdmins from './admin/admins/SortAdmins';
import SortTutors from './admin/tutors/SortTutors';
import SingleQuiz from './admin/quizzes/SingleQuiz';
import SingleAdmin from './admin/admins/SingleAdmin';
import SingleTutor from './admin/tutors/SingleTutor';
import SingleTopic from './admin/topics/SingleTopic';
import SortQuizzes from './admin/quizzes/SortQuizzes';
import SortLessons from './admin/lessons/SortLessons';
import SortCourses from './admin/courses/SortCourses';
import SingleCourse from './admin/courses/SingleCourse';
import SingleLesson from './admin/lessons/SingleLesson';
import SortStudents from './admin/students/SortStudents';
import SingleStudent from './admin/students/SingleStudent';
import SortQuestions from './admin/questions/SortQuestions';
import SingleQuestion from './admin/questions/SingleQuestion';
import TutorProfile from './dashboard/tutordashboard/TutorProfile';

const RoutePages = () => {
  return (
    <div className='App'>
      <Routes>
       {/*  No Authorisation  */}
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/signin/:role' element={<Signin />}></Route>
        <Route path='/signup/:role' element={<Signup />}></Route>

         {/*  Authorisation Route  */}
        <Route path='/quizlist' element={<SortQuizzes />}></Route>
        <Route path='/topiclist' element={<SortTopics />}></Route>
        <Route path='/adminlist' element={<SortAdmins />}></Route>
         <Route path='/tutorlist' element={<SortTutors />}></Route>
        <Route path='/lessonlist' element={<SortLessons />}></Route>
        <Route path='/courselist' element={<SortCourses />}></Route>
        <Route path='/studentlist' element={<SortStudents />}></Route>
        <Route path='/:role/dashboard' element={<Dashboard />}></Route>
        <Route path='/questionlist' element={<SortQuestions />}></Route> 
        <Route path='/quizzes/:quiz_id' element={<SingleQuiz />}></Route>
        <Route path='/topics/:topic_id' element={<SingleTopic />}></Route>
        <Route path='/tutorprofile/:role' element={<TutorProfile />}></Route>
        <Route path='/courses/:course_id' element={<SingleCourse />}></Route>
        <Route path='/lessons/:lesson_id' element={<SingleLesson />}></Route>
        <Route path='/questions/:question_id' element={<SingleQuestion />}></Route>
        <Route path='/:role/get-admins/:admin_id' element={<SingleAdmin />}></Route>
        <Route path='/:role/get-tutors/:tutor_id' element={<SingleTutor />}></Route>
        <Route path='/:role/get-students/:student_id' element={<SingleStudent />}></Route> 
      </Routes>
    </div>
  );
};

export default RoutePages;
