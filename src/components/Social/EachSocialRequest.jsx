import React, { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { Tag, Modal } from 'antd'
import Global from '../../Global'
import UserAction from '../UserAction/UserAction'
import DeactivatedBanner from '../DeactivatedBanner/DeactivatedBanner'
import VerifiedBadge from '../VerifiedBadge/VerifiedBadge'
import { useSelector } from 'react-redux'
import EachRequestOptions from './EachRequestOptions'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import requestUtils from '../../utils/request.utils'
import ErrorBoundary from '../ErrorBoundries/ErrorBoundary'
import { MdOutlineArrowUpward } from 'react-icons/md'
import Promote from '../Ads/Promote/Promote'
import { useDispatch } from 'react-redux'
// import { Modal } from 'react-bootstrap'

function EachRequest({ data, promoteCTA, allowPromote }) {
	const user = data?.users_permissions_user
	const deactivated = user?.deactivated
	const auth = useSelector((state) => state.auth)
	const authUser = auth.user
	const [deleted, setDeleted] = useState(false)
	const [showPromote, setPromote] = useState(false)
	const { payment_plan } = useSelector((state) => state.view);
	const dispatch = useDispatch();

	// if(!data?.heading){
	// 	return null
	// }

	if (deleted || data?.users_permissions_user?.deactivated) {
		return null
	}

	return (
		<ErrorBoundary>
			<article
				className={`card w-100 shadow-xss rounded-xxl ${
					!data?.is_searching && ' border-2 border-success'
				} p-3 mb-3`}
			>
				<div className="card-body p-0 d-flex">
					{user && (
						<figure className="avatar me-3">
							<LazyLoadImage
								src={
									deactivated
										? Global.USER_PLACEHOLDER_AVATAR
										: user?.avatar_url
								}
								alt={user?.first_name}
								className="shadow-sm rounded-circle w45"
								effect="blur"
							/>
						</figure>
					)}
					<h4 className="fw-700 text-grey-900 font-xssss mt-1 w-50">
						<Link
							to={`/user/${user?.username}`}
							className=" d-flex justify-context-evenly align-items-center"
						>
							<a className="text-dark">
								{deactivated ? '.... ....' : user?.first_name?.split(' ')[0]}{' '}
							</a>{' '}
							<VerifiedBadge
								user={user}
								className={'ml-2'}
								size={20}
								without_text
							/>
						</Link>
						<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
							{/* {moment(data?.created_at).fromNow()} */}@{user?.username}
						</span>
					</h4>
					<a
						className="ms-auto"
						id="dropdownMenu2"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
					</a>
					<EachRequestOptions
						data={data}
						deleted={deleted}
						setDeleted={setDeleted}
					/>
				</div>
				<div className="">
					<div className="row justify-content-between">
						{deactivated ? (
							<DeactivatedBanner />
						) : (
							<li className="col-sm-7 text-grey-500">
								<i className="ti-location-pin"></i> {data?.location}
							</li>
						)}
						<div className="col-sm-5 d-flex justify-content-end align-items-center">
							<div className="d-flex">
								{data?.category ? (
									<Tag color="cyan">{data?.category?.name?.toUpperCase()}</Tag>
								) : null}
								{data?.service ? (
									<Tag color="volcano">{data?.service?.name}</Tag>
								) : null}
								{/* {data?.service ? (
								<h6 className="d-inline-block p-2 text-light bg-theme fw-600 font-xssss rounded-3 me-2">
									{data?.service.name}
								</h6>
							) : null}
							{data?.category ? (
								<h6 className="d-inline-block p-2 text-dark badge-secondary fw-600 font-xssss rounded-3 me-2">
									{data?.category.name}
								</h6>
							) : null} */}
							</div>
						</div>
					</div>
				</div>
				<div className="card-body p-0 me-lg-5 pt-2">
					<Link to={requestUtils.renderRequestURL(data)}>
						<p
							className="fw-500 text-grey-600 lh-26  w-100 mb-0"
							style={{ fontSize: '16px' }}
						>
							{data?.body && data?.body?.slice(0, 120)}
							<a className="fw-600 text-theme ms-2">See more</a>
						</p>
					</Link>
				</div>
				<div className="card-body d-block p-0 mt-3">
					{data?.image_url && data?.image_url?.length > 0 && (
						<Link
							to={requestUtils.renderRequestURL(data)}
							data-lightbox="roadtrip"
							className="position-relative d-block"
						>
							<div className="d-flex">
								<div
									style={{
										backgroundImage: `url(${data?.image_url[0]})`,
										height: '250px',
										width: '400px',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										marginRight: '5px',
										borderRadius: '15px 0px 0px 15px',
									}}
								/>
								<div className="d-flex flex-column">
									<div
										style={{
											backgroundImage: `url(${data?.image_url[1]})`,
											height: '50%',
											width: Global.isMobile ? '170px' : '300px',
											backgroundSize: 'cover',
											backgroundPosition: 'center',
											marginBottom: '5px',
											borderRadius: '0px 15px 0px 0px',
										}}
									/>
									<div
										style={{
											backgroundImage: `url(${data?.image_url[2]})`,
											height: '50%',
											width: Global.isMobile ? '170px' : '300px',
											backgroundSize: 'cover',
											backgroundPosition: 'center',
											borderRadius: '0px 0px 15px 0px',
										}}
									>
										<div
											className="d-flex justify-content-center align-items-center"
											style={{
												background:
													data?.image_url.length - 3 > 0 ? '#00000086' : null,
												height: '100%',
												borderRadius: '0px 0px 15px 0px',
											}}
										>
											{data?.image_url?.length - 3 > 0 ? (
												<strong className="text-white font-xl">
													+{data?.image_url.length - 3}
												</strong>
											) : null}
										</div>
									</div>
								</div>
							</div>
						</Link>
					)}
					{/* {
						data?.image_url && data?.image_url.length > 0 && (
							<div className="row ps-2 pe-2 mt-4">
								{data?.image_url &&
									data?.image_url.map((img, i) => {
										if (i === 2) {
											return (
												<div className="col-xs-4 col-sm-4 p-1">
													<Link
														to={requestUtils.renderRequestURL(data)}
														data-lightbox="roadtrip"
														className="position-relative d-block"
													>
														<LazyLoadImage
															src={data?.image_url[i]}
															className="rounded-3 w-100"
															alt={data?.heading}
															effect="blur"
														/>
														{data?.image_url.length > 3 && (
															<span className="img-count font-sm text-white ls-3 fw-600">
																<b>+{data?.image_url.length - 3}</b>
															</span>
														)}
													</Link>
												</div>
											)
										} else if (i > 2) {
											return null
										} else {
											return (
												<div className="col-xs-4 col-sm-4 p-1">
													<Link to={requestUtils.renderRequestURL(data)}>
														<a data-lightbox="roadtrip">
															<LazyLoadImage
																src={img}
																className="rounded-3 w-100"
																alt="image"
																effect="blur"
															/>
														</a>
													</Link>
												</div>
											)
										}
									})}

								
							</div>
						)
					} */}
				</div>
				<div className="card-body row p-0 mt-3 mb-3 justify-content-between">
					<div className="d-flex align-items-center justify-content-start col-md-6">
						<div className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2">
							<span className="font-xss text-gray-600">
								{data?.is_searching
									? 'Budget'
									: data?.rent_per_room
									? 'A Room'
									: 'Rent'}
								:{' '}
							</span>
						</div>
						<figure className="mb-0 pl-1">
							{' '}
							<b style={{ fontSize: '17px' }} className="text-grey-600">
								{Global.currency}
								{window.formattedPrice.format(
									data?.rent_per_room ? data?.rent_per_room : data?.budget
								)}{' '}
								{data?.payment_type && (
									<small>/{data?.payment_type.abbreviation}</small>
								)}
							</b>
						</figure>
					</div>
					<div className="col-md-6">
						<UserAction
							alignment={!Global.isMobile ? 'between' : 'center'}
							className={Global.isMobile && 'mt-4'}
							user={user}
						/>
						{authUser && authUser?.user?.id === user?.id && allowPromote && (
							<div className="d-flex justify-content-end mt-3">
								<Modal
									closable={false}
									visible={showPromote}
									onCancel={() => {}}
									footer={null}
								>
									<Promote
										type={
											data?.is_searching
												? 'im_looking_request'
												: 'i_have_request'
										}
										request_id={data?.id}
										done={() => setPromote(false)}
									/>
									<div className="text-center">
										<button
											className="btn mb-4 text-danger"
											onClick={() => setPromote(false)}
										>
											Cancel
										</button>
									</div>
								</Modal>
								<button
									onClick={() =>
										!payment_plan
											? dispatch({
													type: 'SET_VIEW_STATE',
													payload: {
														showPaymentPopup: true
													},
											  })
											: setPromote(true)
									}
									className="bg-accent text-white btn rounded-xl"
								>
									Move To Top <MdOutlineArrowUpward />
								</button>
							</div>
						)}
					</div>
				</div>
			</article>
		</ErrorBoundary>
	)
}

export default memo(EachRequest)
