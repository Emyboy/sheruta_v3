import React, { useCallback, useEffect, useState } from 'react'
import img from '../../../assets/images/neighborhood/neighborhood-small-1.jpg'
import img2 from '../../../assets/images/neighborhood/map.png'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
					{location_keywords?.map((val, i) => {
						return (
							<EachLocationKeyword key={`location-keyword-${i}`} val={val} />
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

export const EachLocationKeyword = ({ val }) => {
	const [count, setCount] = useState(0)

	const getCount = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/properties/count/?location_keyword=${val?.id}`
			)
			setCount(res.data)
			console.log('THE COUNT --', res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getCount()
	}, [getCount])

	return (
		<article className="col-lg-4 col-md-6">
			<div className="single-neighborhood">
				<Link to={`/flats/?location=${val?.slug}`} style={{ width: '100%' }}>
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
						<Link to={`/flats/?location=${val?.slug}`}>{val?.name}</Link>
					</h3>
					<span>{count} Properties</span>
				</div>
			</div>
		</article>
	)
}
