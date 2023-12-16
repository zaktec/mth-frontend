import React, { useEffect, useState } from 'react';

import Input from '../form/input';
import Loading from '../loading/Loading';
import ImageUploader from 'react-images-upload';
import JoinPattern from '../patterns/joinPattern';
import Avatar from '../../assets/images/avatar.png';
import { APIsRequests } from '../../api/APIsRequests';

const EditAdmin = (props) => {
  const [isAdminActiveTrue, setIsAdminActiveTrue] = useState(false);
  const [isAdminActiveFalse, setIsAdminActiveFalse] = useState(false);
  const [state, setState] = useState({
    error: null,
    message: null,
    loading: false,
    displayForm: false,
    buttonStatus: false,
  });

  useEffect(() => {
    for (let objKey in props?.admin)
      setState((prevState) => ({
        ...prevState,
        [objKey]: props?.admin[objKey] || '',
      }));
  }, [props?.admin]);

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

  const handleDisplayForm = async (event) => {
    event.preventDefault();

    if (state?.admin_active === true)
      setIsAdminActiveTrue(!isAdminActiveTrue);

    if (state?.admin_active  === false)
      setIsAdminActiveFalse(!isAdminActiveFalse);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      buttonStatus: true,
      loading: true,
      error: null,
    }));

    await APIsRequests.editAdminApi(props?.authData?.token, props?.admin?.admin_id, state)
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          message: 'Admin updated successfully',
        }));
        setTimeout(() => {
          window.location.replace(`/${props?.role}/get-admins/${props?.admin?.admin_id}`);
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
    <div className='EditMainPage'>
      {state?.displayForm === true ? (
        <button onClick={(key) => handleDisplayForm(key)}> NO EDIT </button>
      ) : (
        <button onClick={(key) => handleDisplayForm(key)}>EDIT ADMIN </button>
      )}
      {state.displayForm === true && (
        <div className='form-container'>
          <div className='form-header'>
            <div className='head'>Edit ADMIN</div>
          </div>

          <JoinPattern />

          <div className='form-container'>
            <div className='sections-container'>
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
                    buttonStyles={{
                      backgroundColor: '#808080',
                      color: '#ffff',
                    }}
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
                        value={state?.admin_username}
                        handleChange={handleChange}
                        fieldname='Please Insert Your username'
                      />
                      <Input
                        type='text'
                        name='admin_firstname'
                        value={state?.admin_firstname}
                        handleChange={handleChange}
                        fieldname='Insert Your First Name'
                      />
                      <Input
                        type='text'
                        name='admin_lastname'
                        value={state?.admin_lastname}
                        handleChange={handleChange}
                        fieldname='Please Insert Your Last Name'
                      />

                      <Input
                        type='text'
                        name='admin_email'
                        value={state?.admin_email}
                        handleChange={handleChange}
                        fieldname='Please Insert Your Email'
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
                        disabled={state.buttonStatus}
                        type='button'
                        onClick={(key) => handleSubmit(key)}
                      >
                        {state.loading === true ? <Loading /> : 'Update'}
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAdmin;
