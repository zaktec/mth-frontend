import React from "react";

const TrInput = (props) => {
  return props?.labelValue === undefined ? (
    <tr>
      <td className={props?.labelClassName}> {props?.label} </td>
      <td>
        <input
          type={props?.tupe}
          name={props?.name}
          value={props?.value}
          required={props?.required}
          onChange={props?.onChange}
        />
      </td>
    </tr>
  ) : (
    <tr>
      <td className={props?.labelClassName}> {props?.label} </td>
      <td className={props?.labelValueClassName}> {props?.labelValue} </td>
    </tr>
  );
};

export default TrInput;
