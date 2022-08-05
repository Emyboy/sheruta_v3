import React from 'react';
import { Link } from 'react-router-dom';
import img from '../img/sitting.png';

export default function HomeJoinPaddy() {
	return (
		<div className="case-study-area pt-5 pb-5">
			<div className="container">
				<div className="row align-items-center">

					<div className="col-lg-6 col-md-12">
						<div className="solution-content text-white">
							<h3 className="text-grey-400">Joinpaddy - Find Home Together</h3>
							<p className="text-white">
								New Feature - Now you can join together with friends and
								preferred contacts in the community to inspect, rent and move
								into your preferred property or space.
							</p>
							<p className="text-white">
								Simply search for properties in your preferred neighbourhood,
								invite prospective roommates to book inspection together with an
								agent. Click on button below to get started.
							</p>

							<div className="solution-btn">
								<Link to="/signup" className="default-btn">
									GET STARTED <span></span>
								</Link>
							</div>
						</div>
					</div>
					<div className="col-lg-5 col-md-12 text-center">
						<div className="solution-image">
							<img src={img} alt="image" className='rounded' width={'800'} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
