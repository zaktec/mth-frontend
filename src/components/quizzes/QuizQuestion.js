import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../form/input';
import Navbar from '../navbar/Navbar';
import { verifyAuth } from '../../helpers';
import { APIsRequests } from '../../api/APIsRequests';

const QuizQuestion = () => {
  const { role, quiz_id } = useParams();
  const [state, setState] = useState({
    data: [],
    authData: {},

    answer: '',
    isLoading: true,
    answerClass: '',
    answerText: 'Answer',
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData }));
    const getQuizApi = async (token, quiz_id) => {
      await APIsRequests.getQuizQuestions(token, quiz_id)
        .then((response) => {
          return setState((prevState) => ({
            ...prevState,
            data: response?.data?.data,
            isLoading: false,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getQuizApi(authData?.token, quiz_id);
  }, [quiz_id]);

  const handleChange = (key) => {
    key.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      answerClass: '',
      [key.target.name]: key.target.value,
    }));
  };

  const handleSubmit = (key) => {
    key.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      loading: true,
      buttonStatusOne: true,
    }));

    console.log('------>', role, state?.answer);
  };

  if (state?.isLoading) return <p>Loading....</p>;

  return (
    <div className='quiz-question-container'>
      <Navbar authData={state?.authData} page='student-dashboard' />

      <div className='header-container'>
        <div className='svg-container'>
          <svg viewBox='0 0 800 200' className='svg'>
            <path
              id='curve'
              fill='#413f3f'
              d='M 400 100 Q 200 175 0 50 L 0 0 L 800 0 L 800 100 Z'
            ></path>
          </svg>
        </div>
        <h1>Quiz Questions</h1>
      </div>

      <div className='question-answer-container'>
        <div className='question'>
          {state.data.map((element, index) => (
            <div key={element.question_id}>
              <div className='question-title'> {`Question ${index + 1}`} </div>
              <div className='question-body'> {element.question_body} </div>
            </div>
          ))}
        </div>

        <div className='answer'>
          <Input
            type='text'
            name='answer'
            className='form__input'
            handleChange={handleChange}
            placeholder={state?.answerText}
          />
        </div>
      </div>

      <div className='button-container'>
        <button
          onClick={(event) => handleSubmit(event)}
          disabled={state.buttonStatusTwo}
          type='submit'
        >
          Submit Result
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;
