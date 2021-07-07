import React from 'react';
import './Search.css';

export default function Search({
    show
}) {
    return (
        <div className={`bg-accent pt-5 pr-0 w-100 animated ${show ? 'animate__bounceInDown' : 'animate__bounceOutUp'}`} id='search'>
            <div className='container-fluid'>
                <div className='row justify-content-end'>
                    <div className='bg-white col-lg-6 col-md-6 col-sm-12 mb-4 p-2'>
                        <h5>Search</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
