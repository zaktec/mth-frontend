import axios from "axios";
import { variables } from "../helpers";

export const authAPIsRequests = {
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

  ////  Lesson Api
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

    return await axios.post(`${variables.ALL_LESSONS_API}`, data, configs);
  },

  getLessonsApi: async (token, sortBy) => {
    const config = {
      headers: { Authorization: `BEARER ${token}` },
      params: { sort_by: sortBy },
    };
    return await axios.get(variables.ALL_LESSONS_API, config);
  },

  getLessonApi: async (token, lesson_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.get(
      `${variables.ALL_LESSONS_API}/${lesson_id}`,
      configs
    );
  },

  deleteLessonApi: async (token, lesson_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(
      `${variables.ALL_LESSONS_API}/${lesson_id}`,
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
      `${variables.ALL_LESSONS_API}/${lesson_id}`,
      data,
      configs
    );
  },

  ////  Course Api
  postCourseApi: async (token, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      course_code: body.course_code,
      course_name: body.course_name,
      course_desc: body.course_desc,
      course_level: body.course_level,
      course_image: body.course_image,
    };

    return await axios.post(`${variables.ALL_COURSES_API}`, data, configs);
  },

  getCoursesApi: async (token, sortBy) => {
    const configs = {
      headers: { Authorization: `BEARER ${token}` },
      params: { sort_by: sortBy },
    };
    return await axios.get(variables.ALL_COURSES_API, configs);
  },

  getCourseApi: async (token, course_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.get(
      `${variables.ALL_COURSES_API}/${course_id}`,
      configs
    );
  },

  deleteCourseApi: async (token, course_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(
      `${variables.ALL_COURSES_API}/${course_id}`,
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
      `${variables.ALL_COURSES_API}/${course_id}`,
      data,
      configs
    );
  },

  ////  Student Api
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

    return await axios.post(`${variables.ALL_STUDENTS_API}`, data, configs);
  },

  getStudentsApi: async (token, sortBy) => {
    const config = {
      headers: { Authorization: `BEARER ${token}` },
      params: { sort_by: sortBy },
    };
    return await axios.get(variables.ALL_STUDENTS_API, config);
  },

  getStudentApi: async (token, student_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.get(
      `${variables.ALL_STUDENTS_API}/${student_id}`,
      configs
    );
  },

  deleteStudentApi: async (token, student_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(
      `${variables.ALL_LESSONS_API}/${student_id}`,
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
      `${variables.ALL_STUDENTS_API}/${student_id}`,
      data,
      configs
    );
  },

  ////  Admin Api
  postAdminApi: async (token, body) => {
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

    return await axios.post(`${variables.ALL_ADMINS_API}`, data, configs);
  },

  getAdminsApi: async (token, sortBy) => {
    const config = {
      headers: { Authorization: `BEARER ${token}` },
      params: { sort_by: sortBy },
    };
    return await axios.get(variables.ALL_ADMINS_API, config);
  },

  getAdminApi: async (token, admin_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.get(`${variables.ALL_ADMINS_API}/${admin_id}`, configs);
  },

  deleteAdminApi: async (token, admin_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(
      `${variables.ALL_ADMINS_API}/${admin_id}`,
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
      `${variables.ALL_ADMINS_API}/${admin_id}`,
      data,
      configs
    );
  },
};
