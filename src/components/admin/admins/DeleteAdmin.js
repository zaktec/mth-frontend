import React from "react";
import { APIsRequests } from "../../../api/APIsRequests";

const DeleteAdmin = (props) => {
  const handleDeleteAdmin = async (event) => {
    event.preventDefault();
    await APIsRequests.deleteAdminApi(props?.authData?.token, props?.admin_id)
      .then(() => {
        window.location.replace(`/adminlist`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={(event) => handleDeleteAdmin(event) }>DELETE ADMIN</button>
    </div>
  );
};

export default DeleteAdmin;
