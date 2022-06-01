import React from 'react'
import { Link } from 'react-router-dom'
import img from '../img/afro.jpg'

export default function AboutNew() {
	return (
		<div className="solution-area ptb-100 bg-white">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-6 col-md-12">
						<div className="solution-image">
							<img src={img} alt="image" />
						</div>
					</div>

					<div className="col-lg-6 col-md-12">
						<div className="solution-content">
							<h3>What do we do?</h3>
							<p>
								We are an online housing assistance platform providing Nigerians
								with easier and safer housing through shared apartments and
								more, Our mission is to help reduce cost of rent for young
								Nigerians in the urban sides of the country
							</p>
							<p>
								Flatmate search made better. Co-living is here to stay and we
								are building a community of verified or verifiable working class
								members. We also provide peer to peer rentals to help secure
								that apartment with little or no stress required.
							</p>

							<div className="solution-btn">
								<Link to='/about' className="default-btn">
									CONTACT US NOW <span></span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
