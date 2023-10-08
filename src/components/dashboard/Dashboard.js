import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../navbar/Navbar";
import { verifyAuth, verifyRole } from '../../helpers';
import AdminProfile from './admindashboard/AdminProfile';

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
        </div>
      : role === "tutor" ?
        <div className='dashboard-unique'> 
          <Navbar page='dashboard-tutor' />
          Tutor Dashboard 
        </div>
      : role === "admin" ? 
        <div className='dashboard-unique'> 
          <Navbar page='dashboard-admin' />
          Admin Dashboardssssssss
          <AdminProfile authData= { state?.authData } />
          
        </div>
      : null
    }
    </>
  );
}

export default Dashboard;
