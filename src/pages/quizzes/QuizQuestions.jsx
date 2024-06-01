import React, { useEffect, useState } from "react";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../../components/navbar/Navbar";
import { APIsRequests } from "../../api/APIsRequests";
import Loading from "../../components/loading/Loading";
import { verifyAuth, dencrypt, encrypt } from "../../helpers";

const QuizQuestions = () => {
  const { role } = useParams();
  const [searchParams] = useSearchParams();
  const encrypted_student_id = searchParams.get("student_id");
  const encrypted_studentquiz_id = searchParams.get("studentquiz_id");

  const studentId = dencrypt(encrypted_student_id);
  const studentQuizId = dencrypt(encrypted_studentquiz_id);

  const [state, setState] = useState({
    quiz: {},
    authData: {},
    questions: [],
    pageLoading: true,
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData }));

    const getQuizQuestions = async (token) => {
      await APIsRequests.getQuizQuestions(token, studentId, studentQuizId)
        .then((response) => {
          const lsQuestions = response?.data?.data?.studentQuiz?.studentquiz_status !== 'completed' && localStorage.getItem('questions');
          const storedQuestions = JSON.parse(lsQuestions) || [];
          const questions = storedQuestions.length === 0 ? response?.data?.data?.questions : storedQuestions;
          response.data.data.questions = questions;

          setState((prevState) => ({
            ...prevState,
            pageLoading: false,
            quiz: response?.data?.data?.studentQuiz,
            questions: response.data.data.questions.map((item) => ({
              ...item,
              question_student_answer: item.hasOwnProperty('question_student_answer') ? item.question_student_answer : '',
              question_student_optional: item.hasOwnProperty('question_student_optional') ? item.question_student_optional : ''
            }))
          }))
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getQuizQuestions(authData?.token);
  }, [role, studentId, studentQuizId]);

  const handleQuizQuestion = async (question_number) => {
    const encrypted_question_number = encrypt(question_number);
    return window.location.replace(
      `/${role}/quiz-question?student_id=${encrypted_student_id}&studentquiz_id=${encrypted_studentquiz_id}&question_number=${encrypted_question_number}`
    );
  };

  if (state?.pageLoading === true) return <Loading pageLoading={true} />

  return (
    <section className="quiz-questions-container">
      <Navbar authData={state?.authData} page={`${role}-dashboard`} />
      <div className="header-container">
        <div className="header">
          <span>QUESTION LIST</span>
          { state?.quiz?.studentquiz_status === 'completed' && <button type="button" className="next" onClick={() => window.location.replace(`/${role}/quiz-feedback?student_id=${encrypted_student_id}&studentquiz_id=${encrypted_studentquiz_id}`)}> <FontAwesomeIcon size="lg" icon={faSquarePollVertical} /> View Result </button>}
        </div>
      </div>

      <div className="content-columns-container">
        <div className="content">
          {state?.questions &&
            state?.questions.map((element) => (
              <div key={element?.question_id} className="question">
                <div className={element?.question_student_answer?.length > 0 ? "ative-text" : ""}>Q{element?.question_number}.</div>
                <div className="view">
                  <button onClick={() => handleQuizQuestion(element?.question_number)} className={element?.question_student_answer?.length > 0 ? "ative-view" : ""}> <FontAwesomeIcon size="lg" icon={faEye} /> Review </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default QuizQuestions;
