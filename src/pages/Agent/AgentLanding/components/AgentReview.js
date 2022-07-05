import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Global from '../../../../Global'
import requestUtils from '../../../../utils/request.utils'

const EachReview = ({ val }) => {
	const user = val.users_permissions_user
	return (
		<div className="col-lg-4 ">
			<div className="owl-item">
				<div className="customers-item">
					<Link className="customers-info" to={`${requestUtils.renderRequestURL(val)}`}>
						<div className="image">
							<img src={user?.avatar_url} alt="image" />
						</div>

						<h4>{val?.users_permissions_user?.first_name?.split(' ')[0]}</h4>
						<span>
							{val?.body && val?.body?.slice(0, 120)}
							<a className="fw-600 text-theme ms-2">See more</a>
						</span>
					</Link>
					<p>
						Budget:{' '}
						<strong>
							{Global.currency}
							{window.formattedPrice.format(val?.budget)}
						</strong>
					</p>

					<ul className="rating-list">
						<li>
							<a href={`tel:${user?.phone_number}`} className="btn bg-theme text-white">
								Call Me <i className="bx bxs-phone text-white"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default function AgentReview() {
	const [data, setData] = useState([])

	useEffect(() => {
		;(async () => {
			try {
				const res = await axios(
					process.env.REACT_APP_API_URL +
						`/property-requests/?is_searching=true&_limit=3`
				)
				setData(res.data)
			} catch (error) {
				return Promise.reject(error)
			}
		})()
	}, [])

	return (
		<div className="new-added-properties-area bg-201c2d ptb-100">
			<div className="container">
				<div className="section-title">
					<h3>Our communities request</h3>
					<p>
						Here are some request made by community members, list your your
						spaces to reach more like them.
					</p>
				</div>

				<div className="customers-slides owl-carousel owl-theme owl-loaded owl-drag">
					<div
						className="owl-stage-outer owl-height row"
						// style={{ height: '405.188px' }}
					>
						{data.map((val, i) => {
							return <EachReview key={`review-${i}`} val={val} />
						})}
					</div>
					{/* <div className="owl-nav">
						<button type="button" role="presentation" className="owl-prev">
							<i className="bx bx-left-arrow-alt"></i>
						</button>
						<button type="button" role="presentation" className="owl-next">
							<i className="bx bx-right-arrow-alt"></i>
						</button>
					</div>
					<div className="owl-dots disabled"></div> */}
				</div>
			</div>
		</div>
	)
}
