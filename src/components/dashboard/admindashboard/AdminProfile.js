import React, { useEffect, } from "react";

const AdminProfile = (props) => {
  useEffect(() => {
    const { id, token } = props?.authData
    console.log("-------------++++++>", id, token,);
  }, [props?.authData]);

  
 
  return (
    <div>
      
      Edit Profile{" "}
    </div>
  );
};

export default AdminProfile;
