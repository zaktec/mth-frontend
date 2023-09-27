import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { getMessageApi } from "../../api/axios";

const Home = () => {

  const [msg, setMsg] = useState("");
  useEffect(() => {
    getMessageApi().then((res) => {
      console.log(res);
      setMsg(res);
    });
  }, []); 
  return (
    <div className='home-unique'> 
      <Navbar page='home' />
       <p>{msg}</p>  
    </div>
  );
}

export default Home;
