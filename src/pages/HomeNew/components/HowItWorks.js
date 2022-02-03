import React from 'react'

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
									<a href="service-development.html">Sinup</a>
								</h5>
								<p>
									Describe yourself or let us know the kind of person you are or what exactly you're looking for
								</p>
								<a href="service-development.html" className="more-btn">
									Find out more
								</a>
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
									<a href="service-development.html">Verify account</a>
								</h5>
								<p>
									Once your account is verified, you'll have access to all the features we offer on the platform
								</p>
								<a href="service-development.html" className="more-btn">
									Find out more
								</a>
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
									<a href="service-development.html">Post a request</a>
								</h5>
								<p>
									Join the community poster request and let people know what you're looking for exactly
								</p>
								<a href="service-development.html" className="more-btn">
									Find out more
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}



