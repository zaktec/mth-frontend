import React, { useEffect, useState } from "react";
//import "../css/App.css";
import { getMessageApi } from "../utils/api";
import Login from "./auth/Login";
import Register from "./auth/Register";

const Home = () => {
  const [msg, setMsg] = useState("");
  const toggleForm = (formName) =>{
    setCurrentForm(formName)


  }
  const [currentForm, setCurrentForm] = useState('login');
  useEffect(() => {
    getMessageApi().then((res) => {
      console.log(res);
      setMsg(res);
    });
  }, []);

  return (
    <div className="HomePage">
      <h1>Home </h1>
      <p>{msg}</p>   
       {currentForm === "login" ? <Login onFormSwitch={toggleForm} />: <Register onFormSwitch={toggleForm} />}
  
    </div>
  );
};
export default Home;
