import React, { useEffect, useState } from 'react';
import LessonList from './LessonList';
import { verifyAuth } from '../../helpers';
import { APIsRequests } from '../../api/APIsRequests';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';

const SortLessons = () => {
  const { role } = useParams();
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    token: null,
    authData: {},
    sortBy: 'lesson_id',
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({ ...prevState, authData }));
    const getLessonsApi = async (authData, sortBy) => {
      await APIsRequests.getLessonsApi(authData?.token, sortBy)
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
    getLessonsApi(authData, state?.sortBy);
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
    <main className='SortMainPage'>
      <Navbar authData={state?.authData} page={`${role}-dashboard`} />
      <div>
        <h1> Sort Lesson List </h1>
        <p> Choose a column to sort the Tutor list </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='categories'>Choose a category</label>
          <select name='categories' id='categories' onChange={handleChange}>
            <option value='lesson_id'>All</option>
            <option value='lesson_name'>LessonName</option>
            <option value='lesson_code'>LessonCode</option>
            <option value='lesson_topic_id'>LessonTopicID</option>
          </select>
        </form>
        <br />
      </div>
      <LessonList
      role={role}
        authData={state?.authData}
        data={state?.data}
        isLoading={state?.isLoading}
        sortBy={state?.sortBy}
      />
    </main>
  );
};

export default SortLessons;
