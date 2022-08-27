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
  return mthApi
    .get(`/courses`, {
      params: { sortBy },
    })
    .then(({ data }) => {
      //console.log(data)
      return data.courses;
    });
};

export const getSingleCourseApi = (course_id) => {
  return mthApi.get(`/courses/${course_id}`, {}).then(({ data }) => {
    //console.log(data)
    return data.course;
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

////  Topic Api


export const getTopicsApi = (sortBy) => {
  return mthApi.get(`/topics`, {
    params: { sortBy }, 
  })
    .then(({ data}) => {
    // console.log(res)
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
  return mthApi
    .get(`/students`, {
      params: { sortBy },
    })
    .then(({ data }) => {
      //console.log(data)
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





