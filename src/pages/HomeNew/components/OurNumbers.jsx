import React from 'react'

const data = [
	{
		name: 'Email List',
		count: 4200,
		// icon: <AiFillMail size={iconSize} />,
	},
	{
		name: 'User Activity',
		count: 1800,
		// icon: <HiUsers size={iconSize} />,
	},
	{
		name: 'Monthly Subscribers',
		count: 300,
		// icon: <FaMoneyBillWave size={iconSize} />,
	},
	{
		name: 'Successful Paring',
		count: 150,
		// icon: <FaUserPlus size={iconSize} />,
	},
]

export default function OurNumbers() {
	return (
		<div className="fun-facts-area">
			<div className="container pb-70">
				<div className="category-inner-box">
					{/* <div className="row justify-content-center">
						<div className="col-lg-2 col-sm-6 col-md-6">
							<div className="single-category">
								<a href="property.html">
									<img
										src="assets/images/category/category-1.png"
										alt="image"
									/>
								</a>
								<h3>
									<a href="property.html">Apartments</a>
								</h3>
							</div>
						</div>

						<div className="col-lg-2 col-sm-6 col-md-6">
							<div className="single-category">
								<a href="property.html">
									<img
										src="assets/images/category/category-2.png"
										alt="image"
									/>
								</a>
								<h3>
									<a href="property.html">Houses</a>
								</h3>
							</div>
						</div>

						<div className="col-lg-2 col-sm-6 col-md-6">
							<div className="single-category">
								<a href="property.html">
									<img
										src="assets/images/category/category-3.png"
										alt="image"
									/>
								</a>
								<h3>
									<a href="property.html">Daily Rental</a>
								</h3>
							</div>
						</div>

						<div className="col-lg-2 col-sm-6 col-md-6">
							<div className="single-category">
								<a href="property.html">
									<img
										src="assets/images/category/category-4.png"
										alt="image"
									/>
								</a>
								<h3>
									<a href="property.html">Commercial</a>
								</h3>
							</div>
						</div>

						<div className="col-lg-2 col-sm-6 col-md-6">
							<div className="single-category">
								<a href="property.html">
									<img
										src="assets/images/category/category-5.png"
										alt="image"
									/>
								</a>
								<h3>
									<a href="property.html">Office</a>
								</h3>
							</div>
						</div>

						<div className="col-lg-2 col-sm-6 col-md-6">
							<div className="single-category">
								<a href="property.html">
									<img
										src="assets/images/category/category-6.png"
										alt="image"
									/>
								</a>
								<h3>
									<a href="property.html">New Buildings</a>
								</h3>
							</div>
						</div>
					</div> */}
				</div>
			</div>

			<div className="container pb-100">
				<div className="section-title">
					<h3>Our Achievement</h3>
					<p>
						We are proud of our achievements even with no funding. we will keep
						improving on the value to both you as an partner agent and the flat
						share community.
					</p>
				</div>

				<div className="row justify-content-center">
					{data.map((val, i) => {
						return (
							<div
								className="col-lg-3 col-md-6 col-sm-6"
								key={`our-number-${i}`}
							>
								<div className="single-fun-fact">
									<h3>
										<span
											className="odometer odometer-auto-theme"
											data-count="10245"
										>
											<div className="odometer-inside">
												<span className="odometer-digit">
													<span className="odometer-digit-spacer">
														{val.count}
													</span>
													<span className="sign-icon ml-3">+</span>
												</span>
											</div>
										</span>
									</h3>
									<p>{val.name}</p>
								</div>
							</div>
						)
					})}
				</div>

				{/* <div className="fun-text">
					<p>
						Proin gravida nib vel velit auctor aliquet aenean sollicitudin lorem{' '}
						<a href="about.html">About Us</a>
					</p>
				</div> */}
			</div>
		</div>
	)
}
