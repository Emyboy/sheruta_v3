import React from 'react'
import WhatWeDo from '../../components/WhatWeDo'
import MetaTags from 'react-meta-tags';

export default function About() {
    return (
        <section className='h-100 mt-5 pb-5' style={{ paddingTop: '10vh'}}>
            <MetaTags>
                <title>About Us | Sheruta NG</title>
                <meta name="description" content={"Why use sheruta? Have access to hundreds of potential apartments, earn an alternative source of income. All possible flatmates are verified ensuring your safety. We provide different payment plans that supports both long-term and short-term. lets be your medium, connecting you to your new apartment or that special place you can call home for long-term, short-term and flatshare"} />
                <meta property="og:title" content={'About Us | Sheruta NG'} />
                <meta property="og:description" content={'Why use sheruta? Have access to hundreds of potential apartments, earn an alternative source of income. All possible flatmates are verified ensuring your safety. We provide different payment plans that supports both long-term and short-term. lets be your medium, connecting you to your new apartment or that special place you can call home for long-term, short-term and flatshare'} />
            </MetaTags>
            <WhatWeDo />
        </section>
    )
}
