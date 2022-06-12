import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../../../assets/images/main-banner/banner-1.jpg'
import img2 from '../../../../assets/images/main-banner/banner-shape-1.png'

export default function AgentHero() {
	return (
		<div className="main-banner-area">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-6 col-md-12">
						<div className="main-banner-content">
							<h1
								className="wow animate__ animate__fadeInUp animated"
								data-wow-delay="100ms"
								data-wow-duration="1000ms"
								// style="visibility: visible; animation-duration: 1000ms; animation-delay: 100ms; animation-name: fadeInUp;"
							>
								Join us today, become and agent.
							</h1>
							<p
								className="wow animate__ animate__fadeInUp animated"
								data-wow-delay="200ms"
								data-wow-duration="1500ms"
								// style="visibility: visible; animation-duration: 1500ms; animation-delay: 200ms; animation-name: fadeInUp;"
							>
								Get more client blah blah blah
							</p>
						</div>
					</div>

					<div className="col-lg-6 col-md-12">
						<div
							className="main-banner-image wow animate__ animate__fadeInUp animated"
							data-wow-delay="300ms"
							data-wow-duration="2000ms"
							// style="visibility: visible; animation-duration: 2000ms; animation-delay: 300ms; animation-name: fadeInUp;"
						>
							<img src={img} alt="image" />
						</div>
					</div>
				</div>
				<div className="tab main-banner-list-tab wow animate__ animate__fadeInUp animated">
					<Link to='/signup' className=" default-btn">Get Started</Link>
				</div>
			</div>

			<div className="main-banner-shape-1">
				<img src={img2} alt="image" />
			</div>
		</div>
	)
}
