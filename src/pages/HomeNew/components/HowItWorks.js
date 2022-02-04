import React from 'react'
import { Link } from 'react-router-dom'

export default function OurServices() {
	return (
		<div className="section section-padding bg-color-light" id="section2">
			<div className="container">
				<div className="section-heading heading-left">
					<span className="subtitle text-theme">Want to know more?</span>
					<h2 className="title">How it all works</h2>
				</div>
				<div className="row">
					<div
						className="col-lg-4 col-md-6 sal-animate"
						data-sal="slide-up"
						data-sal-duration="800"
						data-sal-delay="100"
					>
						<div className="services-grid service-style-2">
							<div className="thumbnail">
								{/* <img src="assets/media/icon/icon-31.png" alt="icon" /> */}
								<h2>1</h2>
							</div>
							<div className="content">
								<h5 className="title">
									{' '}
									<Link to={'/services'}>Signup</Link>
								</h5>
								<p>
									Fill up the required information to access our community,
									let's get to know you.
								</p>
								<Link to={'/services'} className="more-btn">
									Find out more
								</Link>
							</div>
						</div>
					</div>
					<div
						className="col-lg-4 col-md-6 sal-animate"
						data-sal="slide-up"
						data-sal-duration="800"
						data-sal-delay="200"
					>
						<div className="services-grid service-style-2">
							<div className="thumbnail">
								{/* <img src="assets/media/icon/icon-32.png" alt="icon" /> */}
								<h2>2</h2>
							</div>
							<div className="content">
								<h5 className="title">
									{' '}
									<Link to={'/services'}>Verify account</Link>
								</h5>
								<p>
									Let's be sure we can identify you. Get verified and have
									access to all our amazing features
								</p>
								<Link to={'/services'} className="more-btn">
									Find out more
								</Link>
							</div>
						</div>
					</div>
					<div
						className="col-lg-4 col-md-6 sal-animate"
						data-sal="slide-up"
						data-sal-duration="800"
						data-sal-delay="300"
					>
						<div className="services-grid service-style-2">
							<div className="thumbnail">
								{/* <img src="assets/media/icon/icon-33.png" alt="icon" /> */}
								<h2>3</h2>
							</div>
							<div className="content">
								<h5 className="title">
									{' '}
									<Link to={'/services'}>Post a request</Link>
								</h5>
								<p>
									Post your shared room or apartment for share. Connect with
									users like you who need. what you have
								</p>
								<Link to={'/services'} className="more-btn">
									Find out more
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}



