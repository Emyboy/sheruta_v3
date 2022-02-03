import React from 'react'
import banner7 from '../../../joel_ui/media/banner/banner-thumb-7.png'
import bobble29 from '../../../joel_ui/media/others/bubble-29.png'
import line7 from '../../../joel_ui/media/others/line-7.png'
// import man from '../../../assets/img/man-sitting.svg'
import { Link } from 'react-router-dom'
import bannerImg from '../assets/home_bg.png'

export default function HomeJumbo() {
	return (
		<section
			className="banner banner-style-4 "
			style={{
				backgroundImage: `url(${bannerImg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className="container-fluid pt-5">
				<div className="banner-content pl-3 pt-5">
					<h1
						className="title animate__animated animate__fadeInLeft mb-2"
						data-sal="slide-up"
						data-sal-duration="1000"
						data-sal-delay="100"
					>
						Find verified flat mates
					</h1>
					<h5
						data-sal="slide-up"
						data-sal-duration="1000"
						className="sal-animate animate__animated animate__fadeInLeft font-gray-500"
					>
						Submit your property today.
					</h5>
					<div
						data-sal="slide-up"
						data-sal-duration="1000"
						data-sal-delay="200"
						className="sal-animate"
					>
						<Link
							to="/start"
							className="axil-btn btn-fill-primary btn-large animate__animated animate__fadeInUp"
						>
							Get Started
						</Link>
					</div>
				</div>
				{/* <div className="banner-thumbnail">
					<div
						className="large-thumb sal-animate"
						data-sal="slide-left"
						data-sal-duration="800"
						data-sal-delay="400"
					>
						<img className="paralax-image mr-5 mt-5" src={man} alt="Shape" />
					</div>
				</div> */}
				{/* <div
					className="banner-social sal-animate"
					data-sal="slide-up"
					data-sal-duration="800"
				>
					<div className="border-line"></div>
					<ul className="list-unstyled social-icon">
						<li>
							<a href="https://facebook.com/">
								<i className="fab fa-facebook-f"></i> Facebook
							</a>
						</li>
						<li>
							<a href="https://twitter.com/">
								<i className="fab fa-twitter"></i> twitter
							</a>
						</li>
						<li>
							<a href="https://www.linkedin.com/">
								<i className="fab fa-linkedin-in "></i> Linkedin
							</a>
						</li>
					</ul>
				</div> */}
			</div>

			<ul className="list-unstyled shape-group-19">
				<li
					className="shape shape-1 sal-animate"
					data-sal="slide-down"
					data-sal-duration="500"
					data-sal-delay="100"
				>
					<img src={bobble29} alt="Bubble" />
				</li>
				<li
					className="shape shape-2 sal-animate"
					data-sal="slide-left"
					data-sal-duration="500"
					data-sal-delay="200"
				>
					<img src={line7} alt="Bubble" />
				</li>
			</ul>
		</section>
	)
}
