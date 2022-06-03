import React from 'react'
import img from '../../../assets/images/neighborhood/neighborhood-small-1.jpg'
import img2 from '../../../assets/images/neighborhood/map.png'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function LocationKeywords() {
	const { location_keywords } = useSelector((state) => state.view)
	return (
		<div className="neighborhood-area ptb-100">
			<div className="container">
				<div className="section-title">
					<h3>Find The Neighborhood For You</h3>
					<p>
						Proin gravida nibh vel velit auctor aliquet aenean sollicitudin
						lorem quis bibendum auctor nisi elit consequat ipsum nec sagittis
						sem nibh id elit.
					</p>
				</div>

				<div className="row justify-content-center">
					{location_keywords.map((val, i) => {
						return (
							<div className="col-lg-4 col-md-6">
								<div className="single-neighborhood">
									<Link
										to={`/flats/for-share-in/${val?.slug}`}
										style={{ width: '100%' }}
									>
										{/* <img
											src={
												val?.background_img || 'https://picsum.photos/400/300'
											}
											alt="image"
										/> */}
										<div
											style={{
												backgroundImage: `url(${
													val?.background_img || 'https://picsum.photos/400/300'
												})`,
												backgroundRepeat: 'no-repeat',
												backgroundSize: 'cover',
												backgroundPosition: 'center',
												height: '160px',
												// width: '23rem',
											}}
											className="rounded"
										/>
									</Link>

									<div className="content">
										<h3>
											<Link to={`/flats/for-share/${val?.slug}`}>
												{val?.name}
											</Link>
										</h3>
										<span>12 Properties</span>
									</div>
								</div>
							</div>
						)
					})}
				</div>

				<div className="view-neighborhood-btn">
					<a href="neighborhood.html" className="default-btn">
						VIEW MORE AREAS <span></span>
					</a>
				</div>
			</div>

			<div className="neighborhood-map-shape">
				<img src={img2} alt="image" />
			</div>
		</div>
	)
}
