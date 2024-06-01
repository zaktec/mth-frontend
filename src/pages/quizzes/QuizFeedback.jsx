import { ToastContainer, toast } from "react-toastify";
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
    name: '',
    studentquiz_student_feedback: '',

    data: {},
    authData: {},
    totalMarks: 0,
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
            name: response?.data.data?.studentQuiz?.studentquiz_leaner || localStorage.getItem('learner'),
            studentquiz_student_feedback: response?.data.data?.studentQuiz?.studentquiz_student_feedback || ''
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
      studentquiz_student_feedback: event.target.value,
    }));
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, buttonLoading: true }));

    const data = {
      studentquiz_student_feedback_toggle: "show",
      studentquiz_student_feedback: state?.studentquiz_student_feedback
    };
    
    await APIsRequests.postStudentFeedback(state?.authData?.token, studentId, data)
      .then(() => {
        toast.success("Feedback submitted successfully");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
      });
  };

  return (
    <section className="quiz-feedback-container">
      <ToastContainer />
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
                <button type="button" className="submit-test" onClick={(event) => handleSubmitClick(event)}>Submit Feedback</button>
            </div>
          </div>
          
          <textarea
            type="text"
            value={state?.studentquiz_student_feedback}
            onChange={(event) => handleOnChange(event)}
            placeholder="Please give us feedback on the test"
          />
        </div>

        <div className="content">
          <table>
            <tbody>
              <TrInput
                label="Learner Name"
                labelClassName="td-label"
                labelValueClassName="td-value"
                labelValue={state?.name}
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
                value='Pending'
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
                value=''
                label="Tutor Feedback"
                labelClassName="td-label"
                onChange={handleOnChange}
              />
              <TrInput
                type="text"
                name="name"
                required={true}
                value=''
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
