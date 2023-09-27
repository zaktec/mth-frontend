import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyAuth, verifyRole } from "../../../helpers";
import Navbar from "../../navbar/Navbar";
import { authAPIsRequests } from "../../../api/APIsRequests";
import { getTutorApi } from "../../../api/axios";

const TutorProfile = () => {
  const { role } = useParams();
  

  useEffect(() => {
    verifyRole(role);
    const token = verifyAuth();
    console.log("------------->", token);
  }, [role]);

  
 
  return (
    <main>
      <Navbar page="dashboard-tutor" />
      Edit Profile{" "}
    </main>
  );
};

export default TutorProfile;
