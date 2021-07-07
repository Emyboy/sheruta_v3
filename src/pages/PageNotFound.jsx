import React from 'react';
import image from '../assets/img/404.png';
import { Link } from 'react-router-dom';

 const PageNotFound = () => {
    return (
        <section className="error-wrap">
            <div className="container">
                <div className="row justify-content-center">

                    <div className="col-lg-6 col-md-10">
                        <div className="text-center">

                        <img src={image} className="img-fluid" alt=""/>
                                <p><span className="font-weight-bold">Oops!</span> The page you are looking for does not exist</p>
                                <Link className="btn btn-theme" to="/">Back To Home</Link>
								
							</div>
                        </div>

                    </div>
                </div>
			</section>
    )
}

export default PageNotFound;