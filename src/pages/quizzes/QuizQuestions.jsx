import React, { useEffect, useState } from "react";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    data: {},
    authData: {},
    pageLoading: true,
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData }));

    const getQuizQuestions = async (token) => {
      await APIsRequests.getQuizQuestions(token, studentId, studentQuizId)
        .then((response) => {
          setState((prevState) => ({
            ...prevState,
            data: response?.data?.data,
            pageLoading: false,
          }));
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
        <h2 className="header"> QUESTION LIST </h2>
      </div>

      <div className="content-columns-container">
        <div className="content">
          {state?.data?.questions &&
            state?.data?.questions.map((element) => (
              <div key={element?.question_id} className="question">
                <div>Q{element?.question_number}.</div>
                <div className="view">
                  <div onClick={() => handleQuizQuestion(element?.question_number)} > <FontAwesomeIcon size="lg" icon={faEye} /> Review </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default QuizQuestions;
