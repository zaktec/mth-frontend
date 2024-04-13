import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import { encrypt } from "../../helpers";
import Button from "../../components/form/Button";
import { APIsRequests } from "../../api/APIsRequests";

const StudentQuizzes = (props) => {
  const [state, setState] = useState({
    sortBy: "quiz_id",
    quizzes: [],
    assignedQuizzes: [],

    error: null,
    loading: false,
    isLoading: true,
    displayFormOne: false,
    displayFormTwo: false,
    buttonStatusOne: false,
    buttonStatusTwo: false,
    displayFormThree: false,
    copyShareableLink: false,
    generateButtonDisabled: false,
  });

  useEffect(() => {
    const getStudentQuizzes = async (token, student_id, sortBy) => {
      await APIsRequests.getStudentQuizzes(token, student_id)
        .then(async (response) => {
          const quiz_ids = response?.data?.data.map( (element) => element.quiz_id);
          await APIsRequests.getQuizzesApi(token, sortBy)
            .then((response) => {
              return setState((prevState) => ({
                ...prevState,
                isLoading: false,
                quizzes: response?.data?.data.filter((element) => !quiz_ids.includes(element.quiz_id)
                ),
              }));
            })
            .catch((error) => {
              console.log(error);
            });

          return setState((prevState) => ({
            ...prevState,
            isLoading: false,
            assignedQuizzes: response?.data?.data,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getStudentQuizzes(props?.authData?.token, props?.student_id, state?.sortBy);
  }, [props, state?.sortBy]);

  const handleDisplayFormOne = async (event) => {
    event.preventDefault();
    if (state.displayFormOne === true)
      return setState((prevState) => ({ ...prevState, displayFormOne: false }));
    if (state.displayFormOne === false)
      return setState((prevState) => ({ ...prevState, displayFormOne: true }));
  };

  const handleDisplayFormTwo = async (event) => {
    event.preventDefault();
    if (state.displayFormTwo === true)
      return setState((prevState) => ({ ...prevState, displayFormTwo: false }));
    if (state.displayFormTwo === false)
      return setState((prevState) => ({ ...prevState, displayFormTwo: true }));
  };

  const handleDisplayFormThree = async (event) => {
    event.preventDefault();
    if (state.displayFormThree === true)
      return setState((prevState) => ({
        ...prevState,
        displayFormThree: false,
      }));
    if (state.displayFormThree === false)
      return setState((prevState) => ({
        ...prevState,
        displayFormThree: true,
      }));
  };

  const handleGenerateLink = async (event, studentquiz_id) => {
    event.preventDefault();
    const encryptedStudent_id = encrypt(props?.student_id);
    const encryptedStudentquiz_id = encrypt(studentquiz_id);
    setState((prevState) => ({ ...prevState, generateButtonDisabled: true }));

    const data = {
      studentQuiz_verify_shareable_link: `${process.env.REACT_APP_CLIENT_URL}/student/verify-shareable-link`,
      studentQuiz_shareable_link: `${process.env.REACT_APP_CLIENT_URL}/student/quiz-questions?studentquiz_id=${encryptedStudentquiz_id}&student_id=${encryptedStudent_id}`,
    };

    await APIsRequests.postShareableLink(
      props?.authData?.token,
      studentquiz_id,
      data
    )
      .then((response) => {
        toast.success("Generate shareable link");
        return setTimeout(() => {
          setState((prevState) => ({
            ...prevState,
            generateButtonDisabled: false,
            assignedQuizzes: response?.data?.data,
          }));
        }, 4500);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || error?.response?.data?.error
        );

        return setState((prevState) => ({
          ...prevState,
          generateButtonDisabled: false,
        }));
      });
  };

  const handleCopyShareableLink = (event, link) => {
    event.preventDefault();
    console.log('========>', link)
    navigator.clipboard.writeText(link)
      .then(() => {
        setState((prevState) => ({ ...prevState, copyShareableLink: true }));
        setTimeout(() => { setState((prevState) => ({ ...prevState, copyShareableLink: false }));}, 2000);
      })
      .catch((err) => {
        return  toast.error('Failed to copy link: ', err);
      });
  };

  const handleQuiz = async (event, studentquiz_id) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      loading: true,
      buttonStatusTwo: false,
    }));

    localStorage.removeItem('shareableData');
    const encrypt_student_id = encrypt(props?.student_id);
    const encrypt_studentquiz_id = encrypt(studentquiz_id);
    return window.location.replace(
      `/${props?.role}/quiz-questions?studentquiz_id=${encrypt_studentquiz_id}&student_id=${encrypt_student_id}`
    );
  };

  const handleSubmit = async (event, quiz_id) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      loading: true,
      buttonStatusOne: true,
    }));

    await APIsRequests.postStudentQuiz(
      props?.authData?.token,
      props?.student_id,
      quiz_id
    )
      .then(() => {
        toast.success("Quiz assigned successfully");
        setTimeout(() => {
          window.location.replace(`/tutor/get-students/${props?.student_id}`);
        }, 2000);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || error?.response?.data?.error
        );

        return setState((prevState) => ({
          ...prevState,
          loading: false,
          buttonStatusOne: false,
          error: error?.response?.data?.message || error?.response?.data?.error,
        }));
      });
  };

  if (state.isLoading) return <p>Loading....</p>;

  return (
    <>
      <ToastContainer />
      {props?.role === "tutor" && (
        <div style={{ margin: "20px auto" }} className="EditMainPage">
          {state?.displayFormOne === true
            ? (<button onClick={(event) => handleDisplayFormOne(event)}>COLLAPSE ASSIGN QUIZZES</button>)
            : (<button onClick={(event) => handleDisplayFormOne(event)}> EXPAND ASSIGN QUIZZES</button>)
          }

          { state.displayFormOne === true && (
            <ul className="Main__List">
              {state.quizzes.map((element) => (
                <li key={element?.quiz_id} className="MainList__card">
                  <p>
                    <b>Quiz Code :</b> {element?.quiz_code}
                  </p>
                  <p>
                    <b>Quiz Name :</b> {element?.quiz_name}
                  </p>
                  <p>
                    <b>Quiz Desc :</b> {element?.quiz_desc}
                  </p>
                  <Button
                    type="submit"
                    id={element?.quiz_id}
                    className="large-button"
                    buttonName="ASSIGN QUIZ"
                    handleSubmit={handleSubmit}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div style={{ margin: "20px auto" }} className="EditMainPage">
        { state?.displayFormThree === true
          ? (<button onClick={(event) => handleDisplayFormThree(event)}> COLLAPSE PENDING QUIZZES </button>)
          : ( <button onClick={(event) => handleDisplayFormThree(event)}> EXPAND PENDING QUIZZES </button>)
        }

        {state.assignedQuizzes.map((element) =>
          element.studentquiz_status === "pending" && state.displayFormThree === true && (
          <ul className="Main__List" key={element.studentquiz_id} >
            <li className="MainList__card">
              <p>
                <b>Quiz Code :</b> {element.quiz_code}
              </p>
              <p>
                <b>Quiz Name :</b> {element.quiz_name}
              </p>
              <p>
                <b>Quiz Desc :</b> {element.quiz_desc}
              </p>
              <p>
                <b>Quiz Type :</b> {element.quiz_type}
              </p>
              <p>
                <b>Quiz Status :</b> {element.studentquiz_status}
              </p>
              <p>
                <b>Quiz Percent :</b>
                {element.studentquiz_percent || "Not found"}
              </p>
              <p>
                <b>Quiz Feedback :</b>
                {element.studentquiz_feedback || "Not found"}
              </p>

              {props?.role === "tutor" &&
                !element?.studentquiz_shareable_details && (
                  <Button
                    type="submit"
                    className="medium-button"
                    id={element.studentquiz_id}
                    handleSubmit={handleGenerateLink}
                    buttonName="Generate Shareable Link"
                    disabled={state?.generateButtonDisabled}
                  />
                )}

              {props?.role === "tutor" &&
                element?.studentquiz_shareable_details && (
                  <p>
                    <b>Share Student Link </b>
                    <a onClick={(event) => handleCopyShareableLink(event, JSON.parse(element?.studentquiz_shareable_details).studentQuiz_verify_shareable_link)} href={JSON.parse(element?.studentquiz_shareable_details).studentQuiz_verify_shareable_link}>
                      { state?.copyShareableLink ? 'Quiz Link copied!' : 'Click Copy Quiz Link' }
                    </a>
                  </p>
                )}

              {props?.role === "student" && (
                <Button
                  type="submit"
                  buttonName="START QUIZ"
                  className="large-button"
                  handleSubmit={handleQuiz}
                  id={element?.studentquiz_id}
                  disabled={state.buttonStatusTwo}
                />
              )}
            </li>
          </ul>
        ))}
      </div>

      <div style={{ margin: "20px auto" }} className="EditMainPage" >
        { state?.displayFormTwo === true
          ? ( <button onClick={(event) => handleDisplayFormTwo(event)}> COLLAPSE COMPLETED QUIZZES </button> )
          : ( <button onClick={(event) => handleDisplayFormTwo(event)}> EXPAND COMPLETED QUIZZES </button> )
        }

        {state.assignedQuizzes.map((element) =>
          element.studentquiz_status === "completed" && state.displayFormTwo === true && (
          <ul className="Main__List" key={element.studentquiz_id} >
            <li key={element.studentquiz_id} className="MainList__card">
              <p>
                <b>Quiz Code :</b> {element.quiz_code}
              </p>
              <p>
                <b>Quiz Name :</b> {element.quiz_name}
              </p>
              <p>
                <b>Quiz Desc :</b> {element.quiz_desc}
              </p>
              <p>
                <b>Quiz Type :</b> {element.quiz_type}
              </p>
              <p>
                <b>Quiz Status :</b> {element.studentquiz_status}
              </p>

              {props?.role === "student" &&
              element?.studentquiz_toggle === "show" ? (
                <p>
                  <b>Quiz Percent :</b>
                  {element.studentquiz_percent || "Not found"}
                </p>
              ) : props?.role === "student" &&
                element?.studentquiz_toggle === "hide" ? (
                <p>
                  <b>Quiz Percent :</b> Not found
                </p>
              ) : null}

              {props?.role === "student" &&
              element?.studentquiz_toggle === "show" ? (
                <p>
                  <b>Quiz Feedback :</b>
                  {element.studentquiz_feedback || "Not found"}
                </p>
              ) : props?.role === "student" &&
                element?.studentquiz_toggle === "hide" ? (
                <p>
                  <b>Quiz Percent :</b> Not found
                </p>
              ) : null}

              {props?.role === "tutor" && (
                <p>
                  <b>Quiz Percent :</b>
                  {element.studentquiz_percent || "Not found"}
                </p>
              )}
              {props?.role === "tutor" && (
                <p>
                  <b>Quiz Feedback :</b>
                  {element.studentquiz_feedback || "Not found"}
                </p>
              )}
              <Button
                type="submit"
                buttonName="REVIEW QUIZ"
                className="large-button"
                handleSubmit={handleQuiz}
                id={element?.studentquiz_id}
                disabled={state.buttonStatusTwo}
              />
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default StudentQuizzes;
