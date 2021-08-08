import React from 'react';
import { MdCheckBox } from 'react-icons/md'

export default React.memo(({
    onSelect,
    isSelected,
    isDisabled,
    heading,
    subHeading,
    style,
    className
}) => {


    return (
        <div className='col-lg-4 col-md-6'>
            <div style={style} onClick={!isDisabled ? onSelect : () => { }} className={
                `border rounded text-center mb-3 p-3 ${className} 
                 ${isSelected ? 'shadow border-success' : (isDisabled ? 'bg-gray' : 'bg-white grow link')}`
            }
            >
                {
                    isSelected ? <MdCheckBox
                    className='text-success display-6'
                        style={{
                            position: 'absolute',
                            left: '15px',
                            top: '1px'
                        }}
                     /> : null
                }
                {/* {
                    isSelected ? <img
                        style={{
                            position: 'absolute',
                            left: '10px',
                            top: '-4px'
                        }}
                        width='30'
                        alt='check box'
                        src={'https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/green-checkmark.png'}
                    /> : null
                } */}
                <h6 style={{ fontSize: '25px', lineHeight: '30px' }}>{heading}</h6>
                {subHeading ? <p className='m-0'>{subHeading}</p> : null}
            </div>
        </div>
    )
});
