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
    return data.topics;
  });
};

export const deleteCourseApi = (course_id) => {
  return mthApi.delete(`/courses/${course_id}`).then(({ data }) => {
    return data.topics;
  });
};

// export const postCommentApi = (article_id, resBody) => {
//   return newsApi.post
//   (`/articles/${article_id}/comments`, resBody)
//   .then(({data}) => {
//     return data.comments;
//   });

// export const getCommentApi = (article_id) => {
//   return newsApi.get(`/articles/${article_id}/comments`).then(({data}) => {
//       //console.log(data)
//     return data.comments;
//   });
// };

// //"DELETE /api/comments/:comment_id"