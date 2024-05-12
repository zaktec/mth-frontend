import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import { verifyAuth, dencrypt } from "../../helpers";
import TrInput from "../../components/tables/TrInput";
import CheckBox from "../../components/form/CheckBox";
import { APIsRequests } from "../../api/APIsRequests";

const QuizInstruction = () => {
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

    const viewQuizApi = async (token) => {
      await APIsRequests.viewQuizQuestions(token, studentId, studentQuizId)
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

    viewQuizApi(authData?.token);
  }, [role, studentId, studentQuizId]);

  const handleOnChange = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTermsPolicy = () => {
    if (state?.termsPolicy === false) {
      setState((prevState) => ({
        ...prevState,
        termsPolicy: true,
        viewQuizQuestions: true,
      }));

      setTimeout(() => {
        window.location.replace(
          `/${role}/quiz-questions?student_id=${encrypted_student_id}&studentquiz_id=${encrypted_studentquiz_id}`
        );
      }, 1000);
    }

    if (state?.termsPolicy === true) {
      setState((prevState) => ({
        ...prevState,
        termsPolicy: false,
        viewQuizQuestions: false,
      }));
    }
  };

  return (
    <section className="quiz-instruction-container">
      <Navbar authData={state?.authData} page={`${role}-dashboard`} />
      <div className="header-columns-container">
        <h2 className="header"> Test Information </h2>
        <h2 className="header"> Instructions to Learner </h2>
      </div>

      <div className="content-columns-container">
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
                label="Quiz Code"
                labelClassName="td-label"
                labelValueClassName="td-value"
                labelValue={state?.data?.quiz?.quiz_code}
              />
              <TrInput
                label="Quiz Type"
                labelClassName="td-label"
                labelValueClassName="td-value"
                labelValue={state?.data?.quiz?.quiz_type}
              />
              <TrInput
                label="Quiz Questions"
                labelClassName="td-label"
                labelValueClassName="td-value"
                labelValue={state?.data?.questions && state?.data.questions.length}
              />
              <TrInput
                label="Calculator"
                labelClassName="td-label"
                labelValueClassName="td-value"
                labelValue={
                  state?.data?.quiz?.quiz_calc ? "Allowed" : "Not Allowed"
                }
              />
              <TrInput
                label="Total Marks"
                labelClassName="td-label"
                labelValueClassName="td-value"
                labelValue={state?.totalMarks}
              />
            </tbody>
          </table>
        </div>

        <div className="content">
          <div>
            <p>
              - Have any materials you'll need during the exam ready, such as
              paper, pens, calculators (if allowed).
            </p>
            <p>
              - If you encounter any technical issues during the exam, contact
              technical support immediately for assistance. Provide details of
              the issue you're experiencing so they can help resolve it quickly.
            </p>
            <p>
              - Find a quiet, well-lit space where you can focus without
              distractions. Make sure you have a comfortable chair and
              desk/table to sit at during the exam.
            </p>
            <p>
              - Use next to submit questions and if questions you do not know
              click the skip questions.
            </p>
          </div>
        </div>
      </div>

      <div className="terms-policy">
        <CheckBox
          checked={state?.termsPolicy}
          onChange={handleTermsPolicy}
          disabled={state?.name === "" ? true : false}
          fieldname="Agreed terms and policy to continue"
        />
      </div>
    </section>
  );
};

export default QuizInstruction;
