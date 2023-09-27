import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../navbar/Navbar";
import { verifyAuth, verifyRole } from '../../helpers';

const Dashboard = () => {
  const { role } = useParams();

  useEffect(() => {
    verifyRole(role);
   const token = verifyAuth();
   console.log('------------->', token);
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
          Admin Dashboard 
        </div>
      : null
    }
    </>
  );
}

export default Dashboard;
