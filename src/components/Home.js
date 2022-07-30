import React, { useEffect, useState } from "react";
//import "../styles/App.css";
import { getMessage, getMessageApi } from "../utils/api";

const Home = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getMessageApi().then((res) => {
      console.log(res)
      setMsg(res);
    });
  }, []);

  return (
    <div className="HomePage">
      <h1>Home </h1>
      <p>{msg}</p>
    </div>
  );
};
export default Home;
