import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { APIsRequests } from '../../api/APIsRequests';

const StudentQuizzes = (props) => {
  const [state, setState] = useState({
    sortBy: 'quiz_id',
    quizzes: [],
    assignedQuizzes: [],

    error: null,
    loading: false,
    isLoading: true,
    displayFormOne: false,
    displayFormTwo: false,
    displayFormThree: false,
    buttonStatusOne: false,
    buttonStatusTwo: false,
  });

  useEffect(() => {
    const getStudentQuizzes = async (token, student_id, sortBy) => {
      await APIsRequests.getStudentQuizzes(token, student_id)
      .then(async(response) => {
        const quiz_ids = response?.data?.data.map((element) => element.quiz_id);

        await APIsRequests.getQuizzesApi(token, sortBy)
        .then((response) => {
          return setState((prevState) => ({
            ...prevState,
            isLoading: false,
            quizzes: response?.data?.data.filter((element) => !quiz_ids.includes(element.quiz_id)),
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
      return setState((prevState) => ({ ...prevState, displayFormThree: false }));
    if (state.displayFormThree === false)
      return setState((prevState) => ({ ...prevState, displayFormThree: true }));
  };

  const handleStartQuiz = async (event, studentquiz_id) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      loading: true,
      buttonStatusTwo: false,
    }));

    return window.location.replace(`/${props?.role}/quiz-questions/${studentquiz_id}`);
  };

  const handleSubmit = async (event, quiz_id) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      loading: true,
      buttonStatusOne: true,
    }));

    await APIsRequests.postStudentQuiz(props?.authData?.token, props?.student_id, quiz_id)
    .then(() => {
      toast.success('Quiz assigned successfully');
      setTimeout(() => {
        window.location.replace(`/tutor/get-students/${props?.student_id}`);
      }, 2000);
    })
    .catch((error) => {
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
      { props?.role === 'tutor' &&
        <div style={{ margin: '20px auto' }} className='EditMainPage'>
          {state?.displayFormOne === true ? (
            <button onClick={(event) => handleDisplayFormOne(event)}>NO ASSIGN QUIZZES</button>
          ) : (
            <button onClick={(event) => handleDisplayFormOne(event)}>ASSIGN QUIZZES</button>
          )}

          {state.displayFormOne === true && (
            <ul className='Main__List'>
              {state.quizzes.map((element) => (
                <li key={element?.quiz_id} className='MainList__card'>
                  <p><b>Quiz Code :</b> {element?.quiz_code}</p>
                  <p><b>Quiz Name :</b> {element?.quiz_name}</p>
                  <p><b>Quiz Desc :</b> {element?.quiz_desc}</p>
                  <button type='submit' onClick={(event) => handleSubmit(event, element?.quiz_id)} disabled={state.buttonStatusOne} >ASSIGN QUIZ</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      }

      {
        state.assignedQuizzes.map((element) => {
          if(element.studentquiz_status === 'completed') {
            return (
              <div key={element.studentquiz_id} style={{ margin: '20px auto' }} className='EditMainPage'>
                {state?.displayFormTwo === true ? (
                  <button onClick={(event) => handleDisplayFormTwo(event)}>COMPLETED QUIZZES</button>
                ) : (
                  <button onClick={(event) => handleDisplayFormTwo(event)}>SEE COMPLETED QUIZZES</button>
                )}

                {state.displayFormTwo === true && (
                  <ul className='Main__List'>
                    <li key={element.studentquiz_id} className='MainList__card'>
                      <p><b>Quiz Code :</b> {element.quiz_code}</p>
                      <p><b>Quiz Name :</b> {element.quiz_name}</p>
                      <p><b>Quiz Desc :</b> {element.quiz_desc}</p>
                      <p><b>Quiz Type :</b> {element.quiz_type}</p>
                      <p><b>Quiz Calc :</b> {element.quiz_calc}</p>
                      <p><b>Quiz Status :</b> {element.studentquiz_status}</p>
                      <p><b>Quiz Result :</b> {element.studentquiz_result}</p>
                      <p><b>Quiz Percent :</b> {element.studentquiz_percent}</p>
                      <p><b>Quiz Feedback :</b> {element.studentquiz_feedback}</p>
                    </li>
                  </ul>
                )}
              </div>
            )
          }

          if(element.studentquiz_status === 'pending') {
            return (
              <div key={element.studentquiz_id} style={{ margin: '20px auto' }} className='EditMainPage'>
                {state?.displayFormThree === true ? (
                  <button onClick={(event) => handleDisplayFormThree(event)}>PENDING QUIZZES</button>
                ) : (
                  <button onClick={(event) => handleDisplayFormThree(event)}>SEE PENDING QUIZZES</button>
                )}

                {state.displayFormThree === true && (
                  <ul className='Main__List'>
                    <li key={element.studentquiz_id} className='MainList__card'>
                      <p><b>Quiz Code :</b> {element.quiz_code}</p>
                      <p><b>Quiz Name :</b> {element.quiz_name}</p>
                      <p><b>Quiz Desc :</b> {element.quiz_desc}</p>
                      <p><b>Quiz Type :</b> {element.quiz_type}</p>
                      <p><b>Quiz Calc :</b> {element.quiz_calc}</p>
                      <p><b>Quiz Status :</b> {element.studentquiz_status}</p>
                      <p><b>Quiz Result :</b> {element.studentquiz_result}</p>
                      <p><b>Quiz Percent :</b> {element.studentquiz_percent}</p>
                      <p><b>Quiz Feedback :</b> {element.studentquiz_feedback}</p>
                      <button type='submit' onClick={(event) => handleStartQuiz(event, element?.studentquiz_id)} disabled={state.buttonStatusTwo} >START QUIZ</button>
                    </li>
                  </ul>
                )}
              </div>
            )
          }

          return null
        })
      }
    </>
  );
};

export default StudentQuizzes;
