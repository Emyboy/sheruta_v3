import React from 'react'
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
									We are an online housing assistance platform providing
									Nigerians with easier and safer housing through shared
									apartments and more, Our mission is to help reduce cost of
									rent for young Nigerians in the urban sides of the country.
								</p>
								<p>
									Flatmate search made better. Co-living is here to stay and we
									are building a community of verified or verifiable working
									class members. We also provide peer to peer rentals to help
									secure that apartment with little or no stress required.
								</p>
								<a href="#" className="axil-btn btn-fill-primary btn-large">
									Read More
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
