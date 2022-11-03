import React, { useEffect, useState } from "react";
import { getUserMessageApi } from "../../utils/api";
//import "../styles/App.css";


const Userhomepage = () => {
  const [msg, setMsg] = useState("");


  useEffect(() => {
    getUserMessageApi().then((res) => {
      console.log(res)
      setMsg(res);
    });
  }, []);

  return (
    <div className="HomePage">
      <h1>User Home Page  </h1>
      <p>{msg}</p>
    </div>
  );
};
export default Userhomepage;
