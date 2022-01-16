import React from 'react'

export default function EachPaddyCard({ data }) {
	console.log(data)

	const renderLocations = (location) => {
		const locs = location.split(',')
		if (locs.length > 1) {
			return locs[1]
		} else {
			return locs[0]
		}
	}

	return (
		<div className="card p-3 bg-white w-100 hover-card border-0 shadow-xss rounded-xxl border-0 mb-3 overflow-hidden ">
			{/* <div className="card-image w-100">
				<img src="images/e-1.jpg" alt="event" className="w-100 rounded-3" />
			</div> */}
			<div className="card-body d-flex ps-0 pe-0 pb-0">
				<div className="bg-greylight me-3 p-3 border-light-md rounded-xxl theme-dark-bg">
					<h4 className="fw-700 font-lg ls-3 text-grey-900 mb-0">
						<span className="ls-3 d-block font-xsss text-grey-500 fw-500">
							FEB
						</span>
						22
					</h4>
				</div>
				<h2 className="fw-700 lh-3 font-xss">
					{data?.owner?.first_name.split(' ')[0]}'s group
					<span className="d-flex font-xssss fw-500 mt-2 lh-3 text-grey-500">
						{' '}
						<i className="ti-location-pin me-1"></i>{' '}
						{data?.user_preferred_locations.map(
							(val,i) =>
								renderLocations(val.location) +
								`${i !== data?.user_preferred_locations.length - 1 && ' & '}`
						)}{' '}
					</span>
				</h2>
			</div>
			<div className="card-body p-0">
				<ul className="memberlist mt-4 mb-2 ms-0 d-inline-block">
					<li>
						<a href="#">
							<img
								src={data?.owner?.avatar_url}
								alt="user"
								className="w30 d-inline-block rounded-xxl"
							/>
						</a>
					</li>
					{data?.guests?.map((val, i) => {
						if (i < 4) {
							return (
								<li key={`user-${i}`}>
									<a href="#">
										<img
											src={val.avatar_url}
											alt="user"
											className="w30 d-inline-block rounded-xxl"
										/>
									</a>
								</li>
							)
						}
					})}

					<li className="last-member">
						<a
							href="#"
							className="bg-greylight fw-600 text-grey-500 font-xssss ls-3 text-center"
						>
							+2
						</a>
					</li>
				</ul>
				<a
					href="#"
					className="font-xsssss fw-700 ps-3 pe-3 lh-32 float-right mt-4 text-uppercase rounded-3 ls-2 bg-success d-inline-block text-white me-1"
				>
					JOIN
				</a>
			</div>
		</div>
	)
}
