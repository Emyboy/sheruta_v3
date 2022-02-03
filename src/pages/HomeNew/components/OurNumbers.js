import React from 'react';
import { HiUsers } from 'react-icons/hi';
import { AiFillMail } from 'react-icons/ai'
import { FaMoneyBillWave, FaUserPlus } from 'react-icons/fa'
import CountUp from 'react-countup';
import bobble1 from '../../../joel_ui/media/others/bubble-42.png'
import bobble2 from '../../../joel_ui/media/others/bubble-43.png'

const iconSize = 50;

const data = [
	{
		name: 'Email List',
		count: 4200,
		icon: <AiFillMail size={iconSize} />,
	},
	{
		name: 'User Activity',
		count: 1600,
		icon: <HiUsers size={iconSize} />,
	},
	{
		name: 'Monthly Subscribers',
		count: 300,
		icon: <FaMoneyBillWave size={iconSize} />,
	},
	{
		name: 'Successful Paring',
		count: 150,
		icon: <FaUserPlus size={iconSize} />,
	},
]

export default function OurNumbers() {
	return (
		<section className="section section-padding bg-color-dark">
			<div className="container">
				<div className="section-heading heading-light">
					<span className="subtitle text-theme">Our Numbers</span>
					<h2 className="title">Our Community Progress</h2>
					<p>To improve our accessibility to all and ensure a better secured community, we moved post activities from social media to our webapp on 20 OCT 21</p>
				</div>
				<div className="row">
					{
						data.map((val, i) => {
							return (
								<div
									className="col-lg-3 col-6 sal-animate"
									data-sal="slide-up"
									data-sal-duration="800"
									data-sal-delay="100"
									key={`numbers-${i}`}
								>
									<div className="counterup-progress">
										<div className="icon">
											{val.icon}
										</div>
										<div className="count-number h2">
											<span
												className="number count odometer odometer-auto-theme"
												data-count="15"
											>
												<div className="odometer-inside">
													<span className="odometer-digit">
														<span className="odometer-digit-spacer">
															<CountUp end={val?.count} />
														</span>
														{/* <span className="odometer-digit-inner">
												<span className="odometer-ribbon">
													<span className="odometer-ribbon-inner">
														<span className="odometer-value">5</span>
													</span>
												</span>
											</span> */}
													</span>
												</div>
											</span>
											<span className="symbol ml-2">+</span>
										</div>
										<h6 className="title">{val?.name}</h6>
									</div>
								</div>
							)
						})
					}
					
				</div>
			</div>
			<ul className="list-unstyled shape-group-10">
				{/* <!-- <li className="shape shape-1"><img src="joel_ui/media/others/line-9.png" alt="Circle"></li> --> */}
				<li className="shape shape-2">
					<img src={bobble1} alt="Circle" />
				</li>
				<li className="shape shape-3">
					<img src={bobble2} alt="Circle" />
				</li>
			</ul>
		</section>
	)
}
