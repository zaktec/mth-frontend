import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import Loading from "../../components/loading/Loading";
import { APIsRequests } from "../../api/APIsRequests";

const VerifyShareable = () => {
  const { pathname } = useLocation();
  const { role, session } = useParams();
  const [state] = useState({ pageLoading: true });

  useEffect(() => {
    const verifyShareableLink = async (token) => {
      await APIsRequests.getShareableLink(token)
        .then((response) => {
          const authData = response?.data?.authUser;
          const quizLink = response?.data?.studentQuiz;
          localStorage.setItem("data", JSON.stringify(authData));
          localStorage.setItem("shareableData", JSON.stringify(response?.data));
          
          const details = JSON.parse(quizLink?.studentquiz_shareable_details);
          return window.location.replace(details?.studentQuiz_shareable_link);
        })
        .catch((error) => {
          console.log("ERROR", error);
          return window.location.replace('/student/signin');
        });
    };

    verifyShareableLink(session);
  }, [role, session, pathname]);

  if (state.pageLoading === true) return <Loading pageLoading={true} />;
};

export default VerifyShareable;
