import React from 'react'
import circle from '../../../joel_ui/media/others/circle-2.png'
import bobble1 from '../../../joel_ui/media/others/bubble-2.png'
import bobble2 from '../../../joel_ui/media/others/bubble-1.png'

import message from '../assets/message.svg'
import match from '../assets/match.svg'
import care from '../assets/Care.svg'
import { Link } from 'react-router-dom'

export default function HowItWorks() {
	return (
		<section className="section section-padding" data-aos="flip-left">
			<div className="container">
				<div className="section-heading heading-left mb--20 mb_md--70">
					<span className="subtitle text-theme">What We Can Do For You</span>
					<h2 className="title">
						Services we can <br /> offer you.
					</h2>
				</div>
				<div className="row">
					<div className="col-lg-4 mt--200 mt_md--0 " data-aos="fade-up">
						<div className="services-grid service-style-2 ">
							<div className="thumbnail">
								<img src={message} alt="icon" />
							</div>
							<div className="content">
								<h5 className="title">
									{' '}
									<Link to="/services">Messaging</Link>
								</h5>
								<p>
									Send realtime messages to potential flatmates using our
									messaging service
								</p>
								<Link to="/services" className="more-btn">
									Find out more
								</Link>
							</div>
						</div>
					</div>
					<div
						className="col-lg-4 mt--100 mt_md--0 sal-animate"
						data-aos="fade-up"
					>
						<div className="services-grid service-style-2">
							<div className="thumbnail">
								<img src={match} alt="icon" />
							</div>
							<div className="content">
								<h5 className="title">
									{' '}
									<Link to={"/services"}>Matching</Link>
								</h5>
								<p>
									Our advanced algorithms helps you find the ideal flatmate you
									are looking for.
								</p>
								<Link to={"/services"} className="more-btn">
									Find out more
								</Link>
							</div>
						</div>
					</div>
					<div
						className="col-lg-4 sal-animate"
						data-sal="slide-up"
						data-sal-duration="800"
						data-sal-delay="300"
					>
						<div className="services-grid service-style-2">
							<div className="thumbnail">
								<img src={care} alt="icon" />
							</div>
							<div className="content">
								<h5 className="title">
									{' '}
									<Link to={"/services"}>24/7 Support</Link>
								</h5>
								<p>
									Can't find what you are looking for? We are always online and
									ready to go
								</p>
								<Link to={"/services"} className="more-btn">
									Find out more
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ul className="shape-group-7 list-unstyled">
				<li className="shape shape-1">
					{/* <img src={circle} alt="circle" /> */}
					<div
						className="bg-them-light p-5"
						style={{ borderRadius: '100%'}}
					/>
				</li>
				<li className="shape shape-2">
					{/* <img src={bobble1} alt="Yello Ball" /> */}
					<div className="bg-them-light p-5 rounded-xxl" />
				</li>
				<li className="shape shape-3">
					{/* <img src={bobble2} alt="Line" /> */}
					<div
						className="bg-them-light"
						style={{ borderRadius: '100%', padding: '80px' }}
					/>
				</li>
			</ul>
		</section>
	)
}
