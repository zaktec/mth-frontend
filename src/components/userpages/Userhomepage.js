import React, { useEffect, useState } from "react";
import { getUserMessageApi } from "../../utils/api";
//import "../css/App.css";
import TutorCSS from "../../css/tutor.module.css";

const Userhomepage = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getUserMessageApi().then((res) => {
      console.log(res);
      setMsg(res);
    });
  }, []);

  return (
    <div className="HomePage">
      <h1>User Home Page </h1>
      <p>{msg}</p>
    </div>
  );
};
export default Userhomepage;
