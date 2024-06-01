import { useEffect } from 'react';
import { APIsRequests } from '../../api/APIsRequests';


const Home = () => {  
  useEffect(() => {
    const getHomeApi = async () =>{
      await APIsRequests.getHomeServerMsgApi()
      .then(() => {
        return window.location.replace('/student/signin')
      })
      .catch((error) => {
        return console.log(error);
      }); 
    }
    
    getHomeApi()
  },[]);
}

export default Home;
