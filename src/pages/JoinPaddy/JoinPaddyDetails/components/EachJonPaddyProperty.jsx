import React from 'react'
import { Modal } from 'antd'
import { useState } from 'react'
import JoinPaddyPropertyDetails from './JoinPaddyPropertyDetails'

export default function EachJonPaddyProperty({ data }) {
	console.log('DATA --', data)

	const [showDetails, setShowDetails] = useState(false)
	return (
		<>
			<Modal
				footer={null}
				visible={showDetails}
				onCancel={() => setShowDetails(false)}
				closable={false}
				width={1000}
				bodyStyle={{ padding: 0}}
			>
				<JoinPaddyPropertyDetails data={data} />
				<hr />
				<button
					className="btn btn-danger w-50 ml-3 mb-3"
					onClick={() => setShowDetails(false)}
				>
					Close
				</button>
			</Modal>
			<div
				// data-bs-toggle="modal"
				// data-bs-target="#Modalstory"
				className="card w-100 h300 d-block border-0 shadow-xss rounded-xxxl bg-gradiant-bottom overflow-hidden cursor-pointer mb-3 mt-3"
				style={{
					backgroundImage: `url(${data?.image_urls[0]})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
				onClick={() => setShowDetails(true)}
			>
				<div className="card-body d-block p-1 pb-3 w-100 position-absolute bottom-0 text-center">
					<a>
						<small className="p-1 rounded shadow bg-accent text-white fw-700 z-index-3">
							View Details
						</small>
						{/* <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
							<img
                            src="images/user-2.png"
                            alt="image"
                            className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
							/>
						</figure> */}
						<div className="clearfix"></div>
						<h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">
							{data?.description.slice(0, 60)} ...
						</h4>
					</a>
				</div>
			</div>
		</>
	)
}
