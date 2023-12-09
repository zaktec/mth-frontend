import React from 'react';
import Navbar from "../navbar/Navbar";
import { verifyAuth } from '../../helpers';
import { useParams } from 'react-router-dom';
import TutorProfile from "./tutordashboard/TutorProfile";
import AdminProfile from './admindashboard/AdminProfile';
import StudentProfile from "./studentdashboard/StudentProfile";

const Dashboard = () => {
  const { role } = useParams();
  const authData = verifyAuth();

  return (
    <>
    {
      role === "student" ? 
        <div className='dashboard-unique'> 
          <Navbar authData= { authData } page='student-dashboard' />
          <StudentProfile authData= { authData } /> 
        </div>
      : role === "tutor" ?
        <div className='dashboard-unique'> 
          <Navbar authData= { authData } page='tutor-dashboard' />
          <TutorProfile authData= { authData } />
        </div>
      : role === "admin" ? 
        <div className='dashboard-unique'> 
          <Navbar authData= { authData } page='admin-dashboard' />
          <AdminProfile authData= { authData } />
        </div>
      : null
    }
    </>
  );
}

export default Dashboard;
