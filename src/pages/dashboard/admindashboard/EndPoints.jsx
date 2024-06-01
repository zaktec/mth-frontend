import React, { useState, useEffect } from "react";
import { APIsRequests } from "../../../api/APIsRequests";

const EndPoints = (props) => {
  const [state, setState] = useState({
    data: {},
    isLoading: true,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState }));
    const getEndpointApi = async (token) => {
      await APIsRequests.getEndpointApi(token)
        .then((response) => {
          console.log("kjkdjk", response?.data);
          return setState((prevState) => ({
            ...prevState,
            data: response?.data,
            isLoading: false,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getEndpointApi(props?.authData?.token);
  }, [props?.authData?.token]);

  if (state.isLoading) return <p>Loading....</p>;

  return (
    <div className="SingleMainPage">
      <h1> EndPoints </h1>
      {state.data}
    </div>
  );
};
export default EndPoints;
