import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Input from '../../components/form/Input';
import Loading from '../../components/loading/Loading';
import ImageUploader from 'react-images-upload';
import JoinPattern from '../../components/patterns/JoinPattern';
import Avatar from '../../assets/images/avatar.png';
import { APIsRequests } from '../../api/APIsRequests';

const EditCourse = (props) => {
  const [state, setState] = useState({
    error: null,
    loading: false,
    displayForm: false,
    buttonStatus: false,
  });

  useEffect(() => {
    for (let objKey in props?.course)
      setState((prevState) => ({
        ...prevState,
        [objKey]: props?.course[objKey],
      }));
  }, [props?.course]);

  const handleChange = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: null,
      [event.target.name]: event.target.value,
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

    await APIsRequests
      .editCourseApi(props?.authData?.token, props?.course?.course_id, state)
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          message: 'course updated successfully',
        }));

        toast.success('Course updated successfully');
        setTimeout(() => {
          window.location.replace(`/${props?.role}/courses/${props?.course?.course_id}`);
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
      course_image: picture[picture.length - 1],
    }));
  };

  let profilePicturePreview = null;
  if (state?.coourse_image) {
    if (state?.admin_image.name) {
      const getDocName = state?.course_image.name;
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
    <>
      <ToastContainer />
      <div className='EditMainPage'>
        { state?.displayForm === true
          ? (<button onClick={(key) => handleDisplayForm(key)}> COLLAPSE EDIT COURSE </button>)
          : (<button onClick={(key) => handleDisplayForm(key)}> EXPAND EDIT COURSE </button>)
        }

        {state.displayForm === true && (
          <div className='form-container'>
            <div className='form-header'>
              <div className='head'>EDIT COURSE</div>
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
                        <div>
                          <Input
                            type='text'
                            name='course_code'
                            value={state?.course_code}
                            handleChange={handleChange}
                            fieldname='Please Insert Your course Code'
                          />

                          <Input
                            type='text'
                            name='course_name'
                            value={state?.course_name}
                            handleChange={handleChange}
                            fieldname='Please Insert Your course Name'
                          />
                          <Input
                            type='text'
                            name='course_desc'
                            value={state?.course_desc}
                            handleChange={handleChange}
                            fieldname='Please Insert Your Course Description'
                          />
                          <Input
                            type='text'
                            name='course_level'
                            value={state?.course_level}
                            handleChange={handleChange}
                            fieldname='Please Insert Your Course Level'
                          />
                          <div className='result-container'>
                            {state?.error !== null
                              ? state?.error
                              : state?.message}
                          </div>
                          <button
                            type='button'
                            disabled={state.buttonStatus}
                            onClick={(event) => handleSubmit(event)
                            }
                          >
                            {state.loading === true ? <Loading /> : 'Update'}
                          </button>
                        </div>
                      </div>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditCourse;
