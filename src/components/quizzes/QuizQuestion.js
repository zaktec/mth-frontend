
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useSearchParams } from 'react-router-dom';
import React, { useState, useEffect, useRef  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheck, faClose, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import Input from '../form/input';
import Navbar from '../navbar/Navbar';
import { APIsRequests } from '../../api/APIsRequests';
import CalculatorOk from '../../assets/images/calculator-ok.png';
import CalculatorCancel from '../../assets/images/calculator-cancel.png';
import { verifyAuth, validateQuizAnswers, dencrypt } from '../../helpers';

const QuizQuestion = () => {
  const keyboard = useRef();
  const { role } = useParams();
  const [ searchParams ] = useSearchParams();  
  const dencrypted_student_id = searchParams.get('student_id');
  const dencrypted_studentquiz_id = searchParams.get('studentquiz_id');

  const student_id = dencrypt(dencrypted_student_id);
  const studentquiz_id = dencrypt(dencrypted_studentquiz_id);

  const [ state, setState ] = useState({
    data: [],
    authData: {},
    objectIndex: null,

    inputs: {},
    inputName: "default",
    layoutName: "default",

    answer: '',
    feedback: '',
    correction: '',
    answerText: 'Answer',

    postPage: 1,
    totalPages: 1,
    currentPage: 1,
    isLoading: true,
    submitted: false,
    displayKeyboard: false,
    prevButtonDisabled: true,
    nextButtonDisabled: true,
    feedbackIsLoading: false,
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

    const getQuizApi = async (token) => {
      await APIsRequests.getQuizQuestions(token, student_id || null, studentquiz_id)
        .then((response) => {
          setState((prevState) => ({
            ...prevState,
            objectIndex: 0,
            submitted: true,
            isLoading: false,
            nextButtonDisabled: false,
            question_class_answer1: '',
            question_class_answer2: '',
            question_class_answer3: '',
            question_class_answer4: '',
            question_class_answer5: '',
            data: response?.data?.data?.quizResults,
            feedback: response?.data?.data?.quizFeedback || '',
            correction: response?.data?.data?.quizCorrection || '',
            [response?.data?.data?.quizResults[0].question_choice_class]: 'choice-answer',
            totalPages: Math.ceil(response?.data?.data.quizResults.length / state?.postPage),
          }));

          if (state?.correction === '') {
            return setState((prevState) => ({
              ...prevState,
              submitted: false,
              objectIndex: null,
              nextButtonDisabled: true,
              data: prevState.data.map((item) => ({
                ...item,
                question_help: false,
                question_choice_class: '',
                question_choice_answer: '',
                question_choice_answer_correct: false
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
    const item = state?.data.find((_item, index) => index === state?.objectIndex);
    if (item && item?.question_choice_answer !== '' && item?.question_choice_class !== '' )
      setState((prevState) => ({ ...prevState, nextButtonDisabled: false }));

    if (item && item?.question_choice_answer === '' && item?.question_choice_class === '' )
      setState((prevState) => ({ ...prevState, nextButtonDisabled: true }));
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
        question_class_answer1: '',
        question_class_answer2: '',
        question_class_answer3: '',
        question_class_answer4: '',
        question_class_answer5: '',
        [choiceClass]: 'choice-answer',
        submitButtonDisabled: state?.currentPage === state?.totalPages ? false : true,
        data: prevState.data.map((item, index) => index === objectIndex ? {
          ...item,
          question_help: false,
          question_choice_class: choiceClass,
          question_choice_answer: choiceAnswer,
        } : item),
      }));
  };

  const handleChange = (choiceClass) => (event) => {
    event.preventDefault();

    if (state?.submitted === false)
      return setState((prevState) => ({
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
          question_help: false,
          question_choice_class: choiceClass,
          question_choice_answer: event.target.value,
        } : item),
      }));
  };

  const handleDisplayKeyboard = () => {
    setState((prevState) => ({ ...prevState, displayKeyboard: !prevState.displayKeyboard }));
  }

  const handleChangeKeyboard = (name, choiceClass) => (inputs) => {    
    if (state?.submitted === false)
      return setState((prevState) => ({
        ...prevState,
        error: null,
        question_class_answer1: '',
        question_class_answer2: '',
        question_class_answer3: '',
        question_class_answer4: '',
        question_class_answer5: '',
        [choiceClass]: 'choice-answer',
        objectIndex: Number(name),
        submitButtonDisabled: state?.currentPage === state?.totalPages ? false : true,
        data: prevState.data.map((item, index) => index === Number(name) ? {
          ...item,
          question_help: false,
          question_choice_class: choiceClass,
          question_choice_answer: inputs?.default,
        } : item),
      }));
  };

  const handleShift = () => {
    setState((prevState) => ({
      ...prevState,
      layoutName: prevState.layoutName === 'default' ? 'shift' : 'default'
    }));
  };

  const handleKeyPress = (button) => {
    console.log('Button pressed', button);
    if (button === '{shift}' || button === '{lock}') handleShift();
  };

  const handleQuestionHelp = (objectIndex) => () => {
    const item = state?.data.find((_item, index) => index === objectIndex);
    if (state?.submitted === false && item?.question_help === false)
      setState((prevState) => ({
        ...prevState,
        objectIndex: objectIndex,
        question_class_answer1: '',
        question_class_answer2: '',
        question_class_answer3: '',
        question_class_answer4: '',
        question_class_answer5: '',
        submitButtonDisabled: state?.currentPage === state?.totalPages ? false : true,
        data: prevState.data.map((item, index) => index === objectIndex ? {
          ...item,
          question_help: true,
          question_choice_answer: `Help, I don't know`,
          question_choice_class: 'check-box-label-checked',
        } : item),
      }));

    if (state?.submitted === false && item?.question_help === true)
      setState((prevState) => ({
        ...prevState,
        objectIndex: objectIndex,
        question_class_answer1: '',
        question_class_answer2: '',
        question_class_answer3: '',
        question_class_answer4: '',
        question_class_answer5: '',
        submitButtonDisabled: state?.currentPage === state?.totalPages ? false : true,
        data: prevState.data.map((item, index) => index === objectIndex ? {
          ...item,
          question_help: false,
          question_choice_class: '',
          question_choice_answer: '',
        } : item),
      }));
  };

  const handleChangeFeedback = (event) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, feedback: event.target.value }));
  }

  const handleSubmitFeedBack = async (event) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, feedbackIsLoading: true }));
    
    toast.success('Feedback shared successfully');
    setTimeout(() => { window.location.reload(); }, 4500);
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
    if (nextObjData && nextObjData?.question_choice_answer !== '' && nextObjData?.question_choice_class !== '') {
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
      submitted: true,
      submitButtonDisabled: true
    }));

    const { correction } = await validateQuizAnswers(state?.data);
    const quizResults = { data: state.data, correction: correction }

    await APIsRequests.postStudentQuizResult(state?.authData?.token, studentquiz_id, quizResults)
    .then(() => {
      toast.success('Quiz resulted successfully');
      setTimeout(() => { window.location.reload(); }, 4500);
      
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
      <Navbar authData={state?.authData} page={`${role}-dashboard`} />

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
        { state.correction !== '' && <span className='question-title-right' >{ state.correction}</span> }
      </div>

      {getPaginatedData().map((element) => (
        <div className='quiz-sections' key={element?.question_id}>
          <section className='quiz-questions-section'>
            <div className='question-title'>
              <span className='question-pages'>{`Question ${state?.currentPage}/${state?.totalPages}`}</span>
              
              { element?.question_choice_answer_correct === false
                && state.correction !== ''
                && <span className='question-choice-answer-wrong'>Wrong <FontAwesomeIcon icon={faClose} className='paginate-angles' /> </span>
              }

              { element?.question_choice_answer_correct === true
                && state.correction !== ''
                && <span className='question-choice-answer-correct'>Correct <FontAwesomeIcon icon={faCheck} className='paginate-angles' /></span>
              }

              { 
                element?.question_calc === true
                ? <span className='question-cal-ok-right'> <img src={CalculatorOk} alt='profile' /> </span>
                : <span className='question-cal-cancel-right'> <img src={CalculatorCancel} alt='profile' /> </span>
              }
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
              element?.question_type === 'normal'
              && <div className='input-answer'>
                  <Input
                    type='text'
                    icon={true}
                    name={(state?.currentPage - 1)}
                    placeholder={state?.answerText}
                    displayKeyboard={state?.displayKeyboard}
                    handleDisplayKeyboard={handleDisplayKeyboard}
                    handleChange={handleChange('question_class_answer5')}
                    value={(element?.question_choice_answer !== `Help, I don't know` && element?.question_choice_answer) || ''}
                  />
                </div>
            }

            { element?.question_type === 'normal' && state?.displayKeyboard === true
              && <div className='input-answer-keyboard'>
                  <Keyboard
                    onKeyPress={handleKeyPress}
                    inputName={state.inputName}
                    layoutName={state.layoutName}
                    keyboardRef={(r) => (keyboard.current = r)}
                    onChangeAll={handleChangeKeyboard(state?.currentPage - 1, 'question_class_answer5')}
                  />
                </div>
            }

            <div className='button-container'>
              { state?.prevButtonDisabled === true || (state?.currentPage === 1 && state?.prevButtonDisabled === true)
                ? <button className='disabled-button' ><FontAwesomeIcon icon={faAngleLeft} className='paginate-angles' />  Prev </button>
                : state?.currentPage !== 1 && state?.prevButtonDisabled === false && <button type='submit' onClick={(event) => handlePrevClick(event, (state?.currentPage - 1))} ><FontAwesomeIcon icon={faAngleLeft} className='paginate-angles' />  Prev </button>
              }

              <div className='checkbox-wrapper-19'>
                <input type='checkbox' id='cbtest-19' checked={element?.question_help || false } onChange={handleQuestionHelp(state?.currentPage - 1)}/>
                <label htmlFor='cbtest-19' className='check-box' />
                
                {
                  element?.question_help === false
                  ? <span  className='check-box-label'> Help, I don't know </span>
                  : <span className='check-box-label check-box-label-checked'> Help, I don't know </span>
                }
              </div>

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
          </section>

          {
            state?.correction !== ''
            && <section className='quiz-correction-section'>
                <div className='correction-header'>
                  <span>POSSIBLE CORRECT ANSWERS</span>
                </div>
                <div className='correction-body'>
                    {element?.question_response1 !== null && <span> A. <button type='submit'> {element?.question_response1} </button></span>}
                    {element?.question_response2 !== null && <span> B. <button type='submit'> {element?.question_response2} </button></span>}
                    {element?.question_response3 !== null && <span> C. <button type='submit'> {element?.question_response3} </button></span>}
                </div>
                <div className='correction-feedback'>
                  <span>Tutor's Feedback</span>
                  { role === 'student' && state?.feedback !=='' ? <div> { state?.feedback } </div> : role === 'student' && <div> There is no feedback yet </div> }

                  {
                    role === 'tutor'
                    &&
                    <>
                      <textarea
                        value={state?.feedback}
                        onChange={handleChangeFeedback}
                        placeholder='Share feedback'
                      />
                      {
                        state?.feedbackIsLoading === true
                        ? <button className='disabled-button' > Share Feedback <FontAwesomeIcon icon={faEnvelope} className='paginate-angles' /> </button>
                        : <button type='submit' onClick={(event) => handleSubmitFeedBack(event)} > Submit Feedback <FontAwesomeIcon icon={faEnvelope} className='paginate-angles' /> </button>
                      }
                    </>
                  }
                </div>
              </section>
          }
        </div>
      ))}
    </div>
  );
};

export default QuizQuestion
