import React from "react";
import { Link } from "react-router-dom";

import PostAdmin from "./PostAdmin";

const AdminList = (props) => {
  if (props?.isLoading) return <p>Loading....</p>;

  return (
    <div className={"MainListPage"}>
      <h2 className="MainList__h1">Admins</h2>
      <PostAdmin authData={props?.authData} />

      <ul className={"Main__List"}>
        {props?.data.map((admin) => (
          <Link key={admin.admin_id} to={`/admin/get-admins/${admin.admin_id}`}>
            <li key={admin.admin_id} className={"MainList__card"}>
              <p>
                <b>Admin ID :</b> {admin.admin_id}{" "}
              </p>
              <p>
                <b>Admin Firstname :</b> {admin.admin_firstname}
              </p>
              <p>
                <b>Student Lastname :</b> {admin.admin_lastname}
              </p>
              <p>
                <img src={admin.admin_image} alt={admin.admin_firstname}></img>
              </p>

              <button> Click for more detail</button>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default AdminList;
