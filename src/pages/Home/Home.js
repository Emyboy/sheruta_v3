import React from 'react'
import Layout from '../../components/Layout/Layout'
import PropertyCard from '../../components/PropertyCard/PropertyCard'

export default function Home() {
    return (
        <Layout>
            <section className='image-cover' style={{ backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/979/558/501/road-house-landscape-illustration-wallpaper-preview.jpg')`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 129%', height: '40vh' }}>
                <h1 className='display-6'>FIND VERIFIED FLATMATES.</h1>
            </section>
            <div className='container-fluid'>
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
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
            <p>lorema f;sdkfs fsdkfjsd flskaf </p>
        </Layout>
    )
}
