import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Input from "../../components/form/Input";
import Loading from "../../components/loading/Loading";
import { APIsRequests } from "../../api/APIsRequests";

const EditLesson = (props) => {
  const [state, setState] = useState({
    error: null,
    message: null,
    loading: false,
    displayForm: false,
    buttonStatus: false,
  });

  useEffect(() => {
    for (let objKey in props?.lesson)
      setState((prevState) => ({
        ...prevState,
        [objKey]: props?.lesson[objKey],
      }));
  }, [props?.lesson]);

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

    await APIsRequests.editLessonApi(
      props?.authData?.token,
      props?.lesson?.lesson_id,
      state
    )
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          message: "lesson updated successfully",
        }));
        toast.success('Course updated successfully');
        setTimeout(() => {
          window.location.replace(
            `/${props?.role}/lessons/${props?.lesson?.lesson_id}`
          );
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
  const handleDisplayForm = async (event) => {
    event.preventDefault();
    if (state.displayForm === true)
      return setState((prevState) => ({ ...prevState, displayForm: false }));
    if (state.displayForm === false)
      return setState((prevState) => ({ ...prevState, displayForm: true }));
  };

  return (
    <>
      <ToastContainer />
      <div className="EditMainPage">
        { state?.displayForm === true
          ? (<button onClick={(key) => handleDisplayForm(key)}> COLLAPSE EDIT LESSON </button>)
          : (<button onClick={(key) => handleDisplayForm(key)}> EXPAND EDIT LESSON </button>)
        }
        {state.displayForm === true && (
          <div className="form-container">
            <div className="form-header">
              <div className="head">EDIT LESSON</div>
            </div>

            <div className="form-container">
              <div className="sections-container">
                <section className="section-two">
                  <form className="form-fields">
                    <div className="attribute-container">
                      <Input
                        fieldname="Please Insert Your lesson Name"
                        type="text"
                        name="lesson_name"
                        value={state?.lesson_name}
                        handleChange={handleChange}
                      />
                      <Input
                        fieldname="Please Insert Your lesson Code "
                        type="text"
                        name="lesson_code"
                        value={state?.lesson_code}
                        handleChange={handleChange}
                      />
                      <Input
                        fieldname="Please Insert Your lesson topic"
                        type="text"
                        name="lesson_topic"
                        value={state?.lesson_topic}
                        handleChange={handleChange}
                      />

                      <Input
                        fieldname="Please Insert Your lesson Description"
                        type="text"
                        name="lesson_desc"
                        value={state?.lesson_desc}
                        handleChange={handleChange}
                      />

                      <Input
                        fieldname="Please Insert Your lesson body"
                        type="text"
                        name="lesson_body"
                        value={state?.lesson_body}
                        handleChange={handleChange}
                      />

                      <Input
                        fieldname="Please Insert Your lesson topic id"
                        type="number"
                        name="lesson_topic_fk_id"
                        value={state?.lesson_topic_fk_id}
                        handleChange={handleChange}
                      />

                      <Input
                        fieldname="Please Insert Your grade"
                        type="number"
                        name="lesson_grade"
                        value={state?.lesson_grade}
                        handleChange={handleChange}
                      />

                      <div>
                        {state?.error !== null ? state?.error : state?.message}{" "}
                      </div>
                      <div style={{ margin: "10px 00px" }}>
                        <button
                          disabled={state.buttonStatus}
                          onClick={(key) =>
                            handleSubmit(
                              key,
                              props?.token,
                              props?.lesson?.lesson_id
                            )
                          }
                          type="submit"
                        >
                          { state.loading === true ? <Loading buttonLoading={true} /> : "Update" }
                        </button>
                      </div>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default EditLesson;
