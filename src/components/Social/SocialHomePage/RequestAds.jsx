import React from 'react'
import { FaCrown } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EachSocialRequest from '../EachSocialRequest'

export default function RequestAds() {
	const { request_ads } = useSelector((state) => state?.ads)

	if (request_ads?.length === 0) {
		return null
	}

	return (
		<div>
			<h1>Premium Posts</h1>
			{request_ads?.map((val) => {
				return <EachSocialRequest data={val} />
			})}
			<div className="card bg-accent rounded-xxl mb-3 ">
				<div className="card-body">
					<div className="d-flex justify-content-between align-items-center">
						<div className="col-lg-7">
							<h1 className="text-white">Go premium now.</h1>
							<h6 className="text-white">
								Be the first to get the best deals with 3x visibility.
							</h6>
							<Link to="/pricing" className="mt-3 text-theme fw-bold">
								Learn More
							</Link>
						</div>
						<FaCrown size={50} className="text-warning mr-3" />
					</div>
				</div>
			</div>
		</div>
	)
}
