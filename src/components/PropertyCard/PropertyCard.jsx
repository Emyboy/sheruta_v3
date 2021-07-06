import React, { useState } from 'react'
import Image from '../../assets/img/p-5.jpg';

export default function PropertyCard() {

    const [state, setState] = useState({
        info: false
    })

    return (
        <div className='col-lg-4 col-md-6 col-sm-12 mb-4'>
            <div className="card bg-white text-white" style={{ borderRadius: '14px' }}>
                <img src={Image} className="card-img" alt="..." style={{ borderRadius: '14px' }} />
                <div className="card-img-overlay">
                    {/* <h5 className="card-title bg-white">Card title</h5> */}
                    <div className='row justify-content-between'>
                        <span class="property-type bg-accent shadow pl-2 p-1 pr-2" style={{ borderRadius: '10px' }}>For Share</span>
                        <button className='btn btn-sm bg-white shadow' onClick={() => setState({ ...state, info: !state.info })}>
                            <i className='ti-info'></i>
                        </button>
                    </div>
                    <p className={`card-text text-shadow ${state.info ? 'show' : 'hide'}`}>This is where the description of the apartment will go</p>
                    <p className={`card-text text-shadow ${state.info ? 'show' : 'hide'}`}>I don't even know what ill go here sef lol</p>
                </div>
            </div>
            <div className='container-fluid p-0 mt-2'>
                <h2 className='mb-0' style={{ fontSize: '19px' }}>
                    <a className='text-dark' href='/details'>Property Title</a>
                </h2>
                <span className="_155sga30"><b>N234,000 </b>/ Pre-Year</span>
                <div className='container-fluid'>
                    <div className='row justify-content-start'>
                        <div className='mr-3'>
                            <small >Sitting Room: </small><span><b>4</b></span>
                        </div>
                        <div className='mr-3'>
                            <small>Bedroom: </small><span><b>4</b></span>
                        </div>
                        <div>
                            <small>Toilet: </small><span><b>4</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
