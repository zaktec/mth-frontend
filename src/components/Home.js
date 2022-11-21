import React, { useEffect, useState } from "react";
//import "../css/App.css";
import { getMessageApi } from "../utils/api";
import Login from "./auth/Login";

const Home = () => {
  const [msg, setMsg] = useState("");

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
      <Login />
    </div>
  );
};
export default Home;
