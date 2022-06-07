import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatPropertyURL } from '../Properties/EachProperty'
import Global from '../../Global'

export default function SimilarProperties({ data }) {
	const [similar_list, setSimilarList] = useState([])
	const getSimilarData = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/properties/?location_keyword=${data?.location_keyword?.id}&_limit=5`
			)
			setSimilarList(res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getSimilarData()
	}, [getSimilarData])
	return (
		<div className="widget widget_fido_property">
			<h3 className="widget-title">Similar Properties</h3>

			{similar_list?.map((val, i) => {
				return (
					<article className="item" key={`similar-${i}`}>
						<Link
							style={{ zIndex: 0 }}
							to={{
								pathname: formatPropertyURL(val),
								state: val,
							}}
							className="thumb"
						>
							<span
								className="fullimage cover bg1"
								role="img"
								style={{ backgroundImage: `url(${val?.image_urls[0]})` }}
							></span>
						</Link>

						<div className="info">
							<h4 className="title usmall">
								<Link
									style={{ zIndex: 0 }}
									to={{
										pathname: formatPropertyURL(val),
										state: val,
									}}
								>
									{val?.name}
								</Link>
							</h4>
							<span>
								<i className="bx bx-map"></i> {val?.location?.slice(0, 20)}...
							</span>
							<div className="tag">{val?.categorie?.name}</div>
							<div className="price">
								{Global.currency}
								{window.formatedPrice.format(data.price)}/{' '}
							</div>
						</div>
					</article>
				)
			})}
		</div>
	)
	// return (
	// 	<div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
	// 		<div className="card-body d-flex align-items-center  p-4">
	// 			<h4 className="fw-700 mb-0 font-xssss text-grey-900">
	// 				Similar Properties
	// 			</h4>
	// 			<Link to="/flats" className="fw-600 ms-auto font-xssss text-primary">
	// 				See all
	// 			</Link>
	// 		</div>
	// 		{similar_list?.map((val, i) => {
	// 			return (
	// 				<Link
	// 					to={{
	// 						pathname: formatPropertyURL(val),
	// 						state: val,
	// 					}}
	// 				>
	// 					<article className="item">
	// 						<a style={{ zIndex: 0}} href="property-details.html" className="thumb">
	// 							<span className="fullimage cover bg1" role="img"></span>
	// 						</a>

	// 						<div className="info">
	// 							<h4 className="title usmall">
	// 								<a style={{ zIndex: 0}} href="property-details.html">Modern Apartment With Pool</a>
	// 							</h4>
	// 							<span>
	// 								<i className="bx bx-map"></i> 64 1st Avenue
	// 							</span>
	// 							<div className="tag">For Sell</div>
	// 							<div className="price">$2,500</div>
	// 						</div>
	// 					</article>
	// 				</Link>
	// 			)
	// 		})}
	// 	</div>
	// )
}
