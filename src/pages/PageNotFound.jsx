import React from 'react';
import image from '../assets/img/404.gif';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout'

 const PageNotFound = () => {
    return (
        <Layout>
            <section className="error-wrap bg-white mt-4">
                <div className="container">
                    <div className="row justify-content-center">

                        <div className="col-lg-6 col-md-10">
                            <div className="text-center pt-5">

                                <img src={image} className="img-fluid" alt="" />
                                <h2 className='fw-700'>Page Not Found </h2>
                                <p><span className="font-weight-bold">Oops!</span> The page you are looking for does not exist</p>
                                <Link className="btn text-theme mb-4 mt-3 fw-700" to="/">Back To Home</Link>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default PageNotFound;