import React from 'react'

export default function RecentBookingFeed() {
	return (
		<div className="card w-100 shadow-xss rounded-xxl border-0 p-0 ">
			<div className="card-body d-flex align-items-center p-4 mb-0">
				<h4 className="fw-700 mb-0 font-xssss text-grey-900">Recent Groups</h4>
				<a
					href="default-member.html"
					className="fw-600 ms-auto font-xssss text-primary"
				>
					See all
				</a>
			</div>
			<div className="card-body bg-transparent-card d-flex p-3 bg-greylight ms-3 me-3 rounded-3">
				<figure className="avatar me-2 mb-0">
					<img
						src="images/user-7.png"
						alt="image"
						className="shadow-sm rounded-circle w45"
					/>
				</figure>
				<h4 className="fw-700 text-grey-900 font-xssss mt-2">
					Anthony Daugloi{' '}
					<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
						12 mutual friends
					</span>
				</h4>
				<a
					href="#"
					className="btn-round-sm bg-white text-grey-900 feather-chevron-right font-xss ms-auto mt-2"
				></a>
			</div>
			<div
				className="card-body bg-transparent-card d-flex p-3 bg-greylight m-3 rounded-3"
				style={{ marginBottom: '0' }}
			>
				<figure className="avatar me-2 mb-0">
					<img
						src="images/user-8.png"
						alt="image"
						className="shadow-sm rounded-circle w45"
					/>
				</figure>
				<h4 className="fw-700 text-grey-900 font-xssss mt-2">
					{' '}
					David Agfree{' '}
					<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
						12 mutual friends
					</span>
				</h4>
				<a
					href="#"
					className="btn-round-sm bg-white text-grey-900 feather-plus font-xss ms-auto mt-2"
				></a>
			</div>
			<div className="card-body bg-transparent-card d-flex p-3 bg-greylight m-3 rounded-3">
				<figure className="avatar me-2 mb-0">
					<img
						src="images/user-12.png"
						alt="image"
						className="shadow-sm rounded-circle w45"
					/>
				</figure>
				<h4 className="fw-700 text-grey-900 font-xssss mt-2">
					Hugury Daugloi{' '}
					<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
						12 mutual friends
					</span>
				</h4>
				<a
					href="#"
					className="btn-round-sm bg-white text-grey-900 feather-plus font-xss ms-auto mt-2"
				></a>
			</div>
		</div>
	)
}
