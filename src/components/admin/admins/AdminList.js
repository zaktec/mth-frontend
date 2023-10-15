import React from "react";
import { Link } from "react-router-dom";
import PostAdmin from "./PostAdmin";

const AdminList = (props) => {
  if (props?.isLoading) return <p>Loading....</p>;
  console.log(props);

  return (
    <div className={"MainListPage"}>
      <h2 className="MainList__h1">Admins</h2>

      <PostAdmin token={props?.token} />

      <ul className={"Main__List"}>
        {props?.data.map((admin) => {
          return (
            <Link key={admin.admin_id} to={`/admins/${admin.admin_id}`}>
              <li key={admin.admin_id} className={"MainList__card"}>
                <p>
                  <b>Admin ID :</b> {admin.admin_id} </p>
                <p>
                  <b>Admin Firstname :</b> {admin.admin_firstname}
                </p>
                <p>
                  <b>Student Lastname :</b> {admin.admin_lastname}
                </p>

                {/* <img
                className="Student__avatar-img"
                src={student.student_image}
                alt={student.student_firstname}
              ></img> */}
                <button> Click for more detail</button>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminList;
