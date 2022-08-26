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

export const getCoursesApi = () => {
  return mthApi
    .get(`/courses`, {
      //params: { article_topic: topic_name, sort_by },
    })
    .then(({ data }) => {
      //console.log(data)
      return data.courses;
    });
};


export const getStudentsApi = () => {
  return mthApi
    .get(`/students`, {
      //params: { article_topic: topic_name, sort_by },
    })
    .then(({ data }) => {
      //console.log(data)
      return data.students;
    });
};



export const getSingleCourseApi = (course_id) => {
  return mthApi.get(`/courses/${course_id}`, {}).then(({ data }) => {
    //console.log(data)
    return data.course;
  });
};

export const getTopicsApi = () => {
  return mthApi.get("/topics").then((res) => {
    // console.log(res)
    return res.data.topics;
  });
};

export const getSingleTopicApi = (topic_id) => {
  return mthApi.get(`/topics/${topic_id}`).then((res) => {
    //console.log(res)
    return res.data.topic;
  });
};

export const patchCourseApi = (course_id) => {
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

export const deleteTopicApi = (topic_id) => {
  return mthApi.delete(`/topics/${topic_id}`).then(({ data }) => {
    console.log(data);
    return data.topic;
  });
};

export const deleteCourseApi = (course_id) => {
  return mthApi.delete(`/courses/${course_id}`).then(({ data }) => {
    return data.course;
  });
};

export const postCourseApi = (course_id, resBody) => {
  return mthApi.post
  (`/courses/${course_id}`, resBody)
  .then(({data}) => {
    return data.course;
  });
};

//  student Api 


export const getStudents = () => {
  return mthApi.get
  (`/students`)
  .then(({data}) => {
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





