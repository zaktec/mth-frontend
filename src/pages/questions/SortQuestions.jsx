import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Navbar from '../../components/navbar/Navbar';
import QuestionList from './QuestionList';
import { verifyAuth } from '../../helpers';
import { APIsRequests } from '../../api/APIsRequests';

const SortQuestions = () => {
  const { role } = useParams();
  const [state, setState] = useState({
    data: [],
    authData: {},
    isLoading: true,
    sortBy: 'question_id',
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({...prevState, authData }));
    const getQuestionsApi = async (authData, sortBy) => {
      await APIsRequests.getQuestionsApi(authData?.token, sortBy)
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

    getQuestionsApi(authData, state?.sortBy);
  }, [state.sortBy]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    return setState((prevState) => ({
      ...prevState,
      sortBy: event.target.value,
    }));
  };

  return (
    <div className='SortMainPage'>
      <Navbar authData={state?.authData} page={`${role}-dashboard`} />

      <div>
        <h1> Sort Questions List </h1>
        <p> Choose a column to sort the quiz list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='categories'>Choose a category</label>
          <select name='categories' id='categories' onChange={handleChange}>
            <option value='question_id'>All</option>
            <option value='question_calc'>QuestionCalc</option>
            <option value='question_calc'>QuestionCode</option>
            <option value='question_mark'>CourseLevel</option>
          </select>
          <br></br>
          <input type='submit' value='Submit' />
        </form>
      </div>

      <QuestionList
        role={role}
        data={state?.data}
        sortBy={state?.sortBy}
        authData={state?.authData}
        isLoading={state?.isLoading}
      />
    </div>
  );
};

export default SortQuestions;
