import React, { useEffect, useState } from 'react'
import Heading from '../../components/Heading/Heading';
import Layout from '../../components/Layout/Layout'
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import HowToUse from './HowToUse';
import WhatPeopleSay from './WhatPeopleSay';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Btn from '../../components/Btn/Btn';

export default function Home() {
    const [state, setState] = useState({
        properties: []
    });
   
    useEffect(() => {
        if(state.properties.length === 0){
            axios(process.env.REACT_APP_BASE_URL + '/properties/recent/6')
                .then(res => {
                    console.log(res)
                    setState({ ...state, properties: res.data })
                })
                .catch(err => {
                })
        }
    }, [state]);
    return (
        <Layout>
            <div className="image-cover hero-banner mb-5" style={{ background: `url("https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/project%20prism%2Fcolor%20search%20archive%2Ffdca42285757a45c50328d80460f369b415e66a3") no-repeat`, height: '5vh' }} data-overlay="6">
                <div className="container text-center">

                    <h1 className="big-header-capt mb-0">Find Verified Flatmates.</h1>
                    <p className="text-center mb-5"></p>
                    <Link to='/requests'>
                        <Btn
                            text='Get Started'
                            className='shadow'
                            onClick={() => { }}
                        />
                    </Link>
                </div>
            </div>
            <div className='container'>
                <Heading heading='Recent Properties' subHeading='These are the most recent properties we have.' />
                {/* <hr /> */}
                <div className='row'>
                    {
                        state.properties.map((val, i) => {
                            return <PropertyCard key={i} data={val} />
                        })
                    }

                </div>
            </div>
            <HowToUse />
            <WhatPeopleSay />
        </Layout>
    )
}
