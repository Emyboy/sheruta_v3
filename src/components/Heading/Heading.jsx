import React from 'react'

export default function Heading({
    heading,
    rightComponent,
    subHeading
}) {
    return (
        <div className='row justify-content-between p-2 mt-3 mb-3'>
            <div>
                <h5 className='mb-0'><b className='text-muted'>{heading}</b></h5>
                <small >{subHeading}</small>
            </div>
           {
               rightComponent ? <>
               {rightComponent}
               </>:null
           }
        </div>
    )
}
