import React from 'react';
import { Form, Col } from 'react-bootstrap';


export default ({
    as,
    controlId,
    label,
    type,
    placeholder,
    onChange,
    onBlur,
    disabled,
    defaultValue,
    name,
    autoFocus,
    icon,
    required,
    errorMessage,
    maxLength,
    test_id
}) => {
   
    return (
      <Form.Group as={as} controlId={controlId}>
        {/* <div className="form-group"> */}
        <Form.Label>
          <b className='text-muted'>{label}</b>
        </Form.Label>{" "}
        {required ? <span className="text-danger">Required *</span> : null}
        <div className={icon ? "input-with-icon" : ""}>
          <Form.Control
            data-cy={test_id}
            className={`${!icon ? 'pl-2' : ''}`}
            required={required}
            onChange={onChange ? (e) => onChange(e) : null}
            disabled={disabled}
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            maxLength={maxLength}
            name={name}
            type={type}
            placeholder={placeholder}
            onBlur={onBlur ? (e) => onBlur(e) : null}
          />
          {icon ? <i className={icon}></i> : null}
        </div>
        <span className="form-text text-danger">{errorMessage}</span>
        {/* </div> */}
      </Form.Group>
    );
}


