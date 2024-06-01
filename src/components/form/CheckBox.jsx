import React from 'react'

const CheckBox = (props) => {
    return (
        <div className="checkbox">
            <input
                id="checkbox"
                type="checkbox"
                disabled={props?.disabled}
                onChange={props?.onChange}
                checked={props?.termsPolicy}
            />
            <label htmlFor="checkbox" className="check-box" />
            <span className="terms-policy"> {props?.fieldname} </span>
        </div>
    )
}

export default CheckBox