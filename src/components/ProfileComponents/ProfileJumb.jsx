import { Tooltip } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Global from '../../Global';
import VerifiedBadge from '../VerifiedBadge/VerifiedBadge';
import store from '../../redux/store/store'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function ProfileJumb({ user }) {
	const deactivated = user.deactivated;
	const auth = store.getState().auth;

	return (
		<div className="col-lg-12 p-0">
			<div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
				<div
					className="card-body p-0 rounded-xxl overflow-hidden m-3"
					style={{ height: '10rem' }}
				>
					<LazyLoadImage
						src="https://picsum.photos/400/300"
						alt="image"
						height="500"
						width="100%"
						effect="blur"
					/>
				</div>
				<div className="card-body p-0 position-relative">
					<figure
						className="avatar position-absolute w100 z-index-0"
						style={{ top: '-40px', left: '30px' }}
					>
						<LazyLoadImage
							src={
								deactivated ? Global.USER_PLACEHOLDER_AVATAR : user.avatar_url
							}
							alt="image"
							effect='blur'
							className="float-right p-1 bg-white rounded-circle w-100"
						/>
					</figure>
					<h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
						<div className="d-flex">
							{deactivated ? '.... ....' : user.first_name}
							<VerifiedBadge user={user} className={'ml-2'} />{' '}
						</div>
						<span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">
							@{deactivated ? '......' : user.username}
						</span>
					</h4>
					{!deactivated && auth.user ? (
						<div className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
							<Tooltip placement="top" title={`Call ${user.first_name}`}>
								<a
									href={`tel:${user.phone_number}`}
									className="d-none d-lg-block bg-success p-3 z-index-0 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3"
								>
									<i className="feather-phone font-md"></i>
								</a>
							</Tooltip>
							<Tooltip placement="top" title={`Chat with ${user.first_name}`}>
								<Link to={`/messages/new/${user.id}`}>
									<a className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700">
										<i className="feather-mail font-md"></i>
									</a>
								</Link>
							</Tooltip>
							{/* <a
							href="#"
							id="dropdownMenu4"
							className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<i className="ti-book font-md tetx-dark"></i>
						</a> */}
						</div>
					) : (
						<div className="badge badge-success d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
							Login To Call
						</div>
					)}
				</div>

				{/* <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
					<ul
						className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
						id="pills-tab"
						role="tablist"
					>
						<li className="active list-inline-item me-5">
							<a
								className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active"
								href="#navtabs1"
								data-toggle="tab"
							>
								About
							</a>
						</li>
						<li className="list-inline-item me-5">
							<a
								className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
								href="#navtabs2"
								data-toggle="tab"
							>
								My Requests
							</a>
						</li>
						<li className="list-inline-item me-5">
							<a
								className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
								href="#navtabs3"
								data-toggle="tab"
							>
								My Contacts
							</a>
						</li>
						
					</ul>
				</div> */}
			</div>
		</div>
	)
}
