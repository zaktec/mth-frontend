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
        {props?.data.map((element) => (
            <Link key={element.tutor_id} to={`/admin/get-tutors/${element.tutor_id}`}>
              <li className={"MainList__card"}>
                <p>
                  <b>Tutor FirstName: </b> {element.tutor_firstname}
                </p>
                <p>
                  <b>Tutor LastName: </b> {element.tutor_lastname}
                </p>
                <p>
                  <img src={element.tutor_image} alt={element.tutor_firstname} ></img>
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
