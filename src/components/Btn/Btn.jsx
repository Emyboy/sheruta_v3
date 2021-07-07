import React from 'react';
import { func, bool, string } from 'prop-types';
import { Spinner } from 'react-activity'

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
            className={`${className || ''} ` + `btn rounded ${danger ? 'btn-danger' : 'bg-theme'} text-white`}
            disabled={disabled || loading}
            onClick={onClick}
            type={type}
            style={{ fontSize: '20px' }}
        >
            {loading ? <Spinner color='white' /> : <><i className={icon}></i>  {text}</>}
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
