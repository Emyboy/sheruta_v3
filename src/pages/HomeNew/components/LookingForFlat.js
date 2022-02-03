import React from 'react'
import bobble2 from '../../../joel_ui/media/others/bubble-16.png'
// import bobble1 from '../../../joel_ui/media/others/bubble-12.png'
// import bobble3 from '../../../joel_ui/media/others/bubble-13.png'
// import bobble4 from '../../../joel_ui/media/others/bubble-14.png'
// import bobble5 from '../../../joel_ui/media/others/bubble-15.png'

// import chat from '../../../joel_ui/media/others/chat-group.png'
// import laptop from '../../../joel_ui/media/others/laptop-poses.png'
// import bill from '../../../joel_ui/media/others/bill-pay.png'

import selfie from '../assets/selfie.svg'
import chat2 from '../assets/chat.svg'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.ul`
	@media (max-width: 676px) {
        .small-thumb{
            background-color: 'pink' !important;
            color: 'red'
        }
	}
`
const Section = styled.section`
	@media (min-width: 676px) {
		.section {
			background-color: 'pink' !important;
			color: 'red' !important;
		}
	}
`

export default function LookingForFlat() {


	return (
		<Section className="section  pt-5 bg-them-light">
			<div className="container">
				<div className="call-to-action">
					<div className="section-heading heading-light">
						<span className="subtitle text-accent">Let's Work Together</span>
						<h2 className="title mb-2 text-accent fw-bold">
							Looking for a flat to share?
						</h2>
						<p className="text-accent">
							Join the community, post a request and pair with other like minded
							individuals
						</p>
						<Link
							to="/start"
							className="axil-btn btn-large bg-theme text-white shadow"
						>
							Get Started
						</Link>
					</div>
					<div className="thumbnail">
						<div
							className="larg-thumb sal-animate"
							data-sal="zoom-in"
							data-sal-duration="600"
							data-sal-delay="100"
						>
							{/* <img className="paralax-image" src={chat} alt="Chat"/> */}
						</div>
						<Wrapper
							className="list-unstyled small-thumb desktop-only"
							style={{ paddingTop: '36px' }}
						>
							<li
								style={{ left: '-270px' }}
								className="shape shape-1 sal-animate"
								data-sal="slide-right"
								data-sal-duration="800"
								data-sal-delay="400"
							>
								<img
									className="paralax-image"
									src={chat2}
									alt="Laptop"
									width={'450'}
								/>
							</li>
							<li
								className="shape shape-2 sal-animate"
								data-sal="slide-left"
								data-sal-duration="800"
								data-sal-delay="300"
								style={{ right: '-270px' }}
							>
								<img
									className="paralax-image"
									src={selfie}
									alt="Bill"
									width={'450'}
								/>
							</li>
						</Wrapper>
					</div>
				</div>
			</div>
			<ul className="list-unstyled shape-group-9">
				{/* <li className="shape shape-1">
					<img src={bobble1} alt="Comments" />
				</li> */}
				<li className="shape shape-2">
					<img src={bobble2} alt="Comments" />
				</li>
				{/* <li className="shape shape-3">
					<img src={bobble3} alt="Comments" />
				</li> */}
				{/* <li className="shape shape-4">
					<img src={bobble4} alt="Comments" />
				</li> */}
				<li className="shape shape-5">
					<img src={bobble2} alt="Comments" />
				</li>
				{/* <li className="shape shape-6">
					<img src={bobble5} alt="Comments" />
				</li> */}
				<li className="shape shape-7">
					<img src={bobble2} alt="Comments" />
				</li>
			</ul>
		</Section>
	)
}
