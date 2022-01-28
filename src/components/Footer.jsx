import React from "react";
import { Link } from "react-router-dom";

export default () => {
    return (
			<footer
				className="bg-accent pt-5 pb-5 dark-footer skin-dark-footer"
				style={{ zIndex: 0 }}
			>
				<div>
					<div className="container">
						<div className="row">
							<div className="col-lg-3 col-md-6">
								<div className="footer-widget">
									<h4 className="widget-title text-light">
										<b>About Us</b>
									</h4>
									<p className='text-muted'>
										Why use sheruta? Have access to hundreds of potential
										apartments, earn an alternative source of income. All
										possible flatmates are verified ensuring your safety. We
										provide different payment plans that supports both long-term
										and short-term. lets be your medium, connecting you to your
										new apartment or that special place you can call home for
										long-term, short-term and flatshare
									</p>
									{/* <a href="#c" className="other-store-link">
                                    <div className="other-store-app">
                                        <div className="os-app-icon">
                                            <i className="ti-android"></i>
                                        </div>
                                        <div className="os-app-caps">
                                            Google Store
											</div>
                                    </div>
                                </a> */}
								</div>
							</div>
							<div className="col-lg-3 col-md-6">
								<div className="footer-widget">
									<h4 className="widget-title text-light">
										<b>Useful links</b>
									</h4>
									<ul className="footer-menu">
										<li>
											<Link className="text-muted" to="/about">
												About Us
											</Link>
										</li>
										<li>
											<Link className="text-muted" to="/blog">
												Blog
											</Link>
										</li>
										<li>
											<Link className="text-muted" to="/about">
												About Us
											</Link>
										</li>
										<li>
											<Link className="text-muted" to="/agents">
												Partner With Us
											</Link>
										</li>
									</ul>
								</div>
							</div>

							<div className="col-lg-3 col-md-6">
								<div className="footer-widget">
									<h4 className="widget-title text-light">
										<b>Get in Touch</b>
									</h4>
									<div className="fw-address-wrap">
										<div className="fw fw-location text-muted">
											No: 181, Ago Palace Way, Okota, Lagos.
										</div>
										<div className="fw fw-mail text-muted">info@sheruta.ng</div>
										<div className="fw fw-call text-muted">+2348138154470</div>
										{/* <div className="fw fw-skype">
                                        drizvato77
										</div> */}
										<div className="fw fw-web text-muted">http://www.sheruta.ng/</div>
									</div>
								</div>
							</div>

							<div className="col-lg-3 col-md-6">
								<div className="footer-widget">
									<h4 className="widget-title text-light">
										<b>Follow Us</b>
									</h4>
									<p className='text-muted'>Follow us on socail media.</p>
									<ul
										className="footer-bottom-social row"
										style={{ color: 'white' }}
									>
										<li>
											<a
												target="_blank"
												rel="noopener noreferrer"
												href="http://fb.me/sheruta.ng"
											>
												<i className="ti-facebook text-muted"></i>
											</a>
										</li>
										<li>
											<a
												target="_blank"
												rel="noopener noreferrer"
												href="https://twitter.com/sheruta_ng"
											>
												<i className="ti-twitter text-muted"></i>
											</a>
										</li>
										<li>
											<a
												target="_blank"
												rel="noopener noreferrer"
												href="https://www.instagram.com/sheruta_ng/"
											>
												<i className="ti-instagram text-muted"></i>
											</a>
										</li>
										{/* <li><a href="#c"><i className="ti-linkedin"></i></a></li> */}
									</ul>

									{/* <form className="f-newsletter mt-4">
                                    <input type="email" className="form-control sigmup-me" placeholder="Your Email Address" required="required" />
                                    <button type="submit" className="btn"><i className="ti-arrow-right"></i></button>
                                </form> */}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="footer-bottom">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-lg-12 col-md-12 text-center">
								<p className="mb-0 text-muted">© 2021 Sheruta NG</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
		)
};
