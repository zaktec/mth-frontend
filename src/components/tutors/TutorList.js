import React from "react";
import { useEffect, useState } from "react";
import { getTutorApi } from '../../utils/api'
import { Link } from "react-router-dom";
import PostTutor from "./PostTutor";

// import Search from "../Search";

function TutorList(props) {
  const [tutorsList, setTutorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [searchTerm, setSearchTerm] = useState("");
 
  // const { SortBy } =props

  useEffect(() => {
    getTutorApi(props.sortBy).then((tutorsFromApi) => {
      console.log(tutorsFromApi);
      setTutorList(tutorsFromApi);
      setIsLoading(false);
    });
  }, [props.sortBy]);

  if (isLoading) return <p>Loading....</p>;

  return (
    <main className="TutorListPage">
  {/* <Search setSearchTerm={setSearchTerm} /> */}
     
  <PostTutor setTutorList={setTutorList}/> 
      <h1 className="TutorList__h1"> TutorList </h1>
      
      


      <ul className="Courses__List">
        {tutorsList.map((tutor) => {
          return (
            <Link key={tutor.tutor_id} to={`/tutors/${tutor.tutor_id}`}>
              <li className="TutorList__card">
                <p><b>Tutor FirstName: </b> {tutor.tutor_firstname}</p>
                <p><b>Tutor LastName: </b>{tutor.tutor_lastname}</p>
                <button> Click for more detail</button>

              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}

export default TutorList;
