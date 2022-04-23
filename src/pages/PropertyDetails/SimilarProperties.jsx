import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatPropertyURL } from '../Properties/EachProperty'

export default function SimilarProperties({ data }) {
	const [similar_list, setSimilarList] = useState([])
	const getSimilarData = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/properties/?location_keyword=${data?.location_keyword?.id}&_limit=3`
			)
			console.log('DATA -', res.data)
			setSimilarList(res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getSimilarData()
	}, [getSimilarData])

	return (
		<div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
			<div className="card-body d-flex align-items-center  p-4">
				<h4 className="fw-700 mb-0 font-xssss text-grey-900">
					Similar Properties
				</h4>
				<Link to="/flats" className="fw-600 ms-auto font-xssss text-primary">
					See all
				</Link>
			</div>
			{similar_list?.map((val, i) => {
				return (
					<Link
						to={{
							pathname: formatPropertyURL(val),
							state: val,
						}}
					>
						<div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
							<div
								className=" me-2 p-3 rounded-xxl"
								style={{
									backgroundImage: `url(${val?.image_urls[0]})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}}
							>
								<h4 className="fw-700 font-lg ls-3 lh-1 text-white mb-0">
									<span className="ls-1 d-block font-xsss text-white fw-600">
										BED
									</span>
									{val?.bedroom}
								</h4>
							</div>
							<>
								<h4 className="fw-700 text-grey-900 font-xssss mt-2">
									{val?.name}
									<span className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500 ">
										{data?.description?.slice(0, 30)}...
									</span>{' '}
									<h4 className='fw-700 text-grey-700 font-xssss mt-2"'>
										{window.formatedPrice.format(val.price)}
									</h4>
								</h4>
							</>
						</div>
					</Link>
				)
			})}
		</div>
	)
}
