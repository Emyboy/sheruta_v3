import React from 'react'

const EachReview = () => {
	return (
		<div className="col-lg-4 ">
			<div className="owl-item">
				<div className="customers-item">
					<div className="customers-info">
						<div className="image">
							<img src="assets/images/customers/image-2.jpg" alt="image" />
						</div>

						<h4>John Smith</h4>
						<span>Restaurant Owner</span>
					</div>
					<p>
						Proin gravida nibh vel velit attor aliquet. Aenean sollicitudin
						lorem quis bibendum auctor.
					</p>

					<ul className="rating-list">
						<li>
							<i className="bx bxs-star"></i>
						</li>
						<li>
							<i className="bx bxs-star"></i>
						</li>
						<li>
							<i className="bx bxs-star"></i>
						</li>
						<li>
							<i className="bx bxs-star"></i>
						</li>
						<li className="color-gray">
							<i className="bx bxs-star"></i>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default function AgentReview() {
	return (
		<div className="new-added-properties-area bg-201c2d ptb-100">
			<div className="container">
				<div className="section-title">
					<h3>Our Reviews By Customers</h3>
					<p>
						Proin gravida nibh vel velit auctor aliquet aenean sollicitudin
						lorem quis bibendum auctor nisi elit consequat ipsum nec sagittis
						sem nibh id elit.
					</p>
				</div>

				<div className="customers-slides owl-carousel owl-theme owl-loaded owl-drag">
					<div
						className="owl-stage-outer owl-height row"
						// style={{ height: '405.188px' }}
					>
						<EachReview />
						<EachReview />
						<EachReview />
					</div>
					{/* <div className="owl-nav">
						<button type="button" role="presentation" className="owl-prev">
							<i className="bx bx-left-arrow-alt"></i>
						</button>
						<button type="button" role="presentation" className="owl-next">
							<i className="bx bx-right-arrow-alt"></i>
						</button>
					</div>
					<div className="owl-dots disabled"></div> */}
				</div>
			</div>
		</div>
	)
}
