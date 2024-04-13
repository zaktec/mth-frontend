import React from "react";

const Button = (props) => {
  return (
    props?.handleSubmit ?
    <button
      type={props?.type}
      disabled={props?.disabled}
      className={props?.className}
      onClick={(event) => props?.handleSubmit(event, props?.id)}
    >
      {props?.buttonName}
    </button>
    :
    <button
      type={props?.type}
      disabled={props?.disabled}
      className={props?.className}
    >
      {props?.buttonName}
    </button>
  );
};

export default Button;
