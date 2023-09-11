import React, { useEffect, useState } from "react";
//import "../css/App.css";
import { getAdminHomepageApi } from "../../api/axios";


const AdminHome = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getAdminHomepageApi().then((res) => {
      console.log(res.json());
      setMsg(res.json());
    });
  }, []);

  return (
    <div className="EndPoint">
      <h1>Admin Homepage  </h1>
      <p>{msg}</p>
    </div>
  );
};
export default AdminHome;

