import React from 'react';
import Navbar from "../navbar/Navbar";
import { verifyAuth } from '../../helpers';
import { useParams } from 'react-router-dom';
import AdminProfile from './admindashboard/AdminProfile';
import StudentProfile from "./studentdashboard/StudentProfile";
import TutorProfile from "./tutordashboard/TutorProfile";

const Dashboard = () => {
  const { role } = useParams();
  const authData = verifyAuth();

  return (
    <>
    {
      role === "student" ? 
        <div className='dashboard-unique'> 
          <Navbar authData= { authData } page='dashboard-student' />
          Student Dashboard 
          <StudentProfile authData= { authData } /> 
        </div>
      : role === "tutor" ?
        <div className='dashboard-unique'> 
          <Navbar authData= { authData } page='dashboard-tutor' />
          Tutor Dashboard 
          <TutorProfile authData= { authData } />
        </div>
      : role === "admin" ? 
        <div className='dashboard-unique'> 
          <Navbar authData= { authData } page='dashboard-admin' />
          Admin Dashboard
          <AdminProfile authData= { authData } />
        </div>
      : null
    }
    </>
  );
}

export default Dashboard;
