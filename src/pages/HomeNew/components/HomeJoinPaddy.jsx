import React from 'react';
import { Link } from 'react-router-dom';
import img from '../img/girls2.png';

export default function HomeJoinPaddy() {
	return (
		<div className="case-study-area ptb-100">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-6 col-md-12">
						<div className="solution-image">
							<img src={img} alt="image" />
						</div>
					</div>

					<div className="col-lg-6 col-md-12">
						<div className="solution-content text-white">
							<h3 className='text-grey-600'>Join Paddy Find Best Property</h3>
							<p className='text-white'>
								Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin
								lorem quis bibendum auctor nisi elit consequat ipsum nec
								sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate
								cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec
								tellus a odio tincidunt auctor a ornare odio.
							</p>
							<p className='text-white'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>

							<div className="solution-btn">
								<Link to="/signup" className="default-btn">
									GET STARTED <span></span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
