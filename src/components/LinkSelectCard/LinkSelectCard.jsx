import React from 'react';
import { Link } from 'react-router-dom';

export default ({
    onSelect,
    isSelected,
    isDisabled,
    heading,
    subHeading,
    style,
    className,
    to
}) => {


    return (
        <div style={style} onClick={!isDisabled ? onSelect : () => { }} className={
            `border rounded text-center mb-4 mt-3 p-3 ${className} 
            ${isSelected ? 'shadow border-success' : (isDisabled ? 'bg-gray' : 'bg-white grow link')}`
        }
        >
            {/* {
                isSelected ? <MdCheckBox
                    className='text-success display-6'
                    style={{
                        position: 'absolute',
                        left: '15px',
                        top: '1px'
                    }}
                /> : null
            } */}
            <Link to={to}>
                <h6 style={{ fontSize: '25px', lineHeight: '30px' }} className='text-black'>{heading}</h6>
            </Link>
            {subHeading ? <p className='m-0'>{subHeading}</p> : null}
        </div>
    )
}
