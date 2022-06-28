import React from 'react'
import { Link } from 'react-router-dom'
import img from '../img/afro.jpg'

export default function AboutNew() {
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
							<h3>Why Post Your Space?</h3>
							<p>
								Vet and select verified prospective flatmates and occupants
								within the community, from professionals to entrepreneurs and
								students, the choice is yours. click button below to get
								started.
							</p>
							<p>
								Vet and select verified prospective flatmates and occupants
								within the community, from professionals to entrepreneurs and
								students, the choice is yours. click button below to get
								started.
							</p>

							<div className="solution-btn">
								<Link to="/flat/submit" className="default-btn text-white">
									Post Now <span></span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
