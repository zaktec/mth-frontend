import axios from "axios";

const mthApi = axios.create({
  baseURL: "http://localhost:3009/api",
});



////  homepage 


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


////  user homepage 


export const getUserMessageApi = () => {
  return mthApi.get("/userhomepage").then((res) => {
    console.log(res);
    return res.data.msg;
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
    .patch(`/courses/${course_id}`, newObject)
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

export const postCourseApi = (resBody) => {
  console.log(resBody)
  return mthApi.post(`/courses`, resBody
  )
  .then(({data}) => {
    console.log(data)
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

export const postTopicApi = (resBody) => {
  console.log(resBody)
  return mthApi.post(`/topics`, resBody
  )
  .then(({data}) => {
    return data.topic; 
  });
};

export const patchTopicApi = (topic_id, newObject) => {
  return mthApi
    .patch(`/topics/${topic_id}`, newObject)
    .then((res) => {
      console.log(res.data);
      return res.data.updatedTopics;
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
      return res.data.updatedStudents;
    });
};

export const deleteStudentApi = (student_id) => {
  return mthApi.delete(`/students/${student_id}`).then(({ data }) => {
    console.log(data);
    return data.student;
  });
};

export const postStudentApi = (resBody) => {
  console.log(resBody)
  return mthApi.post(`/students`, resBody
  )
  .then(({data}) => {
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


export const postTutorApi = (resBody) => {
  console.log(resBody)
  return mthApi.post(`/tutors`, resBody
  )
  .then(({data}) => {
    return data.tutor; 
  });
};


export const patchTutorApi = (tutor_id, resBody) => {
  console.log(resBody)
  return mthApi.patch(`/tudor/${tutor_id}`, resBody)
  
  .then((res) => {
      console.log(res.data);
      return res.data.updatedTutors;
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

export const postLessonApi = (resBody) => {
  console.log(resBody)
  return mthApi.post(`/lessons`, resBody
  )
  .then(({data}) => {
    return data.lesson; 
  });
};

export const patchLessonApi = (lesson_id, newObject) => {
  return mthApi
    .patch(`/lessons/${lesson_id}`, newObject)
    .then((res) => {
      console.log(res.data);
      return res.data.updatedLessons;
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

export const postQuizApi = (resBody) => {
  console.log(resBody)
  return mthApi.post(`/quizzes`, resBody
  )
  .then(({data}) => {
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

export const postQuestionApi = (resBody) => {
  console.log(resBody)
  return mthApi.post(`/questions`, resBody
  )
  .then(({data}) => {
    return data.question; 
  });
};
