import React from 'react';
import { func, bool, string } from 'prop-types';

const Btn = ({
    text,
    loading,
    className,
    disabled,
    onClick,
    danger,
    type,
    icon
}) => {
    return (
        <button
            className={` ${danger ? 'btn-danger' : 'bg-theme'} btn rounded text-white ${className ? className : ''}`}
            disabled={disabled || loading}
            onClick={onClick}
            type={type}
            style={{ fontSize: '17px' }}
        >
            {loading ? "Loading..." : <><i className={icon}></i>  {text}</>}
        </button>
    )
}

Btn.propTypes = {
    text: func.isRequired,
    loading: bool,
    className: string,
    disabled: bool,
    onClick: func.isRequired,
    danger: bool,
    type: string
}

export default Btn;
