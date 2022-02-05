import React from 'react'
import { Link } from 'react-router-dom';
import study from '../../../joel_ui/media/others/case-study-4.png'
import wewe from '../assets/Newpics.png';

export default function AboutUs() {
	return (
		<section className="section section-padding case-study-featured-area">
			<div className="container">
				<div className="row">
					<div className="col-xl-7 col-lg-6" data-aos="fade-right">
						<div className="case-study-featured-thumb text-start">
							<img src={wewe} alt="travel" />
						</div>
					</div>
					<div className="col-xl-5 col-lg-6" data-aos="fade-left">
						<div className="case-study-featured">
							<div className="section-heading heading-left">
								<span className="subtitle text-theme">Who we are</span>
								<h2 className="title">About Us</h2>
								<p>
									We are redefining apartment search within our urban cities,
									providing users with easier, and more personalized apartment
									search through peer-peer, Our mission is to improve the rental
									experience of the flat share community while having
									affordability in mind.
								</p>
								<p>
									We provide marketplace features and use advanced algorithms to
									give roommate suggestions. Our subscribers' are our top
									priority and that's why our human reviewers use their actual
									eyeballs and organic brains to review all roommate
									submissions. We apply a 3 phase security check to ensure the
									safety of our community members.
								</p>
								<Link
									to="/services"
									className="axil-btn btn-fill-primary btn-large"
								>
									Read More
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
