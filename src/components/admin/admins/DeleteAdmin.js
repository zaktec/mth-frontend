import React from "react";
import { APIsRequests } from "../../../api/APIsRequests";

const DeleteAdmin = (props) => {
  const handleDeleteAdmin = async (event, token, admin_id) => {
    event.preventDefault();
    await APIsRequests
      .deleteAdminApi(token, admin_id)
      .then((response) => {
        window.location.replace(`/adminlist`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        onClick={(event) =>
          handleDeleteAdmin(event, props?.token, props?.admin_id)
        }>Delete Admin</button>
    </div>
  );
};
export default DeleteAdmin;
