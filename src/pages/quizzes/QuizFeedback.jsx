import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import { verifyAuth, dencrypt } from "../../helpers";
import TrInput from "../../components/tables/TrInput";
import { APIsRequests } from "../../api/APIsRequests";

const QuizFeedback = () => {
  const { role } = useParams();
  const [searchParams] = useSearchParams();
  const encrypted_student_id = searchParams.get("student_id");
  const encrypted_studentquiz_id = searchParams.get("studentquiz_id");

  const studentId = dencrypt(encrypted_student_id);
  const studentQuizId = dencrypt(encrypted_studentquiz_id);
  const [state, setState] = useState({
    name: "",
    data: {},
    authData: {},
    totalMarks: 0,
    termsPolicy: false,
    viewQuizQuestions: false,
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData }));

    const getQuizQuestions = async (token) => {
      await APIsRequests.getQuizQuestions(token, studentId, studentQuizId)
        .then((response) => {
          const totalMarks = response?.data?.data?.questions.reduce(
            (sum, question) => {
              return sum + question.question_mark;
            },
            0
          );

          setState((prevState) => ({
            ...prevState,
            totalMarks: totalMarks,
            data: response?.data?.data,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getQuizQuestions(authData?.token);
  }, [role, studentId, studentQuizId]);

  const handleViewQuestions = () => {
    window.location.replace(`/${role}/quiz-questions?student_id=${encrypted_student_id}&studentquiz_id=${encrypted_studentquiz_id}`);
  }

  const handleOnChange = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <section className="quiz-feedback-container">
      <Navbar authData={state?.authData} page={`${role}-dashboard`} />
      <div className="header-columns-container">
        <h2 className="header"> Test Learner Feedback </h2>
        <h2 className="header"> Test Tutor Feedback </h2>
      </div>

      <div className="content-columns-container">
        <div className="content">
          <div className="content-div">
            <p>Please submit the test and we tutor will give you feedback in due time</p>
            <div className="buttons">
                <button  type="button" className="question-list" onClick={() => handleViewQuestions()}>Question List</button>
                <button type="button" className="submit-test">Submit Test</button>
            </div>
          </div>
          
          <textarea
            type="text"
            placeholder="Please give us feedback on the test"
            value={state?.question?.question_student_optional || ''}
            />
        </div>

        <div className="content">
          <table>
            <tbody>
              <TrInput
                type="name"
                name="name"
                required={true}
                value={state?.name}
                label="Learner Name"
                labelClassName="td-label"
                onChange={handleOnChange}
              />
              <TrInput
                label="Quiz Name"
                labelClassName="td-label"
                labelValueClassName="td-value"
                labelValue={state?.data?.quiz?.quiz_name}
              />            
              <TrInput
                label="Quiz Questions"
                labelClassName="td-label"
                labelValueClassName="td-value"
                labelValue={state?.data?.questions && state?.data.questions.length}
              />
              <TrInput
                type="name"
                name="name"
                required={true}
                value={state?.name}
                label="Quiz Results"
                labelClassName="td-label"
                onChange={handleOnChange}
              />
              <TrInput
                label="Total Marks"
                labelClassName="td-label"
                labelValueClassName="td-value"
                labelValue={state?.totalMarks}
              />
              <TrInput
                type="text"
                name="name"
                required={true}
                value={state?.name}
                label="Tutor Feedback"
                labelClassName="td-label"
                onChange={handleOnChange}
              />
              <TrInput
                type="text"
                name="name"
                required={true}
                value={state?.name}
                label="Link To Learning Plan"
                labelClassName="td-label"
                onChange={handleOnChange}
              />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default QuizFeedback;
