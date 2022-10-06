import axios from "axios";

const mthApi = axios.create({
  baseURL: "http://localhost:3009/api",
});

export const getMessageApi = () => {
  return mthApi.get("/homepage").then((res) => {
    console.log(res);
    return res.data.msg;
  });
};

export const getEndpointApi = () => {
  return mthApi.get("/").then((res) => {
    // console.log(res)
    return res;
  });
};

////  Courses Api

export const getCoursesApi = (sortBy) => {
  console.log(sortBy)
  return mthApi
    .get(`/courses`, {
      params: { sort_by: sortBy },
    })
    .then(({ data }) => {
      console.log(data)
      return data.courses;
    });
};

export const getSingleCourseApi = (course_id) => {
  return mthApi.get(`/courses/${course_id}`, {}).then(({ data }) => {
    //console.log(data)
    return data.course;
  });
};

export const patchCourseApi = (course_id, newObject) => {
  return mthApi
    .patch(`/courses/${course_id}`, {
     course_name: "New MTH GCSE Maths Foundation",
      course_id: 1,
      course_code: "MTH-GF",
      course_desc: "MTH GCSE Maths Foundation Online Course",
      course_level: "Foundation",
      course_image: "/course/mth_gcse_foundation.png",
    })
    .then((res) => {
      console.log(res.data);
      return res.data.updatedCourses;
    });
};

export const deleteCourseApi = (course_id) => {
  return mthApi.delete(`/courses/${course_id}`).then(({ data }) => {
    console.log("data",data)
    return data.course;
  });
};

export const postCourseApi = (course_id, resBody) => {
  return mthApi.post
  (`/courses/${course_id}`, resBody)
  .then(({data}) => {
    console.log(data.course)
    return data.course;
   
  });
};

////  Topic Api


export const getTopicsApi = (sortBy) => {
  console.log("sort", sortBy)
  let path = `topics`
  if(sortBy) path += `/?sort_by=${sortBy}`;
  // return mthApi.get(`/topics`, {
  //   params: { sort_by:sortBy }, 
  // })
  //console.log(path)
   return mthApi.get(path).then(({ data}) => {
     console.log("alldata",data.topics)
    return data.topics;
  });
};

export const getSingleTopicApi = (topic_id) => {
  return mthApi.get(`/topics/${topic_id}`).then((res) => {
    //console.log(res)
    return res.data.topic;
  });
};


export const deleteTopicApi = (topic_id) => {
  return mthApi.delete(`/topics/${topic_id}`).then(({ data }) => {
    console.log(data);
    return data.topic;
  });
};

//  student Api 

export const getStudentsApi = (sortBy) => {
  console.log("sort", sortBy)
  return mthApi
    .get(`/students`, {
      params: { sort_by: sortBy },
    })
    .then(({ data }) => {
      console.log(data)
      return data.students;
    });
};

export const getSingleStudentApi = (student_id) => {
  return mthApi.get(`/students/${student_id}`).then((res) => {
    //console.log(res)
    return res.data.student;
  });
};

export const patchStudentApi = (student_id, resBody) => {
  console.log(resBody)
  return mthApi.patch(`/students/${student_id}`, resBody)
  
  .then((res) => {
      console.log(res.data);
      return res.data.updatedCourses;
    });
};

export const deleteStudentApi = (student_id) => {
  return mthApi.delete(`/students/${student_id}`).then(({ data }) => {
    console.log(data);
    return data.student;
  });
};

// Tutor Api 

export const getTutorApi = (sortBy) => {
  console.log(sortBy)
  return mthApi
    .get(`/tutors`, {
      params: { sort_by: sortBy },
    })
    .then(({ data }) => {
      console.log(data)
      return data.tutors;
    });
};
export const getSingleTutorApi = (tutor_id) => {
  return mthApi.get(`/tutors/${tutor_id}`).then((res) => {
    console.log(res)
    return res.data.tutor;
  });
};


// Lesson Api 

export const getLessonApi = (sortBy) => {
 
  return mthApi
    .get(`/lessons`, {
      params: { sort_by: sortBy },
    })
    .then(({ data }) => {
      console.log(data)
      return data.lessons;
    });
};

export const getSingleLessonApi = (lesson_id) => {
  return mthApi.get(`/lessons/${lesson_id}`).then((res) => {
    console.log(res)
    return res.data.lesson;
  });
};

export const deleteLessonApi = (lesson_id) => {
  return mthApi.delete(`/lessons/${lesson_id}`).then(({ data }) => {
    console.log(data);
    return data.lesson;
  });
};


// Quiz Api 


export const getQuizApi = (sortBy) => {
 
  return mthApi
    .get(`/quizzes`, {
      params: { sort_by: sortBy },
    })
    .then(({ data }) => {
      console.log(data)
      return data.quizzes;
    });
};
export const getSingleQuizApi = (quiz_id) => {
  return mthApi.get(`/quizzes/${quiz_id}`).then((res) => {
    console.log(res)
    return res.data.quiz;
  });
};


export const deleteQuizApi = (quiz_id) => {
  return mthApi.delete(`/quizzes/${quiz_id}`).then(({ data }) => {
    console.log(data);
    return data.quiz;
  });
};
// Question Api 


export const getQuestionApi = (sortBy) => {
 
  return mthApi
    .get(`/questions`, {
      params: { sort_by: sortBy },
    })
    .then(({ data }) => {
      console.log(data)
      return data.questions;
    });
};
export const getSingleQuestionApi = (ques_id) => {
  return mthApi.get(`/questions/${ques_id}`).then((res) => {
    console.log(res)
    return res.data.question;
  });
};


export const deleteQuestionApi = (ques_id) => {
  return mthApi.delete(`/questions/${ques_id}`).then(({ data }) => {
    console.log(data);
    return data.question;
  });
};