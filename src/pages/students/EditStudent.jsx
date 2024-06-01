import React, { useEffect, useState } from 'react';

import Input from '../../components/form/Input';
import Loading from '../../components/loading/Loading';
import ImageUploader from 'react-images-upload';
import JoinPattern from '../../components/patterns/JoinPattern';
import Avatar from '../../assets/images/avatar.png';
import { APIsRequests } from '../../api/APIsRequests';

const EditStudent = (props) => {
  const [isStudentActiveTrue, setIsStudentActiveTrue] = useState(false);
  const [isStudentActiveFalse, setIsStudentActiveFalse] = useState(false);
  const [state, setState] = useState({
    error: null,
    message: null,
    loading: false,
    displayForm: false,
    buttonStatus: false,
  });

  useEffect(() => {
    for (let objKey in props?.student)
      setState((prevState) => ({
        ...prevState,
        [objKey]: props?.student[objKey] || ''
      }));

  }, [props?.student]);

  const handleChange = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      [event.target.name]: event.target.value,
    }));
  };

  const handleIsStudentActiveTrue = () => {
    if (isStudentActiveFalse === false) {
      setIsStudentActiveTrue(!isStudentActiveTrue);
      setState((prevState) => ({ ...prevState, student_active: true }));
    }
  };

  const handleIsStudentActiveFalse = () => {
    if (isStudentActiveTrue === false) {
      setIsStudentActiveFalse(!isStudentActiveFalse);
      setState((prevState) => ({ ...prevState, student_active: false }));
    }
  };

  const handleDisplayForm = async (event) => {
    event.preventDefault();

    if (state?.student_active === true)
      setIsStudentActiveTrue(!isStudentActiveTrue);

    if (state?.student_active  === false)
      setIsStudentActiveFalse(!isStudentActiveFalse);

    if (state?.displayForm === true)
      setState((prevState) => ({ ...prevState, displayForm: false }));

    if (state?.displayForm === false)
      setState((prevState) => ({ ...prevState, displayForm: true }));
  };

  const onDrop = (picture) => {
    setState((prevState) => ({
      ...prevState,
      student_image: picture[picture.length - 1],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      loading: true,
      buttonStatus: true,
    }));

    delete state?.student_password;
    await APIsRequests.editStudentApi(props?.authData?.token, props?.student?.student_id, state)
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          message: 'student updated successfully',
        }));
        setTimeout(() => {
          window.location.replace(`/${props?.role}/get-students/${props?.student?.student_id}`);
        }, 2000);
      })
      .catch((error) => {
        return setState((prevState) => ({
          ...prevState,
          error:
            error?.error?.response?.data?.message ||
            error?.response?.data?.error,
          buttonStatus: false,
          loading: false,
        }));
      });
  };
  
  let profilePicturePreview = null;
  if (state?.student_image) {
    if (state?.student_image.name) {
      const getDocName = state?.student_image.name;
      const docLength = getDocName.length;
      const point = getDocName.lastIndexOf('.');
      const getExtensionFile = getDocName.substring(point, docLength);
      const lowCaseExtensionFile = getExtensionFile.toLowerCase();
      if (
        lowCaseExtensionFile === '.jpg' ||
        lowCaseExtensionFile === '.png' ||
        lowCaseExtensionFile === '.gif'
      ) {
        profilePicturePreview = URL.createObjectURL(state?.student_image);
      }
    }
  }

  return (
    <div className='EditMainPage'>
      { state?.displayForm === true
        ? (<button onClick={(key) => handleDisplayForm(key)}> COLLAPSE EDIT STUDENT </button>)
        : (<button onClick={(key) => handleDisplayForm(key)}> EXPAND EDIT STUDENT </button>)
      }
      {state.displayForm === true && (
        <div className='form-container'>
          <div className='form-header'>
            <div className='head'>EDIT STUDENT</div>
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
                      name='student_username'
                      handleChange={handleChange}
                      value={state?.student_username}
                      fieldname='Please Insert Your username'
                    />
                    <Input
                      type='text'
                      name='student_firstname'
                      handleChange={handleChange}
                      value={state?.student_firstname}
                      fieldname='Insert Your First Name'
                    />
                    <Input
                      type='text'
                      name='student_lastname'
                      handleChange={handleChange}
                      value={state?.student_lastname}
                      fieldname='Please Insert Your Last Name'
                    />
                    <Input
                      type='text'
                      name='student_email'
                      handleChange={handleChange}
                      value={state?.student_email}
                      fieldname='Please Insert Your Email'
                    />

                    <div>
                      <p style={{ margin: '10px 00px' }}> Is Student Active </p>
                      <label>
                        <input
                          type='checkbox'
                          checked={isStudentActiveTrue}
                          onChange={handleIsStudentActiveTrue}
                        />
                        True
                      </label>

                      <label>
                        <input
                          type='checkbox'
                          checked={isStudentActiveFalse}
                          onChange={handleIsStudentActiveFalse}
                        />
                        False
                      </label>
                    </div>

                    <Input
                      type='number'
                      name='student_grade'
                      handleChange={handleChange}
                      value={state?.student_grade}
                      fieldname='Please Insert Your Grade'
                    />
                    <Input
                      type='number'
                      name='student_targetgrade'
                      handleChange={handleChange}
                      value={state?.student_targetgrade}
                      fieldname='Please Insert Your Target grade'
                    />
                    <Input
                      type='number'
                      name='student_progressbar'
                      handleChange={handleChange}
                      value={state?.student_progressbar}
                      fieldname='Please Insert Your Progressbar'
                    />
                    <Input
                      type='text'
                      name='student_notes'
                      handleChange={handleChange}
                      value={state?.student_notes}
                      fieldname='Please Insert Your Student Notes'
                    />
                    <Input
                      type='text'
                      name='student_image'
                      handleChange={handleChange}
                      value={state?.student_image}
                      fieldname='Please Insert Your Student Image'
                    />
                    <Input
                      type='number'
                      name='student_message_count'
                      handleChange={handleChange}
                      value={state?.student_message_count}
                      fieldname='Please Insert Your Message Count'
                    />
                    <Input
                      type='text'
                      name='student_message_input'
                      handleChange={handleChange}
                      value={state?.student_message_input}
                      fieldname='Please Insert Your Message Input'
                    />
                    <Input
                      type='text'
                      handleChange={handleChange}
                      name='student_message_output'
                      value={state?.student_message_output}
                      fieldname='Please Insert Your Message Output'
                    />
                    <div className='result-container'>
                      {' '}
                      {state?.error !== null
                        ? state?.error
                        : state?.message}{' '}
                    </div>
                    <button
                      type='submit'
                      disabled={state.buttonStatus}
                      onClick={(event) => handleSubmit(event)}
                    >
                      {state.loading === true ? <Loading /> : 'Update'}
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

export default EditStudent;
