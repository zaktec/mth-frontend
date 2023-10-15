import React from "react";

const Input = (props) => {
  return (
    <div>
      
      <p style={{ margin: "10px 00px" }}>{props?.fieldname} </p>
      <input className='form__input' 
        type={props?.type}
        name={props?.name}
        value={props?.value}
        onChange={(name) => props?.handleChange(name)}
      />
    </div>
  );
};
export default Input;
