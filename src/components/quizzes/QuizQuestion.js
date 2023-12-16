import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleDown, faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons';

import Input from '../form/input';
import Navbar from '../navbar/Navbar';
import { verifyAuth } from '../../helpers';
import { APIsRequests } from '../../api/APIsRequests';

const QuizQuestion = () => {
  const { quiz_id } = useParams();
  const [state, setState] = useState({
    data: [],
    authData: {},

    answer: '',
    isLoading: true,
    answerText: 'Answer',
    buttonStatusOne: false,
    buttonStatusTwo: false,

    postPage: 1,
    totalPages: 1,
    currentPage: 1,
    
    answerClass: '',
    question_answer1: '',
    question_answer2: '',
    question_answer3: '',
    question_answer4: '',
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData }));
    const getQuizApi = async (token, quiz_id) => {
      await APIsRequests.getQuizQuestions(token, quiz_id)
        .then((response) => {
          return setState((prevState) => ({
            ...prevState,
            totalPages: Math.ceil(response?.data?.data.length / state?.postPage),
            data: response?.data?.data,
            isLoading: false
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getQuizApi(authData?.token, quiz_id);
  }, [state?.postPage, quiz_id]);


  const getPaginatedData = () => {
    const startIndex = (state?.currentPage - 1) * state?.postPage;
    const endIndex = startIndex + state?.postPage;
    return state?.data.slice(startIndex, endIndex);
  };

  const handleChange = (event) => {
    event.preventDefault();

    setState((prevState) => ({
      error: null,
      ...prevState,
      answerClass: '',
      data: prevState.data.map((item) => item.question_id === Number(event.target.name) ? {
        ...item,
        question_choice_answer: event.target.value
      } : item),
    }));
  };

  const handleChoice = (event, objectId, choiceClass, choiceAnswer) => {
    event.preventDefault();

    setState((prevState) => ({
      ...prevState,
      question_answer1: '',
      question_answer2: '',
      question_answer3: '',
      question_answer4: '',
      [choiceClass]: 'choice-answer',
      data: prevState.data.map((item) => item.question_id === objectId ? {
        ...item,
        question_choice_class: choiceClass,
        question_choice_answer: choiceAnswer
      } : item),
    }));
  };

  const handlePrevClick = (event, objectId) => {
    event.preventDefault();
    const objData = state?.data.find(item => item.question_id === objectId);

    setState((prevState) => ({
      ...prevState,
      question_answer1: '',
      question_answer2: '',
      question_answer3: '',
      question_answer4: '',
      [objData?.question_choice_class]: 'choice-answer',
      currentPage: Math.max(state?.currentPage - 1, 1),
    }));
  };

  const handleNextClick = (event, objectId) => {
    event.preventDefault();
    const objData = state?.data.find(item => item.question_id === objectId);

    setState((prevState) => ({
      ...prevState,
      question_answer1: '',
      question_answer2: '',
      question_answer3: '',
      question_answer4: '',
      [objData?.question_choice_class]: 'choice-answer',
      currentPage: Math.min(state?.currentPage + 1, state?.totalPages)
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setState((prevState) => ({
      ...prevState,
      error: null,
      loading: true,
      buttonStatusOne: true,
      buttonStatusTwo: true,
    }));
    
    state?.data.map((element) => console.log(element?.question_choice_answer));
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

      <section>
        {getPaginatedData().map((element) => (
          <div className='card' key={element?.question_id}>
            <div className='question-title'> {`Question ${state?.currentPage}/${state?.totalPages}`} </div>
            <div className='question-img'><img src={element?.question_image} alt=' question-diagram' /> </div>
            <div className='question-body'> {element?.question_body} </div>

            {
              element?.question_type === 'mutliple_choice' &&
              <div className='choice-answer'>
                {element?.question_answer1 !== null && <button className={state?.question_answer1} type='submit' onClick={(event) => handleChoice(event, element?.question_id, 'question_answer1', element?.question_answer1)}> {element?.question_answer1} </button>}
                {element?.question_answer2 !== null && <button className={state?.question_answer2} type='submit' onClick={(event) => handleChoice(event, element?.question_id, 'question_answer2', element?.question_answer2)}> {element?.question_answer2} </button>}
                {element?.question_answer3 !== null && <button className={state?.question_answer3} type='submit' onClick={(event) => handleChoice(event, element?.question_id, 'question_answer3', element?.question_answer3)}> {element?.question_answer3} </button>}
                {element?.question_answer4 !== null && <button className={state?.question_answer4} type='submit' onClick={(event) => handleChoice(event, element?.question_id, 'question_answer4', element?.question_answer4)}> {element?.question_answer4} </button>}
              </div>
            }

            {
              element?.question_type === 'normal' &&
              <div className='input-answer'>
                <Input
                  type='text'
                  className='form__input'
                  name={element?.question_id}
                  handleChange={handleChange}
                  placeholder={state?.answerText}
                  value={element?.question_choice_answer || ''}
                />
              </div>
            }

            <div className='button-container'>
              <button type='submit' onClick={(event) => handlePrevClick(event, element?.question_id - 1)} disabled={state?.currentPage === 1} ><FontAwesomeIcon icon={faAngleLeft} className="paginate-angles" />  Prev </button>
              <button type='submit' disabled={state.buttonStatusTwo} > Help <FontAwesomeIcon icon={faAngleDown} className="paginate-angles" /> </button>
              {
                state?.currentPage !== state?.totalPages
                ?  <button type='submit' onClick={(event) => handleNextClick(event, element?.question_id + 1)} > Next <FontAwesomeIcon icon={faAngleRight} className="paginate-angles" /> </button>
                : <button type='submit' disabled={state.buttonStatusOne} onClick={(event) => handleSubmit(event)} > Submit Results <FontAwesomeIcon icon={faCheck} className="paginate-angles" /> </button>
              }
              
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default QuizQuestion
