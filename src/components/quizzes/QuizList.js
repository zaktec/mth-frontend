import React from "react";
import { useEffect, useState } from "react";
import { getQuizApi } from '../../utils/api'
import { Link } from "react-router-dom";

// import Search from "../Search";

function QuizList(props) {
  const [quizList, setQuizList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    getQuizApi(props.sortBy).then((quizzesFromApi) => {
      console.log(quizzesFromApi);
      setQuizList(quizzesFromApi);
      setIsLoading(false);
    });
  }, [props.sortBy]);

  if (isLoading) return <p>Loading....</p>;

  return (
    <main className="QuizListPage">
  {/* <Search setSearchTerm={setSearchTerm} /> */}
     

      <h1 className="CourseList__h1"> QuizList </h1>
      
      {/* <PostCourse
            course_id={course.course_id}
            setCourseName={setCourse}
          /> */}


      <ul className="Courses__List">
        {quizList.map((quiz) => {
          return (
            <Link key={quiz.quiz_id} to={`/quizzes/${quiz.quiz_id}`}>
              <li className="CourseList__card">
                <p><b>Quiz Name: </b> {quiz.quiz_name}</p>
                <p><b>Quiz Code: </b>{quiz.quiz_code}</p>
                <button> Click for more detail</button>
                {/* <p><b>Course Description: </b>{course.course_desc}</p>
                <p><b>Course ID: </b>{course.course_id}</p>
                <p><b>Course Level:</b>{course.course_level}</p> 
                <img className="ListImage" src={course.course_image}
                  alt={course.course_name}/> */}
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}

export default QuizList;
