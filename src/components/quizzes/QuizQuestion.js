import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleDown, faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons';

import Input from '../form/input';
import Navbar from '../navbar/Navbar';
import { verifyAuth } from '../../helpers';
import { APIsRequests } from '../../api/APIsRequests';

const QuizQuestion = () => {
  const { studentquiz_id } = useParams();
  const [state, setState] = useState({
    data: [],
    authData: {},
    correction: {},
    objectIndex: null,

    answer: '',
    isLoading: true,
    answerText: 'Answer',

    postPage: 1,
    totalPages: 1,
    currentPage: 1,
    prevButtonDisabled: true,
    nextButtonDisabled: true,
    submitButtonDisabled: true,


    question_class_answer1: '',
    question_class_answer2: '',
    question_class_answer3: '',
    question_class_answer4: '',
    question_class_answer5: '',
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData }));

    const getQuizApi = async (token, studentquiz_id) => {
      await APIsRequests.getQuizQuestions(token, studentquiz_id)
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

    getQuizApi(authData?.token, studentquiz_id);
  }, [state?.postPage, studentquiz_id]);

  useEffect(() => {
    const item = state?.data.find((_item, index) => index === state?.objectIndex);
    if (item && 'question_choice_answer' in item && 'question_choice_class' in item)
      setState((prevState) => ({ ...prevState, nextButtonDisabled: false }));
  }, [state?.data, state?.objectIndex]);

  const getPaginatedData = () => {
    const startIndex = (state?.currentPage - 1) * state?.postPage;
    const endIndex = startIndex + state?.postPage;
    return state?.data.slice(startIndex, endIndex);
  };

  const handleChange = (choiceClass) => (event) => {
    event.preventDefault();

    setState((prevState) => ({
      ...prevState,
      error: null,
      question_class_answer1: '',
      question_class_answer2: '',
      question_class_answer3: '',
      question_class_answer4: '',
      question_class_answer5: '',
      [choiceClass]: 'choice-answer',
      objectIndex: Number(event.target.name),
      submitButtonDisabled: state?.currentPage === state?.totalPages ? false : true,
      data: prevState.data.map((item, index) => index === Number(event.target.name) ? {
        ...item,
        question_choice_class: choiceClass,
        question_choice_answer: event.target.value
      } : item),
    }));
  };

  const handleChoice = (event, objectIndex, choiceClass, choiceAnswer) => {
    event.preventDefault();

    setState((prevState) => ({
      ...prevState,
      objectIndex: objectIndex,
      question_class_answer1: '',
      question_class_answer2: '',
      question_class_answer3: '',
      question_class_answer4: '',
      question_class_answer5: '',
      [choiceClass]: 'choice-answer',
      submitButtonDisabled: state?.currentPage === state?.totalPages ? false : true,
      data: prevState.data.map((item, index) => index === objectIndex ? {
        ...item,
        question_choice_class: choiceClass,
        question_choice_answer: choiceAnswer
      } : item),
    }));
  };

  const handlePrevClick = (event, objectIndex) => {
    event.preventDefault();

    const objData = state?.data.find((_item, index) => index === (objectIndex - 1));
    setState((prevState) => ({
      ...prevState,
      nextButtonDisabled: false,
      question_class_answer1: '',
      question_class_answer2: '',
      question_class_answer3: '',
      question_class_answer4: '',
      question_class_answer5: '',
      currentPage: Math.max(state?.currentPage - 1, 1),
      [objData?.question_choice_class]: 'choice-answer',
      prevButtonDisabled: state?.currentPage === 2 && true,
    }));
  };

  const handleNextClick = (event, objectIndex) => {
    event.preventDefault();

    const nextObjData = state?.data.find((_item, index) => index === (objectIndex + 1));
    if (nextObjData && 'question_choice_answer' in nextObjData && 'question_choice_class' in nextObjData) {
      return setState((prevState) => ({
        ...prevState,
        nextButtonDisabled: false,
        prevButtonDisabled: false,
        question_class_answer1: '',
        question_class_answer2: '',
        question_class_answer3: '',
        question_class_answer4: '',
        question_class_answer5: '',
        [nextObjData?.question_choice_class]: 'choice-answer',
        currentPage: Math.min(state?.currentPage + 1, state?.totalPages)
      }));
    }

    return setState((prevState) => ({
      ...prevState,
      nextButtonDisabled: true,
      prevButtonDisabled: false,
      question_class_answer1: '',
      question_class_answer2: '',
      question_class_answer3: '',
      question_class_answer4: '',
      question_class_answer5: '',
      [nextObjData?.question_choice_class]: 'choice-answer',
      currentPage: Math.min(state?.currentPage + 1, state?.totalPages)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setState((prevState) => ({
      ...prevState,
      error: null,
      loading: true,
      prevButtonDisabled: true,
      submitButtonDisabled: true
    }));
    
    await APIsRequests.postStudentQuizResult(state?.authData?.token, studentquiz_id, state?.data)
    .then((response) => {
      toast.success('Quiz resulted successfully');
      return setState((prevState) => ({
        ...prevState,
        isLoading: false,
        correction: response?.data?.data?.correction,
      }));
    })
    .catch((error) => {
      console.log('--------->', error);
      toast.error(error?.response?.data?.message || error?.response?.data?.error);
    });
  };

  if (state?.isLoading) return <p>Loading....</p>;

  return (
    <div className='quiz-question-container'>
      <ToastContainer />
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
            <div className='question-title'>
              <span>{`Question ${state?.currentPage}/${state?.totalPages}`}</span>
              { Object.keys(state?.correction).length !== 0 && <span className='question-title-right'>{state?.correction?.marks}</span>}
            </div>
            
            <div className='question-img'><img src={element?.question_image} alt=' question-diagram' /> </div>
            <div className='question-body'> {element?.question_body} </div>

            {
              element?.question_type === 'mutliple_choice' &&
              <div className='choice-answer'>
                {element?.question_answer1 !== null && <button className={state?.question_class_answer1} type='submit' onClick={(event) => handleChoice(event, (state?.currentPage - 1), 'question_class_answer1', element?.question_answer1)}> {element?.question_answer1} </button>}
                {element?.question_answer2 !== null && <button className={state?.question_class_answer2} type='submit' onClick={(event) => handleChoice(event, (state?.currentPage - 1), 'question_class_answer2', element?.question_answer2)}> {element?.question_answer2} </button>}
                {element?.question_answer3 !== null && <button className={state?.question_class_answer3} type='submit' onClick={(event) => handleChoice(event, (state?.currentPage - 1), 'question_class_answer3', element?.question_answer3)}> {element?.question_answer3} </button>}
                {element?.question_answer4 !== null && <button className={state?.question_class_answer4} type='submit' onClick={(event) => handleChoice(event, (state?.currentPage - 1), 'question_class_answer4', element?.question_answer4)}> {element?.question_answer4} </button>}
              </div>
            }

            {
              element?.question_type === 'normal' &&
              <div className='input-answer'>
                <Input
                  type='text'
                  className='form__input'
                  name={(state?.currentPage - 1)}
                  placeholder={state?.answerText}
                  value={element?.question_choice_answer || ''}
                  handleChange={handleChange('question_class_answer5')}
                />
              </div>
            }

            <div className='button-container'>
              { state?.prevButtonDisabled === true || (state?.currentPage === 1 && state?.prevButtonDisabled === true)
                ? <button className='disabled-button' ><FontAwesomeIcon icon={faAngleLeft} className='paginate-angles' />  Prev </button>
                : state?.currentPage !== 1 && state?.prevButtonDisabled === false && <button type='submit' onClick={(event) => handlePrevClick(event, (state?.currentPage - 1))} ><FontAwesomeIcon icon={faAngleLeft} className='paginate-angles' />  Prev </button>
              }

              <button> Help <FontAwesomeIcon icon={faAngleDown} className='paginate-angles' /> </button>

              {
                state?.currentPage !== state?.totalPages && state?.nextButtonDisabled === true
                ? <button className='disabled-button' > Next <FontAwesomeIcon icon={faAngleRight} className='paginate-angles' /> </button>
                : state?.currentPage !== state?.totalPages && state?.nextButtonDisabled === false && <button type='submit' onClick={(event) => handleNextClick(event, (state?.currentPage - 1))} > Next <FontAwesomeIcon icon={faAngleRight} className='paginate-angles' /> </button>
              }

              {
                state?.currentPage === state?.totalPages && state?.submitButtonDisabled === true
                ? <button className='disabled-button' > Submit Results <FontAwesomeIcon icon={faCheck} className='paginate-angles' /> </button>
                : state?.currentPage === state?.totalPages && state?.submitButtonDisabled === false && <button type='submit' onClick={(event) => handleSubmit(event)} > Submit Results <FontAwesomeIcon icon={faCheck} className='paginate-angles' /> </button>
              }

            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default QuizQuestion
