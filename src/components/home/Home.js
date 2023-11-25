import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { APIsRequests } from "../../api/APIsRequests";


const Home = () => {

  const [msg, setMsg] = useState("");
  useEffect(() => {
    const getHomeApi = async () =>{
    await APIsRequests.getHomeServerMsgApi().then((res) => {
       console.log(res);
       return setMsg(res.data.message);
    })
    .catch((error) => {
      console.log(error);
  }); 
}
 getHomeApi() },[]); 
  return (
    <div className='home-unique'> 
      <Navbar page='home' />
      <p>Welcome to this home page </p>  
       <p>{msg} </p>  
       
    </div>
  );
}

export default Home;
