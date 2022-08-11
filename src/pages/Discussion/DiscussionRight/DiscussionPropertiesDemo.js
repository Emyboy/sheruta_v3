import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { formatPropertyURL } from '../../Properties/EachProperty'

export default React.memo(function DiscussionPropertiesDemo() {
	const { room_id } = useParams()
	const { location_keywords } = useSelector((state) => state.view)
	const [list, setList] = useState([])

	const keyword = location_keywords.filter((x) => x.id == room_id)[0]

	const getRecentProperties = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/properties/?location_keyword=${room_id}&_sort=created_at:DESC&_limit=9`
			)
			setList(res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [room_id])

	useEffect(() => {
		getRecentProperties()
	}, [getRecentProperties])

	return (
		<div className="bg-white pb-4">
			<div className="d-flex justify-content-between align-items-center p-2 mb-1">
				<h4 className="fw-500 text-grey-600 mb-0">Properties</h4>
				<Link to={`/flats/?location=${keyword?.slug}`}>
					<small>View More </small>
				</Link>
			</div>
			<div className="container scroll-bar pl-1">
				<div className="d-flex pb-3">
					{list.map((val, i) => {
						return (
							<div className="col-9 pl-0" key={`prop-${val?.id}`}>
								<Link
									to={{
										pathname: formatPropertyURL(val),
										state: val,
									}}
									className="rounded-xxl shadow-sm w-100"
									style={{
										backgroundImage: `url(${val?.image_urls[0]})`,
										height: '190px',
										backgroundPosition: 'center',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat'
									}}
								>
									<i
										className="text-white ml-2 pl-2 pr-2 rounded-xxl"
										style={{ background: '#060d05' }}
									>
										₦{window.formattedPrice.format(val.price)}
									</i>
								</Link>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
})
