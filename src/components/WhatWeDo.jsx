import React from 'react'
import Layout from '../components/Layout/Layout'

export default function WhatWeDo(){
    return (
			<Layout>
				<section>
					<div className="container card rounded-xl pt-5 pb-5">
						<div className="row mb-3">
							<div className="col text-center">
								<div className="sec-heading center">
									<h2>
										<b>About Us</b>
									</h2>
									<p>
										We are an online peer to peer housing assistance platform
										providing citizens with easier accommodation opportunities
										through flat sharing and more. Co-living is here to stay and
										we are building a community of verified & verifiable working
										class members making it easier for users to find apartment
										together.
									</p>
								</div>
							</div>
						</div>

						<div className="row mt-5">
							<div className="col-lg-4 col-md-4">
								<div className="middle-icon-features">
									<div className="middle-icon-features-item mb-3">
										<div className="middle-icon-large-features-box">
											{/* <i className="ti-user text-danger"></i> */}
											<b className="text-black p-3 shadow rounded-xl steps bg-danger">
												01
											</b>
										</div>
										<div className="mt-5 middle-icon-features-content">
											<h4>
												<b>Create An Account</b>
											</h4>
											<p>
												Sign up, be steps forward towards renting your new home.
												Enjoy access and updates on many possible flatemate.
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-4 col-md-4">
								<div className="middle-icon-features">
									<div className="middle-icon-features-item mb-3">
										<div className="middle-icon-large-features-box">
											{/* <i className="ti-search text-success"></i> */}
											<b className="text-black p-3 shadow rounded-xl steps bg-success">
												02
											</b>
										</div>
										<div className="mt-5 middle-icon-features-content">
											<h4>
												<b>Find &amp; Search Property</b>
											</h4>
											<p>
												Find shared apartments that fit your lifestyle and
												living standard around Lagos without scraping your bank
												account..
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-4 col-md-4">
								<div className="middle-icon-features">
									<div className="middle-icon-features-item mb-3">
										<div className="middle-icon-large-features-box">
											{/* <i className="ti-location-arrow text-warning"></i> */}
											<b className="text-black p-3 shadow rounded-xl steps bg-warning">
												03
											</b>
										</div>
										<div className="mt-5 middle-icon-features-content">
											<h4>
												<b>Book your Property</b>
											</h4>
											<p>
												Book and rent your potential new home at your comfort
												with little or no stress. Free online consultation for
												user.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		)
}
