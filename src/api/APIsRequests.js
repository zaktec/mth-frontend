import axios from "axios";
import { variables } from '../helpers';

export const authAPIsRequests = {
  signinStudentTutorRequest: async (role, data) => {
    if (role === 'tutor') return await axios.post(variables.TUTOR_SIGNIN_API, data);
    if (role === 'student') return await axios.post(variables.STUDENT_SIGNIN_API, data);
    if (role === 'admin') return await axios.post(variables.ADMIN_SIGNIN_API, data);
  },

  signupStudentTutorRequest: async (role, data) => {

    if (role === 'admin') {
      const body = {
        admin_username: data.username,
        admin_firstname: "null",
        admin_lastname: "null",
        admin_email: "null",
        admin_active: false,
        admin_image: "null",
        admin_password: data.password,
      }

      return await axios.post(variables.TUTOR_SIGNUP_API, body);
    }

    if (role === 'tutor') {
      const body = {
        tutor_username: data.username,
        tutor_firstname: "null",
        tutor_lastname: "null",
        tutor_email: "null",
        tutor_active: false,
        tutor_image: "null",
        tutor_password: data.password,
      }

      return await axios.post(variables.TUTOR_SIGNUP_API, body);
    }

    if (role === 'student') {
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
        student_tutor_fk_id: 1
      };

      return await axios.post(variables.STUDENT_SIGNUP_API, body);
    }
  },

  postCourseApi: async (token, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      course_code: body.course_code,
      course_name: body.course_name,
      course_desc: body.course_desc,
      course_level: body.course_level,
      course_image: body.course_image,
    }

    return await axios.post(`${variables.ALL_COURSES_API}`, data, configs);
  },

  getCoursesApi: async (token, sortBy) => {
    const configs = { headers: { Authorization: `BEARER ${token}` }, params: { sort_by: sortBy }, };
    return await axios.get(variables.ALL_COURSES_API, configs);
  },

  getCourseApi: async (token, course_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.get(`${variables.ALL_COURSES_API}/${course_id}`, configs);
  },

  deleteCourseApi: async (token, course_id) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    return await axios.delete(`${variables.ALL_COURSES_API}/${course_id}`, configs);
  },

  editCourseApi: async (token, course_id, body) => {
    const configs = { headers: { Authorization: `BEARER ${token}` } };
    const data = {
      course_code: body.course_code,
      course_name: body.course_name,
      course_desc: body.course_desc,
      course_level: body.course_level,
      course_image: body.course_image,
    }

    return await axios.patch(`${variables.ALL_COURSES_API}/${course_id}`, data, configs);
  }
}