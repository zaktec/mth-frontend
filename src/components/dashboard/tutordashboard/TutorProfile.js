import React from "react";

const TutorProfile = (props) => {
  console.log(props);
  return (
    <div className="SingleMainPage">
      <h1>Tutor Dashboard</h1>
      <ul className="MainListPage">
        <li className="List__card">
          <p>
            <b>Tutor UserName: </b> {props?.authData?.user?.tutor_username}
          </p>
          <p>
            <b>Tutor Name: </b> {props?.authData?.user?.tutor_firstname}
          </p>
          <p>
            <b>Tutor Last Name: </b>
            {props?.authData?.user?.tutor_lastname}
          </p>
          <p>
            <b>Tutor Password</b>
            {props?.authData?.user?.tutor_password}
          </p>
          <b>Tutor Image :</b> {props?.authData?.user?.tutor_image}
        </li>
      </ul>
    </div>
  );
};

export default TutorProfile;
