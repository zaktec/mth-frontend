import React from "react";
import { Circles } from "react-loader-spinner";

const Loading = (props) => {
  if (props.pageLoading)
    return (
      <div className="main-loading">
        <Circles
          width="150"
          height="150"
          visible={true}
          color="#535353"
          wrapperStyle={{ justifyContent: "center", color: "#535353" }}
        />
      </div>
    );

  return (
    <Circles
      width="30"
      height="30"
      visible={true}
      color="#ffffff"
      wrapperStyle={{ justifyContent: "center", color: "#ffffff" }}
    />
  );
};

export default Loading;
