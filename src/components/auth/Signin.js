import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Input from '../form/input';
import Navbar from '../navbar/Navbar';
import Loading from '../loading/Loading';
import { APIsRequests } from '../../api/APIsRequests';
import { validateSignin, verifyRole, verifyDeviceId } from '../../helpers';

const Signin = () => {
  const { role } = useParams();
  const [state, setState] = useState({
    username: '',
    password: '',

    error: null,
    loading: false,
    buttonStatus: false,
  });

  useEffect(() => {
    verifyRole(role);
    verifyDeviceId();
  }, [role]);

  const handleChange = (key) => {
    key.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      [key.target.name]: key.target.value,
    }));
  };

  const handleSubmit = async (key) => {
    key.preventDefault();
    const error = validateSignin(state);
    if (error !== null)
      return setState((prevState) => ({ ...prevState, error }));
    setState((prevState) => ({
      ...prevState,
      buttonStatus: true,
      loading: true,
      error: null,
    }));

    await APIsRequests
      .signinStudentTutorAdminRequest(role, {
        username: state.username,
        password: state.password,
        deviceId: localStorage.getItem('deviceId'),
      })
      .then((response) => {
        localStorage.setItem('data', JSON.stringify(response?.data));
        window.location.replace(`/${role}/dashboard`);
      })
      .catch((error) => {
        return setState((prevState) => ({
          ...prevState,
          error: error?.response?.data?.message || error?.response?.data?.error,
          buttonStatus: false,
          loading: false,
        }));
      });
  };

  return (
    <div>
      <Navbar page='signin' />
      <div className='auth-unique'>
        <div className='form__logo-container'>
          <div className='form__header'>{role} Login </div>
        </div>

        <div className='form__content'>
          <Input
            type='text'
            name='username'
            placeholder='Username'
            handleChange={handleChange}
          />
          <Input
            type='password'
            name='password'
            placeholder='Password'
            handleChange={handleChange}
          />

          <div className='form-error'>{state.error}</div>
          <button disabled={state.buttonStatus} onClick={(event) => handleSubmit(event)} type='submit' className='form__button'>
            {state.loading === true ? <Loading /> : 'Signin'}
          </button>

          <div className='form__links'>
            <a className='form__link' href='./'>
              Forgot your password ?
            </a>
          </div>
          <div className='form__links'>
            Don't have account ?
            <a className='form__link' href='/student/signup'>
              Signup Student
            </a>

            <a className='form__link' href='/tutor/signup'>
            | Signup Tutor
            </a>

            <a className='form__link' href='/admin/signup'>
            | Signup Admin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
