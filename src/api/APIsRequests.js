import axios from "axios";
import { variables } from "../helpers";

export const APIsRequests = {
  getHomeServerMsgApi: async () => {
    return await axios.get(variables.HOME_SERVER_API);
  },

  signinStudentTutorAdminRequest: async (role, data) => {
    if (role === "tutor")
      return await axios.post(variables.TUTOR_SIGNIN_API, data);
    if (role === "student")
      return await axios.post(variables.STUDENT_SIGNIN_API, data);
    if (role === "admin")
      return await axios.post(variables.ADMIN_SIGNIN_API, data);
  },

  singoutAdminRequest: async (token) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(variables.ADMIN_LOGOUT_API, configs);
  },

  singoutTutorRequest: async (token) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(variables.TUTOR_LOGOUT_API, configs);
  },

  singoutStudentRequest: async (token) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(variables.STUDENT_LOGOUT_API, configs);
  },

  signupStudentTutorAdminRequest: async (role, data) => {
    if (role === "admin") {
      const body = {
        admin_username: data.username,
        admin_firstname: "null",
        admin_lastname: "null",
        admin_email: "null",
        admin_active: false,
        admin_image: "null",
        admin_password: data.password,
      };

      return await axios.post(variables.TUTOR_SIGNUP_API, body);
    }

    if (role === "tutor") {
      const body = {
        tutor_username: data.username,
        tutor_firstname: "null",
        tutor_lastname: "null",
        tutor_email: "null",
        tutor_active: false,
        tutor_image: "null",
        tutor_password: data.password,
      };

      return await axios.post(variables.TUTOR_SIGNUP_API, body);
    }

    if (role === "student") {
      const body = {
        student_grade: 0,
        student_targetgrade: 0,
        student_progressbar: 0,
        student_username: data.username,
        student_firstname: "null",
        student_lastname: "null",
        student_email: "null",
        student_password: data.password,
        student_active: false,
        student_image: "null",
        student_notes: "null",
        student_tutor_fk_id: 1,
      };

      return await axios.post(variables.STUDENT_SIGNUP_API, body);
    }
  },

  //  Lesson Api
  postLessonApi: async (token, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      lesson_topic: body.lesson_topic,
      lesson_name: body.lesson_name,
      lesson_code: body.lesson_code,
      lesson_desc: body.lesson_desc,
      lesson_grade: body.lesson_grade,
      lesson_body: body.lesson_body,
      lesson_topic_fk_id: body.lesson_topic_fk_id,
    };

    return await axios.post(`${variables.POST_LESSON_API}`, data, configs);
  },

  getLessonsApi: async (token, sortBy) => {
    const config = {
      headers: { Authorization: `BEARER ${token}` },
      params: { sort_by: sortBy },
    };
    return await axios.get(variables.GET_ALL_LESSONS_API, config);
  },

  getLessonApi: async (token, lesson_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.get(
      `${variables.GET_ALL_LESSONS_API}/${lesson_id}`,
      configs
    );
  },

  deleteLessonApi: async (token, lesson_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(
      `${variables.DELETE_LESSON_API}/${lesson_id}`,
      configs
    );
  },

  editLessonApi: async (token, lesson_id, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      lesson_topic: body.lesson_topic,
      lesson_name: body.lesson_name,
      lesson_code: body.lesson_code,
      lesson_desc: body.lesson_desc,
      lesson_grade: body.lesson_grade,
      lesson_body: body.lesson_body,
      lesson_topic_fk_id: body.lesson_topic_fk_id,
    };
    return await axios.patch(
      `${variables.EDIT_LESSON_API}/${lesson_id}`,
      data,
      configs
    );
  },

  //  Course Api
  postCourseApi: async (token, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      course_code: body.course_code,
      course_name: body.course_name,
      course_desc: body.course_desc,
      course_level: body.course_level,
      course_image: body.course_image,
    };

    return await axios.post(`${variables.POST_COURSE_API}`, data, configs);
  },

  getCoursesApi: async (token, sortBy) => {
    const configs = {
      headers: { Authorization: `BEARER ${token}` },
      params: { sort_by: sortBy },
    };
    return await axios.get(variables.GET_ALL_COURSES_API, configs);
  },

  getCourseApi: async (token, course_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.get(
      `${variables.GET_ALL_COURSES_API}/${course_id}`,
      configs
    );
  },

  deleteCourseApi: async (token, course_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(
      `${variables.DELETE_COURSE_API}/${course_id}`,
      configs
    );
  },

  editCourseApi: async (token, course_id, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      course_code: body.course_code,
      course_name: body.course_name,
      course_desc: body.course_desc,
      course_level: body.course_level,
      course_image: body.course_image,
    };

    return await axios.patch(
      `${variables.EDIT_COURSE_API}/${course_id}`,
      data,
      configs
    );
  },

  //  Student Api
  postStudentApi: async (token, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      student_username: body.student_username,
      student_firstname: body.student_firstname,
      student_lastname: body.student_lastname,
      student_email: body.student_email,
      student_password: body.student_password,
      student_active: body.student_active,
      student_grade: body.student_grade,
      student_targetgrade: body.student_targetgrade,
      student_progressbar: body.student_progressbar,
      student_notes: body.student_notes,
      student_image: body.student_image,
      student_msg_count: body.student_msg_count,
      student_msg_input: body.student_msg_input,
      student_msg_output: body.student_msg_output,
      student_course_fk_id: body.student_course_fk_id,
      student_tutor_fk_id: body.student_tutor_fk_id,
    };

    return await axios.post(`${variables.POST_STUDENT_API}`, data, configs);
  },

  getStudentsApi: async (token, sortBy) => {
    const config = {
      headers: { Authorization: `BEARER ${token}` },
      params: { sort_by: sortBy },
    };
    return await axios.get(variables.GET_ALL_STUDENTS_API, config);
  },

  getStudentApi: async (token, student_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.get(
      `${variables.GET_ALL_STUDENTS_API}/${student_id}`,
      configs
    );
  },

  deleteStudentApi: async (token, student_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(
      `${variables.DELETE_STUDENTS_API}/${student_id}`,
      configs
    );
  },

  editStudentApi: async (token, student_id, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      student_username: body.student_username,
      student_firstname: body.student_firstname,
      student_lastname: body.student_lastname,
      student_email: body.student_email,
      student_password: body.student_password,
      student_active: body.student_active,
      student_grade: body.student_grade,
      student_targetgrade: body.student_targetgrade,
      student_progressbar: body.student_progressbar,
      student_notes: body.student_notes,
      student_image: body.student_image,
      student_msg_count: body.student_msg_count,
      student_msg_input: body.student_msg_input,
      student_msg_output: body.student_msg_output,
      student_course_fk_id: body.student_course_fk_id,
      student_tutor_fk_id: body.student_tutor_fk_id,
    };
    return await axios.patch(
      `${variables.EDIT_STUDENTS_API}/${student_id}`,
      data,
      configs
    );
  },

  //  Admin Api
  postAdminApi: async (token, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      admin_email: body.admin_email,
      admin_active: body.admin_active,
      admin_password: body.admin_password,
      admin_lastname: body.admin_lastname,
      admin_username: body.admin_username,
      admin_firstname: body.admin_firstname,
      admin_image: JSON.stringify(body.admin_image),
    };

    return await axios.post(`${variables.POST_ADMIN_API}`, data, configs);
  },

  getAdminsApi: async (token, sortBy) => {
    const config = {
      headers: { Authorization: `BEARER ${token}` },
      params: { sort_by: sortBy },
    };
    return await axios.get(variables.GET_ALL_ADMINS_API, config);
  },

  getAdminApi: async (token, admin_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.get(
      `${variables.GET_ALL_ADMINS_API}/${admin_id}`,
      configs
    );
  },

  deleteAdminApi: async (token, admin_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(
      `${variables.DELETE_ADMIN_API}/${admin_id}`,
      configs
    );
  },

  editAdminApi: async (token, admin_id, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      admin_username: body.admin_username,
      admin_firstname: body.admin_firstname,
      admin_lastname: body.admin_lastname,
      admin_email: body.admin_email,
      admin_password: body.admin_password,
      admin_active: body.admin_active,
      admin_image: body.admin_image,
    };
    return await axios.patch(
      `${variables.EDIT_ADMIN_API}/${admin_id}`,
      data,
      configs
    );
  },

  //  Tutor Api
  postTutorApi: async (token, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      tutor_email: body.tutor_email,
      tutor_active: body.tutor_active,
      tutor_password: body.tutor_password,
      tutor_lastname: body.tutor_lastname,
      tutor_username: body.tutor_username,
      tutor_firstname: body.tutor_firstname,
      tutor_image: JSON.stringify(body.tutor_image),
    };

    return await axios.post(`${variables.POST_TUTOR_API}`, data, configs);
  },

  getTutorsApi: async (token, sortBy) => {
    const config = {
      headers: { Authorization: `BEARER ${token}` },
      params: { sort_by: sortBy },
    };
    return await axios.get(variables.GET_ALL_TUTORS_API, config);
  },

  getTutorApi: async (token, tutor_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.get(
      `${variables.GET_ALL_TUTORS_API}/${tutor_id}`,
      configs
    );
  },

  deleteTutorApi: async (token, tutor_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(
      `${variables.DELETE_TUTOR_API}/${tutor_id}`,
      configs
    );
  },

  editTutorApi: async (token, tutor_id, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      tutor_username: body.tutor_username,
      tutor_firstname: body.tutor_firstname,
      tutor_lastname: body.tutor_lastname,
      tutor_email: body.tutor_email,
      tutor_password: body.tutor_password,
      tutor_active: body.tutor_active,
      tutor_image: JSON.stringify(body.tutor_image),
    };
    return await axios.patch(
      `${variables.EDIT_TUTOR_API}/${tutor_id}`,
      data,
      configs
    );
  },

  //  Topic Api
  postTopicApi: async (token, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      topic_email: body.topic_email,
      topic_active: body.topic_active,
      topic_password: body.topic_password,
      topic_lastname: body.topic_lastname,
      topic_username: body.topic_username,
      topic_firstname: body.topic_firstname,
      topic_image: JSON.stringify(body.topic_image),
    };

    return await axios.post(`${variables.POST_TOPIC_API}`, data, configs);
  },

  getTopicsApi: async (token, sortBy) => {
    const config = {
      headers: { Authorization: `BEARER ${token}` },
      params: { sort_by: sortBy },
    };
    console.log(config);
    return await axios.get(variables.GET_ALL_TOPICS_API, config);
  },

  getTopicApi: async (token, topic_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.get(
      `${variables.GET_ALL_TOPICS_API}/${topic_id}`,
      configs
    );
  },

  deleteTopicApi: async (token, topic_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(
      `${variables.DELETE_TOPIC_API}/${topic_id}`,
      configs
    );
  },

  editTopicApi: async (token, topic_id, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      topic_username: body.topic_username,
      topic_firstname: body.topic_firstname,
      topic_lastname: body.topic_lastname,
      topic_email: body.topic_email,
      topic_password: body.topic_password,
      topic_active: body.topic_active,
      topic_image: body.topic_image,
    };
    return await axios.patch(
      `${variables.EDIT_TOPIC_API}/${topic_id}`,
      data,
      configs
    );
  },

  //  Quiz Api
  postQuizApi: async (token, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      quiz_email: body.quiz_email,
      quiz_active: body.quiz_active,
      quiz_password: body.quiz_password,
      quiz_lastname: body.quiz_lastname,
      quiz_username: body.quiz_username,
      quiz_firstname: body.quiz_firstname,
      quiz_image: JSON.stringify(body.quiz_image),
    };

    return await axios.post(`${variables.POST_QUIZ_API}`, data, configs);
  },

  getQuizzesApi: async (token, sortBy) => {
    const config = {
      headers: { Authorization: `BEARER ${token}` },
      params: { sort_by: sortBy },
    };
    console.log(config);
    return await axios.get(variables.GET_ALL_QUIZZES_API, config);
  },

  getQuizApi: async (token, quiz_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.get(
      `${variables.GET_ALL_QUIZZES_API}/${quiz_id}`,
      configs
    );
  },

  deleteQuizApi: async (token, quiz_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(
      `${variables.DELETE_QUIZ_API}/${quiz_id}`,
      configs
    );
  },

  editQuizApi: async (token, quiz_id, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      quiz_username: body.quiz_username,
      quiz_firstname: body.quiz_firstname,
      quiz_lastname: body.quiz_lastname,
      quiz_email: body.quiz_email,
      quiz_password: body.quiz_password,
      quiz_active: body.quiz_active,
      quiz_image: body.quiz_image,
    };
    return await axios.patch(
      `${variables.EDIT_QUIZ_API}/${quiz_id}`,
      data,
      configs
    );
  },

  //  Question Api
  postQuestionApi: async (token, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      question_email: body.question_email,
      question_active: body.question_active,
      question_password: body.question_password,
      question_lastname: body.question_lastname,
      question_username: body.question_username,
      question_firstname: body.question_firstname,
      question_image: JSON.stringify(body.question_image),
    };

    return await axios.post(`${variables.POST_QUESTION_API}`, data, configs);
  },

  getQuestionsApi: async (token, sortBy) => {
    const config = {
      headers: { Authorization: `BEARER ${token}` },
      params: { sort_by: sortBy },
    };
    console.log(config);
    return await axios.get(variables.GET_ALL_QUESTIONS_API, config);
  },

  getQuestionApi: async (token, question_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.get(
      `${variables.GET_ALL_QUESTIONS_API}/${question_id}`,
      configs
    );
  },

  deleteQuestionApi: async (token, question_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(
      `${variables.DELETE_QUESTION_API}/${question_id}`,
      configs
    );
  },

  editQuestionApi: async (token, question_id, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      question_username: body.question_username,
      question_firstname: body.question_firstname,
      question_lastname: body.question_lastname,
      question_email: body.question_email,
      question_password: body.question_password,
      question_active: body.question_active,
      question_image: body.question_image,
    };
    return await axios.patch(
      `${variables.EDIT_QUESTION_API}/${question_id}`,
      data,
      configs
    );
  },

//Tutor Dashboard-----------


getTutorStudentsApi: async (token) => {
  const config = {
    headers: { Authorization: `BEARER ${token}` },

  };
  console.log(config);
  return await axios.get(variables.TUTOR_STUDENT_API, config);
},


};
