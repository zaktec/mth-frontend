import React from "react";
import { useEffect, useState } from "react";
import { getQuestionApi } from '../../utils/api'
import { Link } from "react-router-dom";
import PostQuestion from "./PostQuestion";
import QuestionCSS from "../../css/question.module.css";

// import Search from "../Search";

function QuestionList(props) {
  const [questionList, setQuestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    getQuestionApi(props.sortBy).then((questionFromApi) => {
      console.log(questionFromApi);
      setQuestionList(questionFromApi);
      setIsLoading(false);
    });
  }, [props.sortBy]);

  if (isLoading) return <p>Loading....</p>;

  return (
    <main className={QuestionCSS.QuestionListPage}>
  {/* <Search setSearchTerm={setSearchTerm} /> */}
     

      <h1 className={QuestionCSS.QuestionList__h1}> QuestionsList </h1>
      
      <PostQuestion setQuestionList={ setQuestionList}/> 


      <ul className={QuestionCSS.Question__List}>
        {questionList.map((question) => {
          return (
            <Link key={question.ques_id} to={`/question/${question.ques_id}`}>
              <li className={QuestionCSS.QuestionList__card}>
                <p><b>Question Id: </b> {question.ques_id}</p>
                <p><b>Question Code: </b>{question.ques_body}</p>
                <button> Click for more detail</button>
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}

export default QuestionList;
