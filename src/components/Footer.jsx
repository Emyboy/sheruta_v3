import React from 'react'
import { Link } from 'react-router-dom';
import '../joel_ui/css/app.css';

export default () => {
	return (
		<footer className="footer-area">
			<div className="container">
				<div className="footer-top">
					<div className="footer-social-link">
						<ul className="list-unstyled">
							<li>
								<a
									href="https://web.facebook.com/sheruta.ng"
									data-sal="slide-up"
									data-sal-duration="500"
									data-sal-delay="100"
									className="sal-animate"
								>
									<i className="fab fa-facebook-f"></i>
								</a>
							</li>
							<li>
								<a
									href="https://twitter.com/sheruta_ng"
									data-sal="slide-up"
									data-sal-duration="500"
									data-sal-delay="200"
									className="sal-animate"
								>
									<i className="fab fa-twitter"></i>
								</a>
							</li>

							<li>
								<a
									href="https://www.linkedin.com/company/sheruta-online-accommodations-solution/"
									data-sal="slide-up"
									data-sal-duration="500"
									data-sal-delay="400"
									className="sal-animate"
								>
									<i className="fab fa-linkedin-in"></i>
								</a>
							</li>
							<li>
								<a
									href="https://www.instagram.com/sheruta_ng"
									data-sal="slide-up"
									data-sal-duration="500"
									data-sal-delay="500"
									className="sal-animate"
								>
									<i className="fab fa-instagram"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="footer-main">
					<div className="row">
						<div
							className="col-xl-6 col-lg-5 sal-animate"
							data-sal="slide-right"
							data-sal-duration="800"
							data-sal-delay="100"
						>
							<div className="footer-widget border-end">
								<div className="footer-newsletter">
									<h2 className="title">Get in touch!</h2>
									<p>
										Be the first to get updates on flat sharing opportunities.
										Submit your email below to join our mailing list.
									</p>
									<form>
										<div className="input-group">
											<input
												type="email"
												className="form-control"
												placeholder="Email address"
											/>
											<button className="subscribe-btn" type="submit">
												Subscribe
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div
							className="col-xl-6 col-lg-7 sal-animate"
							data-sal="slide-left"
							data-sal-duration="800"
							data-sal-delay="100"
						>
							<div className="row">
								<div className="col-sm-6">
									<div className="footer-widget">
										<h6 className="widget-title">Services</h6>
										<div className="footer-menu-link">
											<ul className="list-unstyled">
												<li>
													<a href="service-design.html">For Share</a>
												</li>
												<li>
													<a href="service-development.html">Join Paddy</a>
												</li>
												<li>
													<a href="service-development.html">Carry Over</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-sm-3">
									<div className="footer-widget">
										<h6 className="widget-title">Resources</h6>
										<div className="footer-menu-link">
											<ul className="list-unstyled">
												<li>
													<a href="blog.html">Blog</a>
												</li>
												<li>
													<a href="blog.html">Partner With Us</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-sm-3">
									<div className="footer-widget">
										<h6 className="widget-title">Support</h6>
										<div className="footer-menu-link">
											<ul className="list-unstyled">
												<li>
													<a href="contact.html">Contact</a>
												</li>
												<li>
													<a href="privacy-policy.html">Call Now</a>
												</li>
												<li>
													<a href="terms-of-use.html">Terms of Use</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className="footer-bottom sal-animate"
					data-sal="slide-up"
					data-sal-duration="500"
					data-sal-delay="100"
				>
					<div className="row">
						<div className="col-md-6">
							<div className="footer-copyright">
								<span className="copyright-text">
									© {new Date().getFullYear()}. All rights reserved.{' '}
									{/* <a href="https://axilthemes.com/">Axilthemes</a>. */}
								</span>
							</div>
						</div>
						<div className="col-md-6">
							<div className="footer-bottom-link">
								<ul className="list-unstyled">
									<li>
										<a href="privacy-policy.html">Privacy Policy</a>
									</li>
									<li>
										<a href="terms-of-use.html">Terms of Use</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
