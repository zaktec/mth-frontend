import React from "react";
import { useEffect, useState } from "react";
import { getQuizApi } from '../../utils/api'
import { Link } from "react-router-dom";
import PostQuiz from "./PostQuiz";

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
      
       <PostQuiz
            setQuizList={setQuizList}/> 


      <ul className="Courses__List">
        {quizList.map((quiz) => {
          return (
            <Link key={quiz.quiz_id} to={`/quizzes/${quiz.quiz_id}`}>
              <li className="CourseList__card">
                <p><b>Quiz Name: </b> {quiz.quiz_name}</p>
                <p><b>Quiz Code: </b>{quiz.quiz_code}</p>
                <button> Click for more detail</button>
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}

export default QuizList;
