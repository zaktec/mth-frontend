import React, { useEffect } from "react";
import Navbar from "../../navbar/Navbar";
import { useParams } from "react-router-dom";
import { verifyAuth, verifyRole } from "../../../helpers";

const TutorProfile = () => {
  const { role } = useParams();

  useEffect(() => {
    verifyRole(role);
    verifyAuth();
  }, [role]);

  return (
    <main>
      <Navbar page="dashboard-tutor" />
      Edit Profile{" "}
    </main>
  );
};

export default TutorProfile;
