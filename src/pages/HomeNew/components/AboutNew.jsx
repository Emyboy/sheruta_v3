import React from 'react'
import { Link } from 'react-router-dom'
import img from '../img/afro.jpg'

export default function AboutNew({
	heading,
	bodyComponent,
	ctaText,
	ctaURL
}) {
	return (
		<div className="solution-area pt-5 bg-white">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-6 col-md-12">
						<div className="solution-image">
							<img src={img} alt="image" />
						</div>
					</div>

					<div className="col-lg-6 col-md-12">
						<div className="solution-content">
							<h3>{heading}</h3>
							{bodyComponent}

							<div className="solution-btn">
								{ctaText && ctaURL && (
									<Link to={ctaURL} className="default-btn text-white">
										{ctaText} <span></span>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
