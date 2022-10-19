import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function EachMyContact({ val }) {
	return (
		<div className="col-md-4 col-sm-6 pe-2 ps-2">
			<div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
				<div className="card-body d-block w-100 p-4 text-center">
					<Link to={`/user/${val?.user?.username}`}>
						<figure className="avatar ms-auto me-auto mb-0 position-relative w90 z-index-1">
							<img
								src={val?.user?.avatar_url}
								alt="image"
								className="float-right p-1 bg-white rounded-circle w-100"
							/>
						</figure>
						<div className="clearfix"></div>
						<h4 className="fw-700 font-xss mt-3 mb-0">
							{val?.user?.first_name}
						</h4>
						<p className="fw-500 font-xssss text-grey-500 mt-0 mb-0">
							N{window.formattedPrice.format(val?.user?.budget)} -{' '}
							{val?.looking_for ? 'Budget' : 'Rent'}
						</p>
					</Link>
                    <br />
					{/* <ul className="d-flex align-items-center justify-content-center mt-1">
						<li className="m-2">
							<h4 className="fw-700 font-sm">
								500+{' '}
								<span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
									Connections
								</span>
							</h4>
						</li>
						<li className="m-2">
							<h4 className="fw-700 font-sm">
								88.7 k{' '}
								<span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
									Follower
								</span>
							</h4>
						</li>
						<li className="m-2">
							<h4 className="fw-700 font-sm">
								1,334{' '}
								<span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
									Followings
								</span>
							</h4>
						</li>
					</ul> */}

					<a
						href={`tel:${val?.user?.phone_number}`}
						className="mt-4 p-0 btn p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xssss fw-700 ls-lg text-white"
					>
						<FaPhoneAlt size={20} /> Call Me
					</a>
				</div>
			</div>
		</div>
	)
}
