import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import { APIsRequests } from "../../api/APIsRequests";
import Loading from "../../components/loading/Loading";
import { verifyAuth, dencrypt, encrypt } from "../../helpers";
import QuestionDisplay from "../../components/quizQuestion/QuestionDisplay";

const QuizQuestion = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const encrypted_student_id = searchParams.get("student_id");
  const encrypted_studentquiz_id = searchParams.get("studentquiz_id");
  const encrypted_question_number = searchParams.get("question_number");

  const studentId = dencrypt(encrypted_student_id);
  const studentQuizId = dencrypt(encrypted_studentquiz_id);
  const questionNumber = Number(dencrypt(encrypted_question_number));

  const [state, setState] = useState({
    quiz: {},
    authData: {},
    question: {},
    questions: [],
    studentQuiz: {},
    pageLoading: true,
    buttonLoading: false,
  });

  const saveStateToLocalStorage = useCallback(() => {
    localStorage.setItem('questions', JSON.stringify(state?.questions));
  }, [state]);

  useEffect(() => {
    const handleBeforeUnload = () => saveStateToLocalStorage();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => { window.removeEventListener('beforeunload', handleBeforeUnload) };
  }, [saveStateToLocalStorage]);

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData }));
    const getQuizQuestions = async (token) => {
      await APIsRequests.getQuizQuestions(token, studentId, studentQuizId)
        .then( async (response) => {
          const lsQuestions = localStorage.getItem('questions');

          const lsQuestion = JSON.parse(lsQuestions).find(obj => obj.question_number === questionNumber);
          const question =  response?.data?.data?.questions.find(obj => obj.question_number === questionNumber);
          const questions = JSON.parse(lsQuestions).length === 0 ? response?.data?.data?.questions : JSON.parse(lsQuestions);
          question.question_student_answer = lsQuestion && lsQuestion?.question_student_answer ? lsQuestion?.question_student_answer : '';
          question.question_student_optional = lsQuestion && lsQuestion?.question_student_optional ? lsQuestion?.question_student_optional : '';

          setState((prevState) => ({
            ...prevState,
            pageLoading: false,
            question: question,
            quiz: response?.data?.data?.quiz,
            studentQuiz: response?.data?.data?.studentQuiz,
            questions: questions.map((item) => ({
              ...item,
              question_student_answer: item.hasOwnProperty('question_student_answer') ? item.question_student_answer : '',
              question_student_optional: item.hasOwnProperty('question_student_optional') ? item.question_student_optional : ''
            })),
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getQuizQuestions(authData?.token);
  }, [role, studentId, studentQuizId, questionNumber]);

  const handleViewQuestions = () => {
    window.location.replace(`/${role}/quiz-questions?student_id=${encrypted_student_id}&studentquiz_id=${encrypted_studentquiz_id}`);
  }
   
  const handleInputChange = (event) => {
    event.preventDefault();
    setState(prevState => ({
        ...prevState,
        question: {
          ...prevState.question,
          question_student_answer: event.target.value
        },
        questions: prevState.questions.map(item => item?.question_number === questionNumber ? {
          ...item,
          question_student_answer: event.target.value
        } : item),
    }));
  };
   
  const handleTextAreaChange = (event) => {
    event.preventDefault();
    setState(prevState => ({
        ...prevState,
        question: {
          ...prevState.question,
          question_student_optional: event.target.value
        },
        questions: prevState.questions.map(item => item?.question_number === questionNumber ? {
          ...item,
          question_student_optional: event.target.value
        } : item),
    }));
  };

  const handlePrevClick = async (event) => {
    event.preventDefault();
    saveStateToLocalStorage();

    const prevQuestionNumber = questionNumber - 1;
    const encrypted_prev_question_number = encrypt(prevQuestionNumber);
    return navigate(`/${role}/quiz-question?student_id=${encrypted_student_id}&studentquiz_id=${encrypted_studentquiz_id}&question_number=${encrypted_prev_question_number}`);
  };

  const handleNextSkipClick = async (event) => {
    event.preventDefault();
    saveStateToLocalStorage();

    const nextQuestionNumber = questionNumber + 1;
    const encrypted_next_question_number = encrypt(nextQuestionNumber);
    return navigate(`/${role}/quiz-question?student_id=${encrypted_student_id}&studentquiz_id=${encrypted_studentquiz_id}&question_number=${encrypted_next_question_number}`);
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, buttonLoading: true }));
    setTimeout(() => {
      window.location.replace(`/${role}/quiz-feedback?student_id=${encrypted_student_id}&studentquiz_id=${encrypted_studentquiz_id}`);
    }, 2500);

    // await APIsRequests.postStudentQuizResult(state?.authData?.token, studentQuizId, state?.questions)
    //   .then((response) => {
    //     setTimeout(() => {
    //       setState((prevState) => ({
    //         ...prevState,
    //         buttonLoading: false,
    //         studentQuiz: response?.data?.data,
    //       }));
          
    //       setTimeout(() => {
    //         window.location.replace(`/${role}/quiz-questions?student_id=${encrypted_student_id}&studentquiz_id=${encrypted_studentquiz_id}`);
    //       }, 1000);
    //     }, 2500);
    //   })
    //   .catch((error) => {
    //     console.log('Error', error?.response?.data?.message || error?.response?.data?.error);
    //   });
  };

  if (state?.pageLoading === true) return <Loading pageLoading={true} />

  return (
    <section className="quiz-question-container">
      <Navbar authData={state?.authData} page={`${role}-dashboard`} />
      <div className="header-container">
        <h2 className="left-header">
          <div className="title">QUESTION {`${state?.question?.question_number}/${state?.questions.length}`}</div>
          <div className="instruction">{state?.question?.question_calc ? 'Calculator Allowed' : 'Calculator Not Allowed'}</div>
        </h2>

        <h2 className="right-header">
          <div className="title"> {state?.question?.question_mark > 1 ? `${state?.question?.question_mark} Marks` : `${state?.question?.question_mark} Mark` } </div>
          <div className="instruction">
            <button type="button"  disabled={state?.questions[state?.questions.length - 1]?.question_number === questionNumber || state?.question?.question_student_answer.length > 0} onClick={(event) => handleNextSkipClick(event)} >Skip Question</button>
          </div>
        </h2>
      </div>

      <div className="content-columns-container">
        <div className="left-column">
            <QuestionDisplay question={state?.question} />
        </div>

        <div className="right-column">
            <div className="input-container">
                <div className="first-symbol">{state?.question?.question_ans_sym_b}</div>
                <input
                    type="text"
                    placeholder="Insert Answer"
                    onChange={(event) => handleInputChange(event)}
                    value={state?.question?.question_student_answer || ''}
                />
                <div className="second-symbol">{state?.question?.question_ans_sym_a}</div>
            </div>

            <div className="bottom-container">
                <textarea                    
                    type="text"
                    placeholder="Optional Working Out"
                    onChange={(event) => handleTextAreaChange(event)}
                    value={state?.question?.question_student_optional || ''}
                />

                <div className="display">
                    <button type="button" className="keyboard">Keyboard</button>
                    <button type="button" className="question-list" onClick={() => handleViewQuestions()}>Questions List</button>
                </div>
                
                <div className="buttons">
                    <button  type="button" className="prev" disabled={questionNumber <= 1} onClick={(event) => handlePrevClick(event)}>Prev</button>
                    {
                      state?.questions[state?.questions.length - 1]?.question_number === questionNumber
                      ? <button type="button" className="next" disabled={state?.studentQuiz?.studentquiz_status === 'completed'} onClick={(event) => handleSubmitClick(event)}> { state?.buttonLoading ? <Loading buttonLoading={true} /> : 'Proceed Submit' } </button>
                      : <button type="button" className="next" disabled={!state.question.question_student_answer} onClick={(event) => handleNextSkipClick(event)}>Next</button>
                    }
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default QuizQuestion;
