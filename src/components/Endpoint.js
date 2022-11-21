import React, { useEffect, useState } from "react";
//import "../css/App.css";
import { getEndpoint, getEndpointApi } from "../utils/api";

const Endpoint = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getEndpointApi().then((res) => {
      console.log(res.json());
      setMsg(res.json());
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
