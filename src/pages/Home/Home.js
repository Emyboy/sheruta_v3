import React from 'react'
import Layout from '../../components/Layout/Layout'
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import HowToUse from './HowToUse';
import WhatPeopleSay from './WhatPeopleSay';

export default function Home() {
    return (
        <Layout>
            <div className="image-cover hero-banner" style={{ background: `url("https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/project%20prism%2Fcolor%20search%20archive%2Ffdca42285757a45c50328d80460f369b415e66a3") no-repeat`, height: '5vh' }} data-overlay="6">
                <div className="container">

                    <h1 className="big-header-capt mb-0">Find Verified Flatmates.</h1>
                    <p className="text-center mb-5"></p>
                    
                </div>
                </div>
            <div className='container'>
                <div className='row justify-content-between p-2'>
                    <div>
                        <h5><b>Heading</b></h5>
                        <small >Sub Heading</small>
                    </div>
                    <button className='btn btn-sm border border-1'>View More</button>
                </div>
                <hr />
                <div className='row'>
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                </div>
            </div>
           <HowToUse />
           <WhatPeopleSay />
        </Layout>
    )
}
