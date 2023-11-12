import React from "react";
import { Link } from "react-router-dom";
import PostTutor from "./PostTutor";
// import Search from "../Search";

const TutorList = (props) => {
  if (props?.isLoading) return <p>Loading....</p>;
  console.log(">>>",props.data)
  console.log(props.isLoading)

  return (
    <div className={"MainListPage"}>
      <h2 className="MainList__h1">TutorList</h2>

      <PostTutor token={props?.token} />

      <ul className={"Main__List"}>
        {props?.data.map((tutor) => {
          return (
            <Link key={tutor.tutor_id} to={`/tutors/${tutor.tutor_id}`}>
              <li className={"MainList__card"}>
                <p>
                  <b>Tutor FirstName: </b> {tutor.tutor_firstname}
                </p>
                <p>
                  <b>Tutor LastName: </b>
                  {tutor.tutor_lastname}
                </p>
                <button> Click for more detail</button>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default TutorList;
