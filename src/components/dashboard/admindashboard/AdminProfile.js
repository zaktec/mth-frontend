import React from "react";

const AdminProfile = (props) => {
  return (
    <div className="SingleMainPage">
    <h1>Admin Dashboard</h1>
    <ul className="MainListPage">
      <li className="List__card">
        <p>
          <b>admin UserName: </b> {props?.authData?.user?.admin_username}
        </p>
        <p>
          <b>admin Name: </b> {props?.authData?.user?.admin_firstname}
        </p>
        <p>
          <b>admin Last Name: </b>
          {props?.authData?.user?.admin_lastname}
        </p>
        <p>
          <b>admin Password</b>
          {props?.authData?.user?.admin_password}
        </p>
        <b>admin Image :</b> {props?.authData?.user?.admin_image}
      </li>
    </ul>
  </div>
);
};

export default AdminProfile;
