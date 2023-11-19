import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Navbar from '../navbar/Navbar';
import Loading from '../loading/Loading';
import { validateSignup, verifyRole } from '../../helpers';
import { authAPIsRequests } from '../../api/APIsRequests';

const Signup = () => {
  const { role } = useParams();
  const [state, setState] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    
    error: null,
    response: null,
    loading: false,
    buttonStatus: false,
  });

  useEffect(() => {
    verifyRole(role);
  }, [role]);

  const handleChange = (key) => {
    key.preventDefault();
    setState((prevState) => ({...prevState, error: null, [key.target.name]: key.target.value }));
  }

  const handleSubmit = async (key) => {
    key.preventDefault();
    const error = validateSignup(state);
    if (error !== null) return setState((prevState) => ({...prevState, error }));
    setState((prevState) => ({...prevState, buttonStatus: true, loading: true, error: null }));

    await authAPIsRequests.signupStudentTutorAdminRequest(role, { username: state.username, password: state.password })
    .then(response => {
      return setState((prevState) => ({...prevState, response: 'Account Created Successfully. Click Signin Below', buttonStatus: false, loading: false }));
    })
    .catch(error => {
        return setState((prevState) => ({...prevState, error: error?.response?.data?.message || error?.response?.data?.error, buttonStatus: false, loading: false }));
    });
  }

  return (
    <div>
        <Navbar page='signup' />
        <div className='auth-unique'>
            <div className='form__logo-container' >
              <div className='form__header'> {role} Signup </div>
            </div>

            <div className='form__content'>
              <input onChange={(name) => handleChange(name)} type='text' name='username' placeholder='Username' className='form__input' />
              <input onChange={(name) => handleChange(name)}  type='password' name='password' placeholder='Password' className='form__input' />
              <input onChange={(name) => handleChange(name)} type='password' name='confirmPassword' placeholder='Confirm Password' className='form__input' />

              <div className='form-error'>{ state.error }</div>
              <div className='form-response'>{state.response}</div>
              <button disabled={state.buttonStatus} onClick={(key) => handleSubmit(key)} type='submit' className='form__button'>
                { state.loading === true ? <Loading /> : 'Signup' }
              </button>
              
              <div className='form__links'><a className='form__link' href='./'>Forgot your password ?</a></div>
              <div className='form__links'>Already have account ? <a className='form__link' href='/signin/student'> Student Login</a> | <a className='form__link' href='/signin/tutor'>Tutor Login</a> | <a className='form__link' href='/signin/admin'>Admin Login</a></div>
            </div>
        </div>
    </div>
  );
}

export default Signup;
