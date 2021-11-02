import React from 'react';
import { Form, Col } from 'react-bootstrap';


export default ({
    as,
    controlId,
    label,
    type,
    placeholder,
    onChange,
    disabled,
    defaultValue,
    name,
    autoFocus,
    icon,
    required,
    rows
}) => {
    return (
        <Form.Group as={as} controlId={controlId}>
            {/* <div className="form-group"> */}
            <Form.Label>{label}</Form.Label>
            <div className={icon ? "input-with-icon" : ""}>
                <textarea
                    required={required}
                    onChange={e => onChange(e)}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    autoFocus={autoFocus}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className="form-control h-120"
                    rows={`${rows}`}
                    style={{ height: '3rem'}}
                >

                </textarea>
                {icon ? <i className={icon}></i> : null}
            </div>
            {/* </div> */}
        </Form.Group>
    )
}


