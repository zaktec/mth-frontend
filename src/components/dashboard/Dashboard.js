import Navbar from "../navbar/Navbar";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { verifyAuth, verifyRole } from '../../helpers';
import AdminProfile from './admindashboard/AdminProfile';
import StudentProfile from "./studentdashboard/StudentProfile";
import TutorProfile from "./tutordashboard/TutorProfile";

const Dashboard = () => {
  const { role } = useParams();
  const [state, setState] = useState({ authData: {  } });

  useEffect(() => {
    verifyRole(role);
    const authData = verifyAuth();
    setState((prevState) => ({...prevState, authData}));
  }, [role]);

  return (
    <>
    {
      role === "student" ? 
        <div className='dashboard-unique'> 
          <Navbar page='dashboard-student' />
          Student Dashboard 
           <StudentProfile authData= { state?.authData } /> 
        </div>
      : role === "tutor" ?
        <div className='dashboard-unique'> 
          <Navbar page='dashboard-tutor' />
          Tutor Dashboard 
          <TutorProfile authData= { state?.authData } />
        </div>
      : role === "admin" ? 
        <div className='dashboard-unique'> 
        
          <Navbar page='dashboard-admin' />
            Admin Dashboard
          <AdminProfile authData= { state?.authData } />
        </div>
      : null
    }
    </>
  );
}

export default Dashboard;
