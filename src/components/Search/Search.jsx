import React from 'react';
import './Search.css';
import Select from 'react-select'
import Btn from '../Btn/Btn';

export default function Search({
    show
}) {
    return (
        <div className={`pt-1 pr-4 pr-0 w-100 animated ${show ? 'animate__slideInRight' : 'animate__slideOutRight'}`} id='search'>
            <div className='container-fluid'>
                <div className='row justify-content-end'>
                    <div className='col-lg-6 col-md-6 col-sm-12 mb-4 p-2'>
                        <div className='card shadow'>
                            <div className='card-body'>
                                <h5>Search</h5>
                                <Select
                                    options={[{ value: "House", label: "House" }]}
                                />
                                <Btn
                                    text='Search'
                                    className='mt-3'
                                 />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
