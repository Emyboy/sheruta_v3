import React from 'react'

export default function AgentCard({ data }) {
	return (
		<div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 pb-4 pt-4">
			<div className="card-body d-block w-100 p-4 text-center">
				<figure className="avatar ms-auto me-auto mb-0 position-relative w90 z-index-1">
					<img
						src={data?.avatar_url}
						alt="image"
						className="float-right p-1 bg-white rounded-circle w-100"
					/>
				</figure>
				<div className="clearfix"></div>
				<h4 className="fw-700 font-xss mt-3 mb-0">
					{data?.first_name} {data?.last_name}
				</h4>
				<p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">
					{data?.email}
				</p>
				<ul className="d-flex align-items-center justify-content-center mt-1">
					<li className="m-2">
						<h4 className="fw-700 font-sm">
							500+{' '}
							<span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
								Inspections
							</span>
						</h4>
					</li>
					<li className="m-2">
						<h4 className="fw-700 font-sm">
							88.7 k{' '}
							<span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
								Properties
							</span>
						</h4>
					</li>
					<li className="m-2">
						<h4 className="fw-700 font-sm">
							1,334{' '}
							<span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
								Reviews
							</span>
						</h4>
					</li>
				</ul>

				<span className="btn-round-lg bg-current text-white font-xxl ms-auto mt-2">
					<i className="feather-phone"></i>
				</span>
			</div>
		</div>
	)
}
