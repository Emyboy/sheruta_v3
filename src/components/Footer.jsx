import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.png'

export default () => {
	return (
		<footer className="footer-area pt-100" style={{ zIndex: 1}}>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-3 col-md-6">
						<div className="single-footer-widget">
							<div className="widget-logo">
								<a href="index.html">
									<img src={logo} alt="image" width={'200'} />
								</a>
							</div>

							<p>
								Why use sheruta? Have access to hundreds of potential
								apartments, earn an alternative source of income. All possible
								flatmates are verified ensuring your safety.
							</p>

							<ul className="widget-social">
								<li>
									<a href="http://fb.me/sheruta.ng" target="_blank">
										<i className="bx bxl-facebook"></i>
									</a>
								</li>
								<li>
									<a href="https://twitter.com/sheruta_ng" target="_blank">
										<i className="bx bxl-twitter"></i>
									</a>
								</li>
								<li>
									<a
										href="https://www.instagram.com/sheruta_ng/"
										target="_blank"
									>
										<i className="bx bxl-instagram"></i>
									</a>
								</li>
								<li>
									<a
										href="https://www.linkedin.com/company/sheruta-online-accommodations-solution/?originalSubdomain=ng"
										target="_blank"
									>
										<i className="bx bxl-linkedin"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="col-lg-3 col-md-6">
						<div className="single-footer-widget">
							<h3>Explore</h3>

							<ul
								className="footer-quick-links"
								style={{ flexDirection: 'column' }}
							>
								<li style={{ maxWidth: '100%' }}>
									<Link to="/blog">Blog</Link>
								</li>
							</ul>
							<ul
								className="footer-quick-links"
								style={{ flexDirection: 'column' }}
							>
								<li style={{ maxWidth: '100%' }}>
									<Link to="/blog">Join Paddy</Link>
								</li>
							</ul>
							<ul
								className="footer-quick-links"
								style={{ flexDirection: 'column' }}
							>
								<li style={{ maxWidth: '100%' }}>
									<Link to="/blog">Our Agents</Link>
								</li>
							</ul>
							<ul
								className="footer-quick-links"
								style={{ flexDirection: 'column' }}
							>
								<li style={{ maxWidth: '100%' }}>
									<Link to="/blog">Available Flats</Link>
								</li>
							</ul>
							<ul
								className="footer-quick-links"
								style={{ flexDirection: 'column' }}
							>
								<li style={{ maxWidth: '100%' }}>
									<Link to="/blog">Become An Agent</Link>
								</li>
							</ul>
							<ul
								className="footer-quick-links"
								style={{ flexDirection: 'column' }}
							>
								<li style={{ maxWidth: '100%' }}>
									<Link to="/blog">About Us</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className="col-lg-3 col-md-6">
						<div className="single-footer-widget">
							<h3>Contact</h3>

							<ul className="widget-info">
								<li>
									<i className="bx bxs-map"></i>
									No: 181, Ago Palace Way, Okota, Lagos.
								</li>

								<li>
									<i className="bx bxs-phone"></i>
									<a href="tel:+2348138154470">+2348138154470</a>
								</li>

								<li>
									<i className="bx bx-envelope"></i>
									<a href="mailto:info@sheruta.ng">info@sheruta.ng</a>
								</li>

								<li>
									<i className="bx bx-time"></i>9 AM - 5 PM (Sun - Sat)
								</li>
							</ul>
						</div>
					</div>

					<div className="col-lg-3 col-md-6">
						<div className="single-footer-widget">
							<h3>Newsletter</h3>

							<div className="widget-newsletter">
								<form
									className="newsletter-form"
									data-bs-toggle="validator"
									novalidate="true"
								>
									<input
										type="email"
										className="input-newsletter"
										placeholder="Email Address"
										name="EMAIL"
										required=""
										autocomplete="off"
									/>

									<button
										type="submit"
										className="disabled"
										// style={{"pointer-events: all; cursor: pointer;"}}
									>
										<i className="bx bx-envelope"></i>
									</button>
									<div id="validator-newsletter" className="form-result"></div>
								</form>

								<div className="newsletter-content">
									<p>
										Sign up for our latest news and articles. We won’t give you
										spam emails.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="copyright-area">
				<div className="container">
					<div className="copyright-area-content">
						<p>
							Copyright @<span>{new Date().getFullYear()}</span> Sheruta
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
	// return (
	// 	<footer
	// 		className="dark-footer bg-light shadow skin-dark-footer border-top pt-3"
	// 		style={{ zIndex: 0 }}
	// 	>
	// 		<div>
	// 			<div className="container">
	// 				<div className="row">
	// 					<div className="col-lg-3 col-md-6">
	// 						<div className="footer-widget">
	// 							<h4 className="widget-title fw-700">About Us</h4>
	// 							<p>
	// 								Why use sheruta? Have access to hundreds of potential
	// 								apartments, earn an alternative source of income. All possible
	// 								flatmates are verified ensuring your safety. We provide
	// 								different payment plans that supports both long-term and
	// 								short-term. lets be your medium, connecting you to your new
	// 								apartment or that special place you can call home for
	// 								long-term, short-term and flat share.
	// 							</p>
	// 							{/* <a href="#c" className="other-store-link">
    //                                 <div className="other-store-app">
    //                                     <div className="os-app-icon">
    //                                         <i className="ti-android"></i>
    //                                     </div>
    //                                     <div className="os-app-caps">
    //                                         Google Store
	// 										</div>
    //                                 </div>
    //                             </a> */}
	// 						</div>
	// 					</div>
	// 					<div className="col-lg-3 col-md-6">
	// 						<div className="footer-widget">
	// 							<h4 className="widget-title fw-700">Useful links</h4>
	// 							<ul className="footer-menu">
	// 								<li>
	// 									<Link to="/about">About Us</Link>
	// 								</li>
	// 								<li>
	// 									<Link to="/blog">Blog</Link>
	// 								</li>
	// 								<li>
	// 									<Link to="/contact">Contact Us</Link>
	// 								</li>
	// 								<li>
	// 									<Link to="/about">About Us</Link>
	// 								</li>
	// 								<li>
	// 									<Link to="/agents">Join Us</Link>
	// 								</li>
	// 							</ul>
	// 						</div>
	// 					</div>

	// 					<div className="col-lg-3 col-md-6">
	// 						<div className="footer-widget">
	// 							<h4 className="widget-title fw-700">Get in Touch</h4>
	// 							<div className="fw-address-wrap">
	// 								<div className="fw fw-location">
	// 									No: 181, Ago Palace Way, Okota, Lagos.
	// 								</div>
	// 								<div className="fw fw-mail">info@sheruta.ng</div>
	// 								<div className="fw fw-call">+2348138154470</div>
	// 								{/* <div className="fw fw-skype">
    //                                     drizvato77
	// 									</div> */}
	// 								<div className="fw fw-web">http://www.sheruta.ng/</div>
	// 							</div>
	// 						</div>
	// 					</div>

	// 					<div className="col-lg-3 col-md-6">
	// 						<div className="footer-widget">
	// 							<h4 className="widget-title fw-700">Follow Us</h4>
	// 							<p>Follow us on socail media.</p>
	// 							<ul className="footer-bottom-social" style={{ color: 'white' }}>
	// 								<li>
	// 									<a
	// 										target="_blank"
	// 										rel="noopener noreferrer"
	// 										href="http://fb.me/sheruta.ng"
	// 									>
	// 										<i className="ti-facebook text-dark"></i>
	// 									</a>
	// 								</li>
	// 								<li>
	// 									<a
	// 										target="_blank"
	// 										rel="noopener noreferrer"
	// 										href="https://twitter.com/sheruta_ng"
	// 									>
	// 										<i className="ti-twitter text-dark"></i>
	// 									</a>
	// 								</li>
	// 								<li>
	// 									<a
	// 										target="_blank"
	// 										rel="noopener noreferrer"
	// 										href="https://www.instagram.com/sheruta_ng/"
	// 									>
	// 										<i className="ti-instagram text-dark"></i>
	// 									</a>
	// 								</li>
	// 								{/* <li><a href="#c"><i className="ti-linkedin"></i></a></li> */}
	// 							</ul>

	// 							{/* <form className="f-newsletter mt-4">
    //                                 <input type="email" className="form-control sigmup-me" placeholder="Your Email Address" required="required" />
    //                                 <button type="submit" className="btn"><i className="ti-arrow-right"></i></button>
    //                             </form> */}
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>

	// 		<div className="footer-bottom">
	// 			<div className="container">
	// 				<div className="row align-items-center">
	// 					<div className="col-lg-12 col-md-12 text-center">
	// 						<p className="mb-0">© 2021 Sheruta NG</p>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</footer>
	// )
}
