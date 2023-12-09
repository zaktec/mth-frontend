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
        {props?.data.map((element) => (
          <Link key={element.admin_id} to={`/admin/get-admins/${element.admin_id}`}>
            <li key={element.admin_id} className={"MainList__card"}>
              <p>
                <b>Admin ID :</b> {element.admin_id}{" "}
              </p>
              <p>
                <b>Admin Firstname :</b> {element.admin_firstname}
              </p>
              <p>
                <b>Student Lastname :</b> {element.admin_lastname}
              </p>
              <p>
                <img src={element.admin_image} alt={element.admin_firstname}></img>
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
