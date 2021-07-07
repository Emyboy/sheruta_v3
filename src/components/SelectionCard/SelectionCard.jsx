import React from 'react'

export default function SelectionCard({
    onSelect,
    isSelected,
    isDisabled,
    heading,
    subHeading,
    style,
    className
}) {


    return (
        <div className='col-lg-4 col-md-6'>
            <div style={style} onClick={!isDisabled ? onSelect : () => { }} className={
                `border rounded text-center mb-3 p-3 ${className} 
                 ${isSelected ? 'shadow border-success' : (isDisabled ? 'bg-gray' : 'bg-white grow link')}`
            }
            >
                {
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
                }
                <h6 style={{ fontSize: '25px' }}>{heading}</h6>
                {subHeading ? <p className='m-0'>{subHeading}</p> : null}
            </div>
        </div>
    )
}
