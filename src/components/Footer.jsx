import React from 'react'
import { Link } from 'react-router-dom';
import '../joel_ui/css/app.css';

export default () => {
	return (
		<footer className="footer-area mt-5 bg-white">
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
												value="+2348138154470"
												disabled
											/>
											<button className="subscribe-btn" type="submit">
												Call Now
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
													<Link to="/services/for_share">For Share</Link>
												</li>
												<li>
													<Link to={'/services/join_paddy'}>Join Paddy</Link>
												</li>
												<li>
													<Link to={"/services/carry_over"}>Carry Over</Link>
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
													<Link to={'/blog'}>Blog</Link>
												</li>
												<li>
													<Link to={"/agents"}>Join Us</Link>
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
													<Link to="contact.html">Contact</Link>
												</li>
												<li>
													<Link to="privacy-policy.html">Call Now</Link>
												</li>
												<li>
													<Link to="terms-of-use.html">Terms of Use</Link>
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
									{/* <Link to="https://axilthemes.com/">Axilthemes</Link>. */}
								</span>
							</div>
						</div>
						<div className="col-md-6">
							<div className="footer-bottom-link">
								<ul className="list-unstyled">
									<li>
										<Link to="/help">Help</Link>
									</li>
									<li>
										<Link to="/terms">Terms of Use</Link>
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
