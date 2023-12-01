import React from "react";
import { Link } from "react-router-dom";
import PostTutor from "./PostTutor";

const TutorList = (props) => {
  if (props?.isLoading) return <p>Loading....</p>;

  return (
    <div className={"MainListPage"}>
      <h2 className="MainList__h1">TutorList</h2>
      <PostTutor token={props?.authData} />

      <ul className={"Main__List"}>
        {props?.data.map((tutor) => (
            <Link key={tutor.tutor_id} to={`/admin/get-tutors/${tutor.tutor_id}`}>
              <li className={"MainList__card"}>
                <p>
                  <b>Tutor FirstName: </b> {tutor.tutor_firstname}
                </p>
                <p>
                  <b>Tutor LastName: </b> {tutor.tutor_lastname}
                </p>
                <p>
                  <img src={tutor.tutor_image} alt={tutor.tutor_firstname} ></img>
                </p>
                
                <button> Click for more detail</button>
              </li>
            </Link>
        ))}
      </ul>
    </div>
  );
};

export default TutorList;
