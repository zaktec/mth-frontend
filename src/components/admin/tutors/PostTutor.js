import Input from '../../form/input';
import React, { useState } from 'react';
import Loading from '../../loading/Loading';
import ImageUploader from 'react-images-upload';
import JoinPattern from '../../patterns/joinPattern';
import Avatar from '../../../assets/images/avatar.png';
import { APIsRequests } from '../../../api/APIsRequests';


const PostTutor = (props) => {

  const [isTutorActiveTrue, setIsTutorActiveTrue] = useState(false);
  const [isTutorActiveFalse, setIsTutorActiveFalse] = useState(false);
  const [state, setState] = useState({
    tutor_image: '',
    tutor_email: '',
    tutor_lastname: '',
    tutor_username: '',
    tutor_password: '',
    tutor_firstname: '',
    tutor_active: false,

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

  
  const handleIstutorActiveTrue = () => {
    if (isTutorActiveFalse === false) {
      setIsTutorActiveTrue(!isTutorActiveTrue);
      setState((prevState) => ({ ...prevState, tutor_active: true }));
    }
  };

  const handleIstutorActiveFalse = () => {
    if (isTutorActiveTrue === false) {
      setIsTutorActiveFalse(!isTutorActiveFalse);
      setState((prevState) => ({ ...prevState, tutor_active: false }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setState((prevState) => ({
      ...prevState,
      buttonStatus: true,
      loading: true,
      error: null,
    }));

    await APIsRequests.postTutorApi(props?.authData?.token, state)
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          message: 'tutor saved successfully',
        }));

        setTimeout(() => {
          window.location.replace(`/tutorlist`);
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
      tutor_image: picture[picture.length - 1],
    }));
  };

  let profilePicturePreview = null;
  if (state?.tutor_image) {
    if (state?.tutor_image.name) {
      const getDocName = state?.tutor_image.name;
      const docLength = getDocName.length;
      const point = getDocName.lastIndexOf('.');
      const getExtensionFile = getDocName.substring(point, docLength);
      const lowCaseExtensionFile = getExtensionFile.toLowerCase();
      if (
        lowCaseExtensionFile === '.jpg' ||
        lowCaseExtensionFile === '.png' ||
        lowCaseExtensionFile === '.gif'
      ) {
        profilePicturePreview = URL.createObjectURL(state?.tutor_image);
      }
    }
  }

  return (
    <div className='PostMainPage'>
      {state?.displayForm === true ? (
        <button onClick={(event) => handleDisplayForm(event)}> NO ADD </button>
      ) : (
        <button onClick={(event) => handleDisplayForm(event)}> ADD TUTOR </button>
      )}

      {state.displayForm === true && (
        <div className='form-container'>
          <div className='form-header'>
            <div className='head'>INSERT tutor</div>
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
                      name='tutor_username'
                      handleChange={handleChange}
                      value={state?.tutor_username}
                      fieldname='Please Insert Your username'
                    />
                    <Input
                      type='text'
                      name='tutor_firstname'
                      handleChange={handleChange}
                      value={state?.tutor_firstname}
                      fieldname='Insert Your First Name'
                    />
                    <Input
                      type='text'
                      name='tutor_lastname'
                      handleChange={handleChange}
                      value={state?.tutor_lastname}
                      fieldname='Please Insert Your Last Name'
                    />

                    <Input
                      type='text'
                      name='tutor_email'
                      value={state?.tutor_email}
                      handleChange={handleChange}
                      fieldname='Please Insert Your Email'
                    />

                    <Input
                      type='password'
                      name='tutor_password'
                      handleChange={handleChange}
                      value={state?.tutor_password}
                      fieldname='Please Insert Your Password'
                    />

                    <div>
                      <p style={{ margin: '10px 00px' }}> Is tutor Active </p>
                      <label>
                        <input
                          type='checkbox'
                          checked={isTutorActiveTrue}
                          onChange={handleIstutorActiveTrue}
                        />
                        True
                      </label>

                      <label>
                        <input
                          type='checkbox'
                          checked={isTutorActiveFalse}
                          onChange={handleIstutorActiveFalse}
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

export default PostTutor;
