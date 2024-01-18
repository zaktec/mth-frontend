export const SERVER_URL = "http://localhost:9000";
export const HOME_SERVER_API = `${SERVER_URL}/api/v1/`;

// AUTHENTICATION APIs
export const INVALID_TOKEN_API = `${SERVER_URL}/api/v1/auth/verify-token`;
export const ADMIN_SIGNIN_API = `${SERVER_URL}/api/v1/auth/signin-admin`;
export const TUTOR_SIGNIN_API = `${SERVER_URL}/api/v1/auth/signin-tutor`;
export const STUDENT_SIGNIN_API = `${SERVER_URL}/api/v1/auth/signin-student`;

export const ADMIN_LOGOUT_API = `${SERVER_URL}/api/v1/auth/signout-admin`;
export const TUTOR_LOGOUT_API = `${SERVER_URL}/api/v1/auth/signout-tutor`;
export const STUDENT_LOGOUT_API = `${SERVER_URL}/api/v1/auth/signout-student`;

export const ADMIN_SIGNUP_API = `${SERVER_URL}/api/v1/auth/signup-admin`;
export const TUTOR_SIGNUP_API = `${SERVER_URL}/api/v1/auth/signup-tutor`;
export const STUDENT_SIGNUP_API = `${SERVER_URL}/api/v1/auth/signup-student`;

// TUTORS APIs
export const POST_TUTOR_API = `${SERVER_URL}/api/v1/tutors/post-tutors`;
export const EDIT_TUTOR_API = `${SERVER_URL}/api/v1/tutors/update-tutors`;
export const DELETE_TUTOR_API = `${SERVER_URL}/api/v1/tutors/delete-tutors`;
export const GET_ALL_TUTORS_API = `${SERVER_URL}/api/v1/tutors/get-tutors`;

// COURSES APIs
export const POST_COURSE_API = `${SERVER_URL}/api/v1/courses/post-courses`;
export const EDIT_COURSE_API = `${SERVER_URL}/api/v1/courses/update-courses`;
export const GET_ALL_COURSES_API = `${SERVER_URL}/api/v1/courses/get-courses`;
export const DELETE_COURSE_API = `${SERVER_URL}/api/v1/courses/delete-courses`;

// LESSONS APIs
export const POST_LESSON_API = `${SERVER_URL}/api/v1//lessons/post-lessons`;
export const EDIT_LESSON_API = `${SERVER_URL}/api/v1//lessons/update-lessons`;
export const GET_ALL_LESSONS_API = `${SERVER_URL}/api/v1//lessons/get-lessons`;
export const DELETE_LESSON_API = `${SERVER_URL}/api/v1//lessons/delete-lessons`;

// ADMINS APIs
export const EDIT_ADMIN_API = `${SERVER_URL}/api/v1/admins/update-admins`;
export const POST_ADMIN_API = `${SERVER_URL}/api/v1/admins/post-admins`;
export const DELETE_ADMIN_API = `${SERVER_URL}/api/v1/admins/delete-admins`;
export const GET_ALL_ADMINS_API = `${SERVER_URL}/api/v1/admins/get-admins`;

//STUDENTS APIs
export const POST_STUDENT_API = `${SERVER_URL}/api/v1/students/post-students`;
export const GET_ALL_STUDENTS_API = `${SERVER_URL}/api/v1/students/get-students`;
export const EDIT_STUDENTS_API = `${SERVER_URL}/api/v1/students/update-students`;
export const DELETE_STUDENTS_API = `${SERVER_URL}/api/v1/students/delete-students`;

//TOPICS APIs
export const POST_TOPIC_API = `${SERVER_URL}/api/v1/topics/post-topics`;
export const EDIT_TOPIC_API = `${SERVER_URL}/api/v1/topics/edit-topics`;
export const GET_ALL_TOPICS_API = `${SERVER_URL}/api/v1/topics/get-topics`;
export const DELETE_TOPIC_API = `${SERVER_URL}/api/v1/topics/delete-topics`;

//QUIZZEZ APIs
export const POST_QUIZ_API = `${SERVER_URL}/api/v1/quizzes/post-quizzes`;
export const EDIT_QUIZ_API = `${SERVER_URL}/api/v1/quizzes/update-quizzes`;
export const DELETE_QUIZ_API = `${SERVER_URL}/api/v1/quizzes/delete-quizzes`;
export const GET_ALL_QUIZZES_API = `${SERVER_URL}/api/v1/quizzes/get-quizzes`;

//QUESTIONS APIs
export const POST_QUESTION_API = `${SERVER_URL}/api/v1/questions/post-questions`;
export const EDIT_QUESTION_API = `${SERVER_URL}/api/v1/questions/update-questions`;
export const GET_ALL_QUESTIONS_API = `${SERVER_URL}/api/v1/questions/get-questions`;
export const DELETE_QUESTION_API = `${SERVER_URL}/api/v1/questions/delete-questions`;


//Tutor dashboard
export const TUTOR_STUDENT_API = `${SERVER_URL}/api/v1/tutors/get-tutor-students`;
export const POST_STUDENT_QUIZ_API = `${SERVER_URL}/api/v1/quizzes/post-student-quizzes`;
export const GET_STUDENT_QUIZZES_API = `${SERVER_URL}/api/v1/quizzes/get-student-quizzes`;
export const GET_QUIZ_QUESTIONS_API = `${SERVER_URL}/api/v1/questions/get-quiz-questions`;
export const POST_STUDENT_QUIZ_RESULT_API = `${SERVER_URL}/api/v1/quizzes/post-student-quiz-result`;

//Admin dashboard
export const ENDPOINTS_API = `${SERVER_URL}/api/v1/admins/endpoints`;