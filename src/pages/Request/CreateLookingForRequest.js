import React from 'react'
import Layout from '../../components/Layout/Layout'

export default function CreateLookingForRequest() {
	return (
		<Layout>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12 col-md-12">
						<div className="card mt-4 p-4 rounded-xxl border-0">
							<div className="contact-form">
								<div className="title">
									<h3>Post Your Flat Request</h3>
									<p>
										Lorem ipsum dolor sit amet consectetur adipiscing elit sed
										do eiusmod tempor incididunt ut labore et dolore magna
										aliqua enim ad minim veniam quis nostrud exercitation
										ullamco laboris.
									</p>
								</div>

								<form id="contactForm" novalidate="true">
									<div className="row justify-content-center">
										<div className="col-lg-6 col-md-6">
											<div className="form-group">
												<label>Name</label>
												<input
													type="text"
													name="name"
													id="name"
													className="form-control"
													required=""
													data-error="Please enter your name"
												/>
												<div className="help-block with-errors"></div>
											</div>
										</div>

										<div className="col-lg-6 col-md-6">
											<div className="form-group">
												<label>Email</label>
												<input
													type="email"
													name="email"
													id="email"
													className="form-control"
													required=""
													data-error="Please enter your email"
												/>
												<div className="help-block with-errors"></div>
											</div>
										</div>

										<div className="col-lg-6 col-md-6">
											<div className="form-group">
												<label>Phone Number</label>
												<input
													type="text"
													name="phone_number"
													id="phone_number"
													required=""
													data-error="Please enter your number"
													className="form-control"
												/>
												<div className="help-block with-errors"></div>
											</div>
										</div>

										<div className="col-lg-6 col-md-6">
											<div className="form-group">
												<label>Subject</label>
												<input
													type="text"
													name="msg_subject"
													id="msg_subject"
													className="form-control"
													required=""
													data-error="Please enter your subject"
												/>
												<div className="help-block with-errors"></div>
											</div>
										</div>

										<div className="col-lg-12 col-md-12">
											<div className="form-group">
												<label>Message</label>
												<textarea
													name="message"
													className="form-control"
													id="message"
													cols="30"
													rows="5"
													required=""
													data-error="Write your message"
												></textarea>
												<div className="help-block with-errors"></div>
											</div>
										</div>

										<div className="col-lg-12 col-md-12">
											<button
												type="submit"
												className="default-btn disabled"
												style={{ pointerEvents: 'all', cursor: 'pointer' }}
											>
												Send Message <span></span>
											</button>
											<div
												id="msgSubmit"
												className="h3 text-center hidden"
											></div>
											<div className="clearfix"></div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
