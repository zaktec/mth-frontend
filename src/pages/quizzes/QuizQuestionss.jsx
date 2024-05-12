import MathInput from "react-math-keyboard";
import ImageUploader from "react-images-upload";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCheck,
  faClose,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import Navbar from "../../components/navbar/Navbar";
import Avatar from "../../assets/images/avatar.png";
import { APIsRequests } from "../../api/APIsRequests";
import JoinPattern from "../../components/patterns/JoinPattern"
import CalculatorOk from "../../assets/images/calculator-ok.png";
import CalculatorCancel from "../../assets/images/calculator-cancel.png";
import { verifyAuth, validateQuizAnswers, dencrypt } from "../../helpers";

const QuizQuestionss = () => {
  const { role } = useParams();
  const [searchParams] = useSearchParams();
  const encrypted_student_id = searchParams.get("student_id");
  const encrypted_studentquiz_id = searchParams.get("studentquiz_id");

  const student_id = dencrypt(encrypted_student_id);
  const studentquiz_id = dencrypt(encrypted_studentquiz_id);
  const [state, setState] = useState({
    data: [],
    authData: {},
    objectIndex: null,

    inputs: {},
    inputName: "default",
    layoutName: "default",

    answer: "",
    correction: "",
    answerText: "",
    tutorFeedback: "",
    studentFeedback: "",
    showTutorFeedback: "",
    hideTutorFeedback: "",
    showStudentFeedback: "",
    hideStudentFeedback: "",
    studentFeedbackError: "",
    tutorFeedbackIsLoading: false,
    studentFeedbackIsLoading: false,

    lastname: "",
    firstname: "",
    profilePicture: "",

    startQuiz: false,
    termsPolicy: false,

    postPage: 1,
    totalPages: 1,
    currentPage: 1,
    isLoading: true,
    submitted: false,
    resetIsLoading: false,
    prevButtonDisabled: true,
    nextButtonDisabled: true,
    submitButtonDisabled: true,

    question_class_answer1: "",
    question_class_answer2: "",
    question_class_answer3: "",
    question_class_answer4: "",
    question_class_answer5: "",

    quizOrganized: "",
    organizedVeryPoor: false,
    organizedPoor: false,
    organizedFair: false,
    organizedGood: false,
    organizedVeryGood: false,

    questionClearness: "",
    clearnessVeryPoor: false,
    clearnessPoor: false,
    clearnessFair: false,
    clearnessGood: false,
    clearnessVeryGood: false,

    quizSatisfied: "",
    satisfiedVeryPoor: false,
    satisfiedPoor: false,
    satisfiedFair: false,
    satisfiedGood: false,
    satisfiedVeryGood: false,
  });

  useEffect(() => {
    const authData = verifyAuth();
    const shareableData = localStorage.getItem('shareableData');
    
    const data = JSON.parse(shareableData);
    setState((prevState) => ({
      ...prevState,
      authData,
      lastname: data?.authUser?.user?.student_lastname || '',
      firstname: data?.authUser?.user?.student_firstname || '',
    }));

    const getQuizApi = async (token) => {
      await APIsRequests.getQuizQuestions(
        token,
        student_id || null,
        studentquiz_id
      )
        .then((response) => {
          if (response?.data?.data?.quizTutorToggle === "hide") {
            setState((prevState) => ({
              ...prevState,
              showTutorFeedback: "",
              hideTutorFeedback: "hide",
            }));
          }

          if (response?.data?.data?.quizTutorToggle === "show") {
            setState((prevState) => ({
              ...prevState,
              hideTutorFeedback: "",
              showTutorFeedback: "show",
            }));
          }

          if (response?.data?.data?.quizCorrection) {
            setState((prevState) => ({
              ...prevState,
              startQuiz: true,
            }));
          }

          setState((prevState) => ({
            ...prevState,
            objectIndex: 0,
            submitted: true,
            isLoading: false,
            nextButtonDisabled: false,
            question_class_answer1: "",
            question_class_answer2: "",
            question_class_answer3: "",
            question_class_answer4: "",
            question_class_answer5: "",
            data: response?.data?.data?.quizResults,
            quizDetails: response?.data?.data?.quizDetails,
            correction: response?.data?.data?.quizCorrection || "",
            tutorFeedback: response?.data?.data?.quizTutorFeedback || "",
            [response?.data?.data?.quizResults[0].question_choice_class]:
              "choice-answer",
            totalPages: Math.ceil(
              response?.data?.data.quizResults.length / state?.postPage
            ),
          }));

          if (state?.correction === "") {
            return setState((prevState) => ({
              ...prevState,
              submitted: false,
              objectIndex: null,
              nextButtonDisabled: true,
              data: prevState.data.map((item) => ({
                ...item,
                question_help: false,
                question_choice_class: "",
                question_choice_answer: "",
                question_choice_answer_correct: false,
              })),
            }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getQuizApi(authData?.token);
  }, [state?.postPage, state?.correction, student_id, studentquiz_id]);

  useEffect(() => {
    const item = state?.data.find(
      (_item, index) => index === state?.objectIndex
    );

    if (!item)
      return setState((prevState) => ({
        ...prevState,
        nextButtonDisabled: true,
      }));

    if (item && item?.question_choice_answer === "")
      return setState((prevState) => ({
        ...prevState,
        nextButtonDisabled: true,
      }));

    if (item && item?.question_choice_answer !== "")
      return setState((prevState) => ({
        ...prevState,
        nextButtonDisabled: false,
      }));
  }, [state?.data, state?.objectIndex]);

  const getPaginatedData = () => {
    const startIndex = (state?.currentPage - 1) * state?.postPage;
    const endIndex = startIndex + state?.postPage;
    return state?.data.slice(startIndex, endIndex);
  };

  const handleChoice = (event, objectIndex, choiceClass, choiceAnswer) => {
    event.preventDefault();

    if (state?.submitted === false)
      return setState((prevState) => ({
        ...prevState,
        objectIndex: objectIndex,
        question_class_answer1: "",
        question_class_answer2: "",
        question_class_answer3: "",
        question_class_answer4: "",
        question_class_answer5: "",
        [choiceClass]: "choice-answer",
        submitButtonDisabled:
          state?.currentPage === state?.totalPages ? false : true,
        data: prevState.data.map((item, index) =>
          index === objectIndex
            ? {
                ...item,
                question_help: false,
                question_choice_class: choiceClass,
                question_choice_answer: choiceAnswer,
              }
            : item
        ),
      }));
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      studentFeedbackError: "",
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnChangeMathKeyboard = (name, choiceClass) => (inputs) => {
    if (state?.submitted === false)
      return setState((prevState) => ({
        ...prevState,
        error: null,
        objectIndex: Number(name),
        question_class_answer1: "",
        question_class_answer2: "",
        question_class_answer3: "",
        question_class_answer4: "",
        question_class_answer5: "",
        [choiceClass]: "choice-answer",
        submitButtonDisabled:
          state?.currentPage === state?.totalPages ? false : true,
        data: prevState.data.map((item, index) =>
          index === Number(name)
            ? {
                ...item,
                question_help: false,
                question_choice_class: choiceClass,
                question_choice_answer: inputs,
              }
            : item
        ),
      }));
  };

  const handleQuestionHelp = (objectIndex) => () => {
    const item = state?.data.find((_item, index) => index === objectIndex);
    if (state?.submitted === false && item?.question_help === false)
      setState((prevState) => ({
        ...prevState,
        objectIndex: objectIndex,
        question_class_answer1: "",
        question_class_answer2: "",
        question_class_answer3: "",
        question_class_answer4: "",
        question_class_answer5: "",
        submitButtonDisabled:
          state?.currentPage === state?.totalPages ? false : true,
        data: prevState.data.map((item, index) =>
          index === objectIndex
            ? {
                ...item,
                question_help: true,
                question_choice_answer: `Help, I don't know`,
                question_choice_class: "check-box-label-checked",
              }
            : item
        ),
      }));

    if (state?.submitted === false && item?.question_help === true)
      setState((prevState) => ({
        ...prevState,
        objectIndex: objectIndex,
        question_class_answer1: "",
        question_class_answer2: "",
        question_class_answer3: "",
        question_class_answer4: "",
        question_class_answer5: "",
        submitButtonDisabled:
          state?.currentPage === state?.totalPages ? false : true,
        data: prevState.data.map((item, index) =>
          index === objectIndex
            ? {
                ...item,
                question_help: false,
                question_choice_class: "",
                question_choice_answer: "",
              }
            : item
        ),
      }));
  };

  const handleNextClick = (event, objectIndex) => {
    event.preventDefault();

    const nextObjData = state?.data.find((_item, index) => index === objectIndex + 1);
    if (
      nextObjData &&
      nextObjData?.question_choice_answer !== "" &&
      nextObjData?.question_choice_class !== ""
    ) {
      return setState((prevState) => ({
        ...prevState,
        nextButtonDisabled: false,
        prevButtonDisabled: false,
        question_class_answer1: "",
        question_class_answer2: "",
        question_class_answer3: "",
        question_class_answer4: "",
        question_class_answer5: "",
        [nextObjData?.question_choice_class]: "choice-answer",
        currentPage: Math.min(state?.currentPage + 1, state?.totalPages),
      }));
    }

    return setState((prevState) => ({
      ...prevState,
      nextButtonDisabled: true,
      prevButtonDisabled: false,
      question_class_answer1: "",
      question_class_answer2: "",
      question_class_answer3: "",
      question_class_answer4: "",
      question_class_answer5: "",
      [nextObjData?.question_choice_class]: "choice-answer",
      currentPage: Math.min(state?.currentPage + 1, state?.totalPages),
    }));
  };

  const handlePrevClick = (event, objectIndex) => {
    event.preventDefault();
    const objData = state?.data.find(
      (_item, index) => index === objectIndex - 1
    );

    setState((prevState) => ({
      ...prevState,
      nextButtonDisabled: false,
      question_class_answer1: "",
      question_class_answer2: "",
      question_class_answer3: "",
      question_class_answer4: "",
      question_class_answer5: "",
      currentPage: Math.max(state?.currentPage - 1, 1),
      [objData?.question_choice_class]: "choice-answer",
      prevButtonDisabled: state?.currentPage === 2 && true,
    }));
  };

  const handleTermsPolicy = () => {
    if (state?.termsPolicy === false) {
      setState((prevState) => ({
        ...prevState,
        termsPolicy: true,
      }));
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          startQuiz: true,
        }));
      }, 1500);
    }

    if (state?.termsPolicy === true) {
      setState((prevState) => ({
        ...prevState,
        termsPolicy: false,
      }));
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          startQuiz: false,
        }));
      }, 1500);
    }
  };
  
  const handleShowTutorFeedback = async (event) => {
    event.preventDefault();
    const data = { studentquiz_tutor_feedback_toggle: "show" };

    if (state?.showTutorFeedback !== "show")
      await APIsRequests.postTutorFeedback(
        state?.authData?.token,
        studentquiz_id,
        data
      )
        .then(() => {
          toast.success("Quiz result show successfully");
          setState((prevState) => ({
            ...prevState,
            showTutorFeedback: "show",
            hideTutorFeedback: "",
          }));
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message || error?.response?.data?.error
          );
        });
  };

  const handleHideTutorFeedback = async (event) => {
    event.preventDefault();
    const data = { studentquiz_tutor_feedback_toggle: "hide" };

    if (state?.hideTutorFeedback !== "hide")
      await APIsRequests.postTutorFeedback(
        state?.authData?.token,
        studentquiz_id,
        data
      )
        .then(() => {
          toast.success("Quiz result hide successfully");
          setState((prevState) => ({
            ...prevState,
            hideTutorFeedback: "hide",
            showTutorFeedback: "",
          }));
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message || error?.response?.data?.error
          );
        });
  };

  const handleOrganized = (event) => {
    const { id, checked } = event.target;
    setState((prevState) => ({
      ...prevState,
      organizedVeryPoor: false,
      organizedPoor: false,
      organizedFair: false,
      organizedGood: false,
      organizedVeryGood: false,
      studentFeedbackError: "",
    }));

    setState((prevState) => ({
      ...prevState,
      [id]: checked,
      quizOrganized: id,
    }));
  };

  const handleClearness = (event) => {
    const { id, checked } = event.target;
    setState((prevState) => ({
      ...prevState,
      clearnessVeryPoor: false,
      clearnessPoor: false,
      clearnessFair: false,
      clearnessGood: false,
      clearnessVeryGood: false,
      studentFeedbackError: "",
    }));

    setState((prevState) => ({
      ...prevState,
      [id]: checked,
      questionClearness: id,
    }));
  };

  const handleSatisfied = (event) => {
    const { id, checked } = event.target;
    setState((prevState) => ({
      ...prevState,
      satisfiedVeryPoor: false,
      satisfiedPoor: false,
      satisfiedFair: false,
      satisfiedGood: false,
      satisfiedVeryGood: false,
      studentFeedbackError: "",
    }));

    setState((prevState) => ({
      ...prevState,
      [id]: checked,
      quizSatisfied: id,
    }));
  };

  const handleOnDrop = (picture) => {
    setState((prevState) => ({
      ...prevState,
      profilePicture: picture[picture.length - 1],
    }));
  };

  const handleSubmitStudentFeedback = async (event) => {
    event.preventDefault();

    if (
      state.quizOrganized === "" ||
      state.questionClearness === "" ||
      state.quizSatisfied === "" ||
      state.studentFeedback === ""
    )
      return setState((prevState) => ({
        ...prevState,
        studentFeedbackError: "All fields are required",
      }));

    const body = {
      quizOrganized: state.quizOrganized,
      questionClearness: state.questionClearness,
      quizSatisfied: state.quizSatisfied,
      studentFeedback: state.studentFeedback,
    };

    const studentquiz_student_feedback = JSON.stringify(body);
    const data = {
      studentquiz_student_feedback,
      studentquiz_student_feedback_toggle: "show",
    };
    setState((prevState) => ({ ...prevState, studentFeedbackIsLoading: true }));

    await APIsRequests.postStudentFeedback(
      state?.authData?.token,
      studentquiz_id,
      data
    )
      .then(() => {
        toast.success("Feedback submitted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 4500);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || error?.response?.data?.error
        );
      });
  };

  const handleSubmitTutorFeedBack = async (event) => {
    event.preventDefault();
    const data = { studentQuiz_tutor_feedback: state?.tutorFeedback };
    setState((prevState) => ({ ...prevState, tutorFeedbackIsLoading: true }));

    await APIsRequests.postTutorFeedback(
      state?.authData?.token,
      studentquiz_id,
      data
    )
      .then((response) => {
        toast.success("Feedback submitted successfully");
        setState((prevState) => ({
          ...prevState,
          tutorFeedbackIsLoading: false,
          tutorFeedback: response?.data?.data?.studentquiz_tutor_feedback,
        }));
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || error?.response?.data?.error
        );
      });
  };

  const handleResetQuiz = async (event) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, resetIsLoading: true }));

    const data = {
      studentQuiz_status: "pending",
      studentQuiz_result: null,
      studentQuiz_percent: null,
      studentQuiz_tutor_feedback: null,
      studentQuiz_student_feedback: null,
      studentQuiz_tutor_feedback_toggle: "hide",
      studentQuiz_student_feedback_toggle: "hide",
    };

    await APIsRequests.postResetQuiz(
      state?.authData?.token,
      studentquiz_id,
      data
    )
      .then(() => {
        toast.success("Quiz reset successfully");
        setState((prevState) => ({ ...prevState, resetIsLoading: false }));
        setTimeout(() => {
          window.location.replace(`/tutor/get-students/${student_id}`);
        }, 4500);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || error?.response?.data?.error
        );
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      submitted: true,
      submitButtonDisabled: true,
    }));

    const { correction } = await validateQuizAnswers(state?.data);
    const quizResults = { data: state.data, correction: correction };

    await APIsRequests.postStudentQuizResult(
      state?.authData?.token,
      studentquiz_id,
      quizResults
    )
      .then(() => {
        toast.success("Quiz resulted successfully");
        setTimeout(() => {
          setState((prevState) => ({
            ...prevState,
            showStudentFeedback: "show",
          }));
        }, 2000);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || error?.response?.data?.error
        );
      });
  };

  let profilePicturePreview = null;
  if (state?.profilePicture) {
    if (state?.profilePicture.name) {
      const getDocName = state?.profilePicture.name;
      const docLength = getDocName.length;
      const point = getDocName.lastIndexOf(".");
      const getExtensionFile = getDocName.substring(point, docLength);
      const lowCaseExtensionFile = getExtensionFile.toLowerCase();
      if (
        lowCaseExtensionFile === ".jpg" ||
        lowCaseExtensionFile === ".png" ||
        lowCaseExtensionFile === ".gif"
      ) {
        profilePicturePreview = URL.createObjectURL(state?.profilePicture);
      }
    }
  }

  if (state?.isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <ToastContainer />
      <Navbar authData={state?.authData} page={`${role}-dashboard`} />

      {state?.showStudentFeedback === "show" ? (
        <div className="feedback-container">
          <div className="title-container">
            <section>
              <span>SHARE WITH US FEEDBACK</span>
            </section>
          </div>

          <div className="feedback-rates-title">
            <div> Grade Level</div>
            <div className="levels">
              <div>Very Poor</div>
              <div>Poor</div>
              <div>Fair</div>
              <div>Good</div>
              <div>Very Good</div>
            </div>
          </div>

          <div className="feedback-rates-body">
            <div className="title"> Quiz Organized </div>

            <div className="levels">
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="organizedVeryPoor"
                  checked={state?.organizedVeryPoor}
                  onChange={handleOrganized}
                />
                <label htmlFor="organizedVeryPoor" className="check-box" />
              </div>
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="organizedPoor"
                  checked={state?.organizedPoor}
                  onChange={handleOrganized}
                />
                <label htmlFor="organizedPoor" className="check-box" />
              </div>
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="organizedFair"
                  checked={state?.organizedFair}
                  onChange={handleOrganized}
                />
                <label htmlFor="organizedFair" className="check-box" />
              </div>
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="organizedGood"
                  checked={state?.organizedGood}
                  onChange={handleOrganized}
                />
                <label htmlFor="organizedGood" className="check-box" />
              </div>
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="organizedVeryGood"
                  checked={state?.organizedVeryGood}
                  onChange={handleOrganized}
                />
                <label htmlFor="organizedVeryGood" className="check-box" />
              </div>
            </div>
          </div>

          <div className="feedback-rates-body">
            <div className="title"> Question Clearness </div>

            <div className="levels">
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="clearnessVeryPoor"
                  checked={state?.clearnessVeryPoor}
                  onChange={handleClearness}
                />
                <label htmlFor="clearnessVeryPoor" className="check-box" />
              </div>
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="clearnessPoor"
                  checked={state?.clearnessPoor}
                  onChange={handleClearness}
                />
                <label htmlFor="clearnessPoor" className="check-box" />
              </div>
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="clearnessFair"
                  checked={state?.clearnessFair}
                  onChange={handleClearness}
                />
                <label htmlFor="clearnessFair" className="check-box" />
              </div>
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="clearnessGood"
                  checked={state?.clearnessGood}
                  onChange={handleClearness}
                />
                <label htmlFor="clearnessGood" className="check-box" />
              </div>
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="clearnessVeryGood"
                  checked={state?.clearnessVeryGood}
                  onChange={handleClearness}
                />
                <label htmlFor="clearnessVeryGood" className="check-box" />
              </div>
            </div>
          </div>

          <div className="feedback-rates-body">
            <div className="title"> Quiz satisfaction </div>

            <div className="levels">
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="satisfiedVeryPoor"
                  checked={state?.satisfiedVeryPoor}
                  onChange={handleSatisfied}
                />
                <label htmlFor="satisfiedVeryPoor" className="check-box" />
              </div>
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="satisfiedPoor"
                  checked={state?.satisfiedPoor}
                  onChange={handleSatisfied}
                />
                <label htmlFor="satisfiedPoor" className="check-box" />
              </div>
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="satisfiedFair"
                  checked={state?.satisfiedFair}
                  onChange={handleSatisfied}
                />
                <label htmlFor="satisfiedFair" className="check-box" />
              </div>
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="satisfiedGood"
                  checked={state?.satisfiedGood}
                  onChange={handleSatisfied}
                />
                <label htmlFor="satisfiedGood" className="check-box" />
              </div>
              <div className="checkbox-wrapper-19">
                <input
                  type="checkbox"
                  id="satisfiedVeryGood"
                  checked={state?.satisfiedVeryGood}
                  onChange={handleSatisfied}
                />
                <label htmlFor="satisfiedVeryGood" className="check-box" />
              </div>
            </div>
          </div>

          <div className="feedback-area">
            <div> Any comment ? Please share with us below </div>
            <textarea
              required
              type="text"
              placeholder="Enter your comment"
              name="studentFeedback"
              value={state.studentFeedback}
              onChange={handleOnChange}
            />
          </div>

          <div className="feedback-button">
            <div className="error">{state.studentFeedbackError}</div>
            {state?.studentFeedbackIsLoading === true ? (
              <button type="submit" className="disabled-button">
                Share Feedback
              </button>
            ) : (
              <button type="submit" onClick={handleSubmitStudentFeedback}>
                Share Feedback
              </button>
            )}
          </div>
        </div>
      ) : state?.startQuiz === true ? (
        <div className="quiz-question-container">
          <div className="header-container">
            <div className="svg-container">
              <svg viewBox="0 0 800 200" className="svg">
                <path
                  id="curve"
                  fill="#413f3f"
                  d="M 400 100 Q 200 175 0 50 L 0 0 L 800 0 L 800 100 Z"
                ></path>
              </svg>
            </div>

            <h1>Quiz Questions</h1>
            {role === "tutor" &&
            state?.correction !== "" &&
            state?.resetIsLoading === false ? (
              <div className="quiz-reset" onClick={handleResetQuiz}>
                <div>QUIZ</div> <div>RESET</div>
              </div>
            ) : role === "tutor" ? (
              <div className="quiz-reset disabled">
                <div>QUIZ</div> <div>RESET</div>
              </div>
            ) : null}
            {role === "tutor" && state?.correction !== "" && (
              <span className="question-title-right">{state.correction}</span>
            )}
            {role === "student" &&
              state?.correction !== "" &&
              state?.showTutorFeedback === "show" && (
                <span className="question-title-right">{state.correction}</span>
              )}
          </div>

          {getPaginatedData().map((element) => (
            <div className="quiz-sections" key={element?.question_id}>
              <section className="quiz-questions-section">
                <div className="question-title">
                  <span className="question-pages">{`Question ${state?.currentPage}/${state?.totalPages}`}</span>

                  {role === "student" &&
                    state.correction !== "" &&
                    state?.showTutorFeedback === "show" && (
                      <>
                        {element?.question_choice_answer_correct === false && (
                          <span className="question-choice-answer-wrong">
                            Wrong
                            <FontAwesomeIcon
                              icon={faClose}
                              className="paginate-angles"
                            />
                          </span>
                        )}
                        {element?.question_choice_answer_correct === true && (
                          <span className="question-choice-answer-correct">
                            Correct
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="paginate-angles"
                            />
                          </span>
                        )}
                      </>
                    )}

                  {role === "tutor" && state.correction !== "" && (
                    <>
                      {element?.question_choice_answer_correct === false && (
                        <span className="question-choice-answer-wrong">
                          Wrong
                          <FontAwesomeIcon
                            icon={faClose}
                            className="paginate-angles"
                          />
                        </span>
                      )}
                      {element?.question_choice_answer_correct === true && (
                        <span className="question-choice-answer-correct">
                          Correct
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="paginate-angles"
                          />
                        </span>
                      )}
                    </>
                  )}

                  {element?.question_calc === true ? (
                    <span className="question-cal-ok-right">
                      <img src={CalculatorOk} alt="profile" />
                    </span>
                  ) : (
                    <span className="question-cal-cancel-right">
                      <img src={CalculatorCancel} alt="profile" />
                    </span>
                  )}
                </div>

                <div className="question-img">
                  <img src={element?.question_image} alt=" question-diagram" />
                </div>

                <div className="question-body"> {element?.question_body} </div>

                {element?.question_type === "mutliple_choice" && (
                  <div className="choice-answer">
                    {element?.question_answer1 !== null && (
                      <button
                        className={state?.question_class_answer1}
                        type="submit"
                        onClick={(event) =>
                          handleChoice(
                            event,
                            state?.currentPage - 1,
                            "question_class_answer1",
                            element?.question_answer1
                          )
                        }
                      >
                        {element?.question_answer1}
                      </button>
                    )}
                    {element?.question_answer2 !== null && (
                      <button
                        className={state?.question_class_answer2}
                        type="submit"
                        onClick={(event) =>
                          handleChoice(
                            event,
                            state?.currentPage - 1,
                            "question_class_answer2",
                            element?.question_answer2
                          )
                        }
                      >
                        {element?.question_answer2}
                      </button>
                    )}
                    {element?.question_answer3 !== null && (
                      <button
                        className={state?.question_class_answer3}
                        type="submit"
                        onClick={(event) =>
                          handleChoice(
                            event,
                            state?.currentPage - 1,
                            "question_class_answer3",
                            element?.question_answer3
                          )
                        }
                      >
                        {element?.question_answer3}
                      </button>
                    )}
                    {element?.question_answer4 !== null && (
                      <button
                        className={state?.question_class_answer4}
                        type="submit"
                        onClick={(event) =>
                          handleChoice(
                            event,
                            state?.currentPage - 1,
                            "question_class_answer4",
                            element?.question_answer4
                          )
                        }
                      >
                        {element?.question_answer4}
                      </button>
                    )}
                  </div>
                )}

                {element?.question_type === "normal" && (
                  <div className="input-answer">
                    <MathInput
                      value="Hello"
                      placeholder="Enter your math expression here..."
                      divisionFormat="obelus"
                      style={{
                        border: "1px solid #adacac",
                        backgroundColor: "#ffff",
                        borderRadius: "0.2rem",
                        transition: "all 0.3s",
                        fontSize: "1.2rem",
                        outline: "none",
                        color: "#333",
                      }}
                      setValue={handleOnChangeMathKeyboard(
                        state?.currentPage - 1,
                        "question_class_answer5"
                      )}
                    />
                  </div>
                )}

                <div className="button-container">
                  {state?.prevButtonDisabled === true ||
                  (state?.currentPage === 1 &&
                    state?.prevButtonDisabled === true) ? (
                    <button className="disabled-button">
                      <FontAwesomeIcon
                        icon={faAngleLeft}
                        className="paginate-angles"
                      />
                      Prev
                    </button>
                  ) : (
                    state?.currentPage !== 1 &&
                    state?.prevButtonDisabled === false && (
                      <button
                        type="submit"
                        onClick={(event) =>
                          handlePrevClick(event, state?.currentPage - 1)
                        }
                      >
                        <FontAwesomeIcon
                          icon={faAngleLeft}
                          className="paginate-angles"
                        />
                        Prev
                      </button>
                    )
                  )}

                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="cbtest-19"
                      checked={element?.question_help || false}
                      onChange={handleQuestionHelp(state?.currentPage - 1)}
                    />
                    <label htmlFor="cbtest-19" className="check-box" />

                    {element?.question_help === false ? (
                      <span className="check-box-label">
                        Help, I don't know
                      </span>
                    ) : (
                      <span className="check-box-label check-box-label-checked">
                        Help, I don't know
                      </span>
                    )}
                  </div>

                  {state?.currentPage !== state?.totalPages &&
                  state?.nextButtonDisabled === true ? (
                    <button className="disabled-button">
                      Next
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        className="paginate-angles"
                      />
                    </button>
                  ) : (
                    state?.currentPage !== state?.totalPages &&
                    state?.nextButtonDisabled === false && (
                      <button
                        type="submit"
                        onClick={(event) =>
                          handleNextClick(event, state?.currentPage - 1)
                        }
                      >
                        Next
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          className="paginate-angles"
                        />
                      </button>
                    )
                  )}

                  {state?.currentPage === state?.totalPages &&
                  state?.submitButtonDisabled === true ? (
                    <button className="disabled-button">
                      Submit Results
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="paginate-angles"
                      />
                    </button>
                  ) : (
                    state?.currentPage === state?.totalPages &&
                    state?.submitButtonDisabled === false && (
                      <button
                        type="submit"
                        onClick={(event) => handleSubmit(event)}
                      >
                        Submit Results
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="paginate-angles"
                        />
                      </button>
                    )
                  )}
                </div>
              </section>

              {role === "tutor" && state?.correction !== "" && (
                <section className="quiz-correction-section">
                  <div className="correction-header">
                    <span className="correction-header-title">
                      POSSIBLE CORRECT ANSWERS
                    </span>
                    {role === "tutor" && (
                      <span className="correction-header-status">
                        <span
                          className={state?.hideTutorFeedback}
                          onClick={(event) => handleHideTutorFeedback(event)}
                        >
                          HIDE
                        </span>
                        <span
                          className={state?.showTutorFeedback}
                          onClick={(event) => handleShowTutorFeedback(event)}
                        >
                          SHOW
                        </span>
                      </span>
                    )}
                  </div>

                  <div className="correction-body">
                    {element?.question_response1 !== null && (
                      <span>
                        A.
                        <button type="submit">
                          {element?.question_response1}
                        </button>
                      </span>
                    )}
                    {element?.question_response2 !== null && (
                      <span>
                        B.
                        <button type="submit">
                          {element?.question_response2}
                        </button>
                      </span>
                    )}
                    {element?.question_response3 !== null && (
                      <span>
                        C.
                        <button type="submit">
                          {element?.question_response3}
                        </button>
                      </span>
                    )}
                  </div>

                  <div className="correction-feedback">
                    <span>Tutor's Feedback</span>
                    {role === "student" && state?.tutorFeedback !== "" ? (
                      <div> {state?.tutorFeedback} </div>
                    ) : (
                      role === "student" && (
                        <div> There is no feedback yet </div>
                      )
                    )}

                    {role === "tutor" && (
                      <div>
                        <textarea
                          required
                          type="text"
                          placeholder="Enter your feedback"
                          name="tutorFeedback"
                          value={state?.tutorFeedback}
                          onChange={handleOnChange}
                        />
                        {state?.tutorFeedbackIsLoading === true ? (
                          <button className="disabled-button">
                            Share Feedback
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className="paginate-angles"
                            />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            onClick={(event) =>
                              handleSubmitTutorFeedBack(event)
                            }
                          >
                            Submit Feedback
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className="paginate-angles"
                            />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {role === "student" &&
                state?.correction !== "" &&
                state?.showTutorFeedback === "show" && (
                  <section className="quiz-correction-section">
                    <div className="correction-header">
                      <span className="correction-header-title">
                        POSSIBLE CORRECT ANSWERS
                      </span>
                      {role === "tutor" && (
                        <span className="correction-header-status">
                          <span
                            className={state?.hideTutorFeedback}
                            onClick={(event) => handleHideTutorFeedback(event)}
                          >
                            HIDE
                          </span>
                          <span
                            className={state?.showTutorFeedback}
                            onClick={(event) => handleShowTutorFeedback(event)}
                          >
                            SHOW
                          </span>
                        </span>
                      )}
                    </div>

                    <div className="correction-body">
                      {element?.question_response1 !== null && (
                        <span>
                          A.
                          <button type="submit">
                            {element?.question_response1}
                          </button>
                        </span>
                      )}
                      {element?.question_response2 !== null && (
                        <span>
                          B.
                          <button type="submit">
                            {element?.question_response2}
                          </button>
                        </span>
                      )}
                      {element?.question_response3 !== null && (
                        <span>
                          C.
                          <button type="submit">
                            {element?.question_response3}
                          </button>
                        </span>
                      )}
                    </div>

                    <div className="correction-feedback">
                      <span>Tutor's Feedback</span>
                      {role === "student" && state?.tutorFeedback !== "" ? (
                        <div> {state?.tutorFeedback} </div>
                      ) : (
                        role === "student" && (
                          <div> There is no feedback yet </div>
                        )
                      )}

                      {role === "tutor" && (
                        <div>
                          <textarea
                            required
                            type="text"
                            placeholder="Enter your feedback"
                            name="tutorFeedback"
                            value={state?.tutorFeedback}
                            onChange={handleOnChange}
                          />
                          {state?.tutorFeedbackIsLoading === true ? (
                            <button className="disabled-button">
                              Share Feedback
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                className="paginate-angles"
                              />
                            </button>
                          ) : (
                            <button
                              type="submit"
                              onClick={(event) =>
                                handleSubmitTutorFeedBack(event)
                              }
                            >
                              Submit Feedback
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                className="paginate-angles"
                              />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </section>
                )}
            </div>
          ))}
        </div>
      ) : (
        <div className="instructions-container">
          <div className="general-container header">
            <section> <span>GENERAL INSTRUCTIONS</span> </section>
          </div>

          <div className="profile-container">
            <JoinPattern />
            <div className="profile">
              <div className="avatar">
                <div className="picture">
                  <img src={profilePicturePreview || Avatar} alt="profile" />
                </div>
                <ImageUploader
                  fileContainerStyle={{
                    backgroundColor: "#e2e0e0",
                    marginTop: "50px",
                  }}
                  buttonStyles={{
                    fontSize: "20px",
                    fontWeight: 600,
                    backgroundColor: "#808080",
                    color: "#ffff",
                  }}
                  imgExtension={[".jpg", ".png"]}
                  buttonText="Upload Picture"
                  maxFileSize={100000000}
                  onChange={handleOnDrop}
                  withLabel={false}
                  withIcon
                />
              </div>

              <div className="details">
                <div>
                  <span>LAST NAME: </span>
                  <input
                    type="name"
                    required={true}
                    name="lastname"
                    value={state?.lastname}
                    onChange={handleOnChange}
                  />
                </div>
                <div>
                  <span>FIRST NAME: </span>
                  <input
                    type="name"
                    required={true}
                    name="firstname"
                    value={state?.firstname}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>

            <div className="brief">
              <div>● Sign the exam attendance sheet.</div>
              <div>● Fill in the exam banners on your Exam Booklet.</div>
              <div>● You are allowed to use a pencil and an eraser only.</div>
              <div>
                ● You are not allowed to go to the restroom during the exam.
              </div>
              <div>
                ● Keep your student ID card on your desk throughout the exam.
              </div>
              <div>
                ● Do not ask any questions to the Exam Invigilator during the
                exam.
              </div>
              <div>
                ● Your Exam Booklet will be taken by the Exam Invigilator at the
                end of the exam.
              </div>
            </div>
          </div>

          <div className="general-container">
            <section>
              <span> DURATION: </span> 30 MINUTES
            </section>
            <div>
              <span> QUIZ NAME: </span> {state?.quizDetails?.quiz_name}
            </div>
            <div>
              <span> QUIZ DESC: </span> {state?.quizDetails?.quiz_desc}
            </div>

            {state?.profilePicture !== "" &&
              state?.firstname !== "" &&
              state?.lastname && (
                <div className="checkbox-wrapper-19">
                  <input
                    type="checkbox"
                    id="cbtest-19"
                    checked={state?.termsPolicy}
                    onChange={handleTermsPolicy}
                  />
                  <label htmlFor="cbtest-19" className="check-box" />
                  <span className="terms-policy">
                    Agreed terms and policy to continue
                  </span>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestionss;
