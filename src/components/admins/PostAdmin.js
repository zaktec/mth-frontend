import React, { useState } from 'react';

import Input from '../form/input';
import Loading from '../loading/Loading';
import ImageUploader from 'react-images-upload';
import JoinPattern from '../patterns/joinPattern';
import Avatar from '../../assets/images/avatar.png';
import { APIsRequests } from '../../api/APIsRequests';

const PostAdmin = (props) => {
  const [isAdminActiveTrue, setIsAdminActiveTrue] = useState(false);
  const [isAdminActiveFalse, setIsAdminActiveFalse] = useState(false);
  const [state, setState] = useState({
    admin_image: '',
    admin_email: '',
    admin_lastname: '',
    admin_username: '',
    admin_password: '',
    admin_firstname: '',
    admin_active: false,

    error: null,
    loading: false,
    displayForm: false,
    buttonStatus: false,
  });

  const handleChange = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      [event.target.name]: event.target.value,
    }));
  };

  const handleIsAdminActiveTrue = () => {
    if (isAdminActiveFalse === false) {
      setIsAdminActiveTrue(!isAdminActiveTrue);
      setState((prevState) => ({ ...prevState, admin_active: true }));
    }
  };

  const handleIsAdminActiveFalse = () => {
    if (isAdminActiveTrue === false) {
      setIsAdminActiveFalse(!isAdminActiveFalse);
      setState((prevState) => ({ ...prevState, admin_active: false }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      loading: true,
      buttonStatus: true,
    }));

    await APIsRequests.postAdminApi(props?.authData?.token, state)
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          message: 'admin saved successfully',
        }));

        setTimeout(() => {
          window.location.replace(`/adminlist`);
        }, 2000);
      })
      .catch((error) => {
        return setState((prevState) => ({
          ...prevState,
          loading: false,
          buttonStatus: false,
          error: error?.response?.data?.message || error?.response?.data?.error,
        }));
      });
  };

  const handleDisplayForm = async (event) => {
    event.preventDefault();
    if (state.displayForm === true)
      return setState((prevState) => ({ ...prevState, displayForm: false }));
    if (state.displayForm === false)
      return setState((prevState) => ({ ...prevState, displayForm: true }));
  };

  const onDrop = (picture) => {
    setState((prevState) => ({
      ...prevState,
      admin_image: picture[picture.length - 1],
    }));
  };

  let profilePicturePreview = null;
  if (state?.admin_image) {
    if (state?.admin_image.name) {
      const getDocName = state?.admin_image.name;
      const docLength = getDocName.length;
      const point = getDocName.lastIndexOf('.');
      const getExtensionFile = getDocName.substring(point, docLength);
      const lowCaseExtensionFile = getExtensionFile.toLowerCase();
      if (
        lowCaseExtensionFile === '.jpg' ||
        lowCaseExtensionFile === '.png' ||
        lowCaseExtensionFile === '.gif'
      ) {
        profilePicturePreview = URL.createObjectURL(state?.admin_image);
      }
    }
  }

  return (
    <div className='PostMainPage'>
      {state?.displayForm === true ? (
        <button onClick={(event) => handleDisplayForm(event)}>NO ADD </button>
      ) : (
        <button onClick={(event) => handleDisplayForm(event)}>ADD ADMIN </button>
      )}

      {state.displayForm === true && (
        <div className='form-container'>
          <div className='form-header'>
            <div className='head'>INSERT ADMIN</div>
          </div>

          <JoinPattern />

          <div className='form-container'>
            <div className='sections-container'>
              <section className='section-one'>
                <div className='profile-picture'>
                  {' '}
                  <img
                    src={profilePicturePreview || Avatar}
                    alt='profile'
                  />{' '}
                </div>
                <ImageUploader
                  fileContainerStyle={{
                    marginTop: '50px',
                    height: '50px',
                    width: '200px',
                    float: 'left',
                  }}
                  buttonStyles={{ backgroundColor: '#808080', color: '#ffff' }}
                  imgExtension={['.jpg', '.png']}
                  buttonText='Upload Picture'
                  maxFileSize={100000000}
                  onChange={onDrop}
                  withLabel={false}
                  withIcon
                />
              </section>

              <section className='section-two'>
                <form className='form-fields'>
                  <div className='attribute-container'>
                    <Input
                      type='text'
                      name='admin_username'
                      handleChange={handleChange}
                      value={state?.admin_username}
                      fieldname='Please Insert Your username'
                    />
                    <Input
                      type='text'
                      name='admin_firstname'
                      handleChange={handleChange}
                      value={state?.admin_firstname}
                      fieldname='Insert Your First Name'
                    />
                    <Input
                      type='text'
                      name='admin_lastname'
                      handleChange={handleChange}
                      value={state?.admin_lastname}
                      fieldname='Please Insert Your Last Name'
                    />

                    <Input
                      type='text'
                      name='admin_email'
                      value={state?.admin_email}
                      handleChange={handleChange}
                      fieldname='Please Insert Your Email'
                    />

                    <Input
                      type='password'
                      name='admin_password'
                      handleChange={handleChange}
                      value={state?.admin_password}
                      fieldname='Please Insert Your Password'
                    />

                    <div>
                      <p style={{ margin: '10px 00px' }}> Is Admin Active </p>
                      <label>
                        <input
                          type='checkbox'
                          checked={isAdminActiveTrue}
                          onChange={handleIsAdminActiveTrue}
                        />
                        True
                      </label>

                      <label>
                        <input
                          type='checkbox'
                          checked={isAdminActiveFalse}
                          onChange={handleIsAdminActiveFalse}
                        />
                        False
                      </label>
                    </div>

                    <div className='result-container'>
                      {state?.error !== null ? state?.error : state?.message}
                    </div>
                    <button
                      type='button'
                      disabled={state.buttonStatus}
                      onClick={(event) => handleSubmit(event)}
                    >
                      {state.loading === true ? <Loading /> : 'Save'}
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostAdmin;
