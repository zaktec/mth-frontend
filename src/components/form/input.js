import React from "react";
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Input = (props) => {
  return (
    <>
      <p style={{ margin: "10px 0" }}>{props?.fieldname}</p>
      <div style={ { position: 'relative'} }>
        <input
          type={props?.type}
          name={props?.name}
          value={props?.value}
          placeholder={props?.placeholder}
          className='form__input input-field'
          onChange={(name) => props?.handleChange(name)}
        />
        { props?.icon !== undefined &&  props?.icon === true && props?.displayKeyboard === true
          &&  <div className='input-icon'>
                <FontAwesomeIcon size='lg' icon={faKeyboard} className='rotate-icon' onClick={() => props?.handleDisplayKeyboard()} />
              </div>
        }

        {
          props?.icon !== undefined &&  props?.icon === true && props?.displayKeyboard === false
          &&  <div className='input-icon'>
                <FontAwesomeIcon size='lg' icon={faKeyboard} onClick={() => props?.handleDisplayKeyboard()} />
              </div>
        }
      </div>
    </>
  );
};

export default Input;
