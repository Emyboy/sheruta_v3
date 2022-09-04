import { Avatar } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Global from '../../Global'
import requestUtils from '../../utils/request.utils'
import { IoCallSharp } from 'react-icons/io5'

export default function P2pProperties() {
	const [list, setList] = useState([])

	const getRecentP2PRequests = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/property-requests/?is_searching=false&_limit=${
						Global.isMobile ? '8' : '4'
					}&_sort=created_at:DESC`
			)
			setList(res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getRecentP2PRequests()
	}, [getRecentP2PRequests])

	return (
		<div className="new-added-properties-area bg-201c2d ptb-100">
			<div className="container">
				<div className="section-title">
					<h3>Recent P2P Properties</h3>
					<p>List of P2P Available Properties</p>
				</div>

				<div className="row justify-content-center">
					{list.map((val, i) => {
						return (
							<div className="col-lg-6 col-md-6" key={`each-p2p-${i}`}>
								<EachP2pDemoProperty data={val} />
							</div>
						)
					})}
				</div>

				<div className="view-properties-btn">
					<Link to={`/flat/submit`} className="default-btn">
						UPLOAD YOU APARTMENT<span></span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export const EachP2pDemoProperty = ({ data }) => {
	const _user = data?.users_permissions_user
	return (
		<div className="single-new-added-properties with-white-color">
			<div className="row justify-content-center">
				<div className="col-lg-6 col-md-12">
					<div
						className="properties-image "
						style={{
							backgroundImage: `url(${data?.image_url[0]})`,
							minHeight: '200px',
							backgroundPosition: 'center',
							backgroundSize: 'cover',
						}}
					>
						{/* <img src={data?.image_url[0]} alt="property" /> */}

						<div className="tag">
							<Link
								to={requestUtils.renderRequestURL(data)}
								data-lightbox="roadtrip"
								className="position-relative d-block"
							>
								{data?.statu?.name}
							</Link>
						</div>
						<div className="price">
							{Global.currency}
							{window.formattedPrice.format(
								data?.rent_per_room ? data?.rent_per_room : data?.budget
							)}
							{data?.payment_type && (
								<small>/{data?.payment_type.abbreviation}</small>
							)}
						</div>
					</div>
				</div>

				<div className="col-lg-6 col-md-12">
					<div className="properties-content">
						<span>{data?.location}</span>
						<Link
							to={requestUtils.renderRequestURL(data)}
							data-lightbox="roadtrip"
							className="position-relative d-block mb-3"
						>
							<p>{data?.body?.slice(0, 80)}...</p>
						</Link>

						<ul className="list">
							<li>
								<i className="bx bx-bed"></i> {data?.bedrooms} Bedrooms
							</li>
							<li>
								<i className="bx bxs-bath"></i> {data?.bathrooms} Baths
							</li>
							<li>
								<i className="bx bxs-bath"></i> {data?.toilets} Toilets
							</li>
						</ul>
						<hr />
						<div className="blog-bottom-content d-flex justify-content-between align-items-center">
							<div className="blog-author d-flex align-items-center">
								<Avatar
									src={_user?.avatar_url}
									className="rounded-circle mb-0 mr-3"
									alt="image"
								/>
								<span className="m-0">
									<Link to={`/user/${_user?.username}`}>
										{_user?.first_name}
										{/* {moment(data?.created_at).fromNow()} */}
									</Link>
								</span>
							</div>

							{/* <p><i className="bx bx-calendar"></i>February 25, 2022</p> */}
							<Link className="bg-theme text-white btn" to="/signup">
								Call Me <IoCallSharp size={20} />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
