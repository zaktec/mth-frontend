import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import { verifyAuth } from '../../helpers';
import { APIsRequests } from '../../api/APIsRequests';
import QuizList from './QuizList';
import { useParams } from 'react-router-dom';

const SortQuizzes = () => {
  const { role } = useParams();
  const [state, setState] = useState({
    data: [],
    token: null,
    authData: {},
    isLoading: true,
    sortBy: 'quiz_id',
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData }));
    const getQuizzesApi = async (authData, sortBy) => {
      await APIsRequests.getQuizzesApi(authData?.token, sortBy)
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

    getQuizzesApi(authData, state?.sortBy);
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
    <div className={'SortMainPage'}>
      <Navbar authData={state?.authData} page='admin-dashboard' />
      <div>
        <h1> Sort Quizzes List </h1>
        <p> Choose a column to sort the quiz list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='categories'>Choose a category</label>
          <select name='categories' id='categories' onChange={handleChange}>
            <option value='quiz_id'>All</option>
            <option value='quiz_name'>CourseName</option>
            <option value='quiz_code'>CourseCode</option>
            <option value='quiz_level'>CourseLevel</option>
          </select>
          <br></br>
          <input type='submit' value='Submit' />
        </form>
      </div>
      {
        <QuizList
          role={role}
          data={state?.data}
          authData={state?.authData}
          sortBy={state?.sortBy}
          isLoading={state?.isLoading}
        />
      }
    </div>
  );
};

export default SortQuizzes;
