import axios from "axios";
import { variables } from '../helpers';

export const authAPIsRequests = {
  signinStudentTutorRequest: async (role, data) => {
    if (role === 'tutor') return await axios.post(variables.TUTOR_SIGNIN_API, data);
    if (role === 'student') return await axios.post(variables.STUDENT_SIGNIN_API, data);
  },

  signupStudentTutorRequest: async (role, data) => {
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
  }
}
