import React, { useEffect } from 'react';

import Navbar from "../navbar/Navbar";
import { verifyAuth } from '../../helpers';

const Dashboard = () => {
  useEffect(() => {
   const token = verifyAuth();
   console.log('------------->', token);
  }, []);

  return (
    <div className='dashboard-unique'> 
      <Navbar page='dashboard' />
    </div>
  );
}

export default Dashboard;
