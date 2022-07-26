import React, { useEffect, useState } from "react";
//import "../styles/App.css";
import { getEndpoint } from "../utils/api";

const Endpoint = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getEndpoint().then((res) => {
      console.log(res.json())
      setMsg(res.json())
    });
  }, []);

  return (
    <div className="EndPoint">
      <h1>Endpoint </h1>
      <p>{msg}</p>
      
    </div>
  );
};
export default Endpoint;
