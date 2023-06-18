import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import PageLoader from '../../components/PageLoader'
// import MetaTags from 'react-meta-tags'
import Global from '../../Global'
import PageNotFound from '../../pages/PageNotFound'
import { Link } from 'react-router-dom'
import { notifyEmy } from '../../services/Sheruta'
import styled from 'styled-components'
import ImageViewer from 'react-simple-image-viewer'
import { notification, Tag } from 'antd'
import { ImLocation } from 'react-icons/im'
// import moment from 'moment'
// import VerifiedBadge from '../../components/VerifiedBadge/VerifiedBadge'
import Notifications from '../../services/Notifications'
import UserAction from '../../components/UserAction/UserAction'
import DeactivatedBanner from '../../components/DeactivatedBanner/DeactivatedBanner'
import { Redirect } from 'react-router'
import EachRequestOptions from '../../components/Social/EachRequestOptions'
import Analytics, { AnalyticsTypes } from '../../services/Analytics'
import RequestReview from './RequestReview'
import renderHTML from 'react-render-html'
import { BsFillPatchCheckFill, BsPhone } from 'react-icons/bs'
import { MdImage } from 'react-icons/md'
import { IoMail, IoCallSharp } from 'react-icons/io5'

const ImgContainer = styled.section`
	padding: 5em;
	margin-bottom: 1em;
	border-radius: 10px;
	background-size: cover;
	background-repeat: no-repeat;
`
export default function RequestDetails(props) {
	localStorage.setItem('after_login', window.location.pathname)
	const { id } = props.match.params
	const { user } = useSelector((state) => state.auth)
	const [showImages, setShowImages] = useState(false)
	const [request, setRequest] = useState(null)
	const [deleted, setDelete] = useState(false)
	const [state, setState] = useState({
		loading: true,
		notFound: false,
	})
	const auth = useSelector((state) => state.auth)
	const deactivated = request?.users_permissions_user.deactivated
	const tabs = ['More Details', 'Questions']
	const [currentTab, setCurrentTab] = useState(tabs[0])

	useEffect(() => {
		setState({ ...state, loading: true })
		axios(process.env.REACT_APP_API_URL + '/property-requests/?id=' + id)
			.then((res) => {
				console.log(res.data)
				if (res.data.length === 0) {
					setState({ ...state, notFound: true, loading: false })
				} else {
					setRequest(res.data[0])
					Analytics.create({
						request_id: res.data[0].id,
						user_id: res.data[0].users_permissions_user.id,
						type: AnalyticsTypes.requestView,
					})
					setState({ ...state, loading: false })
				}
				Notifications.notifyUser({
					owner: res.data[0].users_permissions_user.id,
					// users_permissions_user: user.user.id,
					title: 'viewed your request',
					sub_title: res.data[0].heading,
					type: 'request_view',
				})
			})
			.catch((err) => {
				console.log('ERROR ------', err)
				setState({ ...state, loading: false, notFound: true })
				notification.error({ message: 'Error fetching request data' })
			})
	}, [])

	useEffect(() => {
		if (request) {
			if (
				auth.user &&
				auth.user.user.id !== request?.users_permissions_user.id
			) {
				notifyEmy({
					heading: `${auth.user.user.first_name} ${auth.user.user.last_name} Viewed ${request?.users_permissions_user.first_name} ${request?.users_permissions_user.last_name}'s Request`,
					url: window.location.pathname,
				})
			} else if (!auth.user) {
				notifyEmy({
					heading: `Someone Viewed ${request?.users_permissions_user.first_name} ${request?.users_permissions_user.last_name}'s Request`,
					url: window.location.pathname,
				})
			}
		}
	}, [request])

	if (deleted) {
		return <Redirect to="/" />
	}

	if (state.loading) {
		return <PageLoader />
	} else if (state.notFound) {
		return <PageNotFound />
	} else
		return (
			<Layout>
				{/* <MetaTags>
					<title>{`${
						request?.is_searching ? `Looking for ${request?.category ? request?.category.name : 'mini flat, '} in` : `${request?.category ? request?.category.name : 'mini flat, '} for share in`
					} ${request.location.split(',')[0]} ? - ${
						request?.category.name
					}`}</title>
					<meta
						name="description"
						content={`${
							request?.is_searching
								? 'Searching for a flat in'
								: 'Available flat in'
						} ${request.location}`}
					/>
					<meta
						property="og:title"
						content={`${
							request?.is_searching
								? 'Looking for flat in'
								: 'Flat for share in'
						} ${request.location.split(',')[0]} - ${request?.category.name}`}
					/>
					<meta
						property="og:description"
						content={`${
							request?.is_searching
								? 'I am looking for a flat in'
								: 'There is an available flat in'
						} ${request.location}`}
					/>
					<meta
						name="keywords"
						content={`${request?.category ? request?.category.name : 'mini flat, '}, ${
							request?.service ? request?.service.name+"," : 'for share, '
						} ${request?.location?.split(' ').map(val => (` ${val}`))?.join().replace(',,',',')}`}
					/>
					<script type="application/ld+json">
					</script>
				</MetaTags> */}
				{showImages ? (
					<ImageViewer
						src={request?.image_url}
						currentIndex={0}
						onClose={() => {
							setShowImages(!showImages)
						}}
						disableScroll={false}
						backgroundStyle={{
							backgroundColor: 'rgb(0 0 0 / 91%)',
						}}
						closeOnClickOutside={true}
					/>
				) : null}
				<section className="pt-0">
					<div className={`container ${Global.isMobile && `p-0`}`}>
						<div
							className="row"
							style={{ paddingTop: !auth.user ? '15vh' : '10vh' }}
						>
							<div className="col-lg-12">
								<div className="row merged20 justify-content-center">
									<div className={`col-lg-9 ${Global.isMobile && 'p-0'}`}>
										{!request?.users_permissions_user.deactivated &&
										request?.image_url &&
										request?.image_url.length > 0 ? (
											// <ImgContainer
											// 	style={{
											// 		backgroundImage: `url(${request?.image_url[0]})`,
											// 	}}
											// >
											// 	<button
											// 		className="btn btn-dark btn-sm rounded shadow-lg"
											// 		onClick={() => setShowImages(!showImages)}
											// 	>
											// 		Show All Images
											// 	</button>
											// </ImgContainer>
											<div>
												<div
													className="card details-content bg-white rounded-xxl mb-4"
													style={{
														backgroundImage: `url(${request?.image_url[0]})`,
														backgroundRepeat: 'no-repeat',
														backgroundSize: 'cover',
														backgroundPosition: 'center',
														height: '20rem',
													}}
												>
													{showImages && (
														<ImageViewer
															src={request?.image_url}
															disableScroll={false}
															closeOnClickOutside={true}
															onClose={() => setShowImages(false)}
															backgroundStyle={{
																height: '70vh',
																marginTop: !Global?.isMobile ? '15vh' : '9vh',
															}}
														/>
													)}
													<div
														className="rounded d-flex justify-content-center align-items-center"
														style={{
															background: '#0606068c',
															width: '100%',
															height: '100%',
															position: 'absolute',
															top: 0,
															left: 0,
														}}
													>
														<button
															className="btn btn-lg bg-white shadow fw-bold"
															onClick={() => setShowImages(true)}
														>
															<MdImage size={30} /> View All Images
														</button>
													</div>
												</div>
											</div>
										) : null}

										<div className="property-details-desc">
											<div className="details-content card shadow-sm border-0 rounded-xxl">
												<ul className="tag-list">
													{request?.service && (
														<li className="tag-2 bg-dark text-white mr-3">
															{request?.service.name}
														</li>
													)}
													{request?.category && (
														<li className="tag">{request?.category.name}</li>
													)}
												</ul>

												{/* <div className="price">$2,500</div> */}

												<div className="content">
													<span>
														<ImLocation /> {request?.location}
													</span>
													<h3>
														<a href="property-details.html">
															₦ {window.formattedPrice.format(request?.budget)}
															<small className="text-muted">
																/
																{request?.payment_type &&
																	request?.payment_type.name}
															</small>
														</a>
													</h3>
													{request?.rent_per_room && (
														<div className="d-flex justify-content-between align-items-center mb-3">
															<div>
																<p className="mb-0">Rent Per Room</p>
																<h2 className="mt-1 fw-700">
																	₦{' '}
																	{window.formattedPrice.format(
																		request?.rent_per_room
																	)}{' '}
																	<small className="text-muted">
																		/
																		{request?.payment_type &&
																			request?.payment_type.name}
																	</small>
																</h2>
															</div>
														</div>
													)}
													{/* <p>
														Apartment <span>(78 sq.m)</span>
													</p> */}

													{request?.image_url?.length > 0 ? (
														<ul className="list">
															<li>
																<i className="bx bx-bed"></i>{' '}
																{request?.bedrooms} Bedrooms
															</li>
															<li>
																<i className="bx bxs-bath"></i>{' '}
																{request?.bathrooms} Baths
															</li>
															<li>
																<i className="bx bxs-bath"></i>{' '}
																{request?.toilets} Toilets
															</li>
														</ul>
													) : null}

													{/* <ul className="rating-list">
														<li>
															<i className="bx bxs-star"></i>
														</li>
														<li>
															<i className="bx bxs-star"></i>
														</li>
														<li>
															<i className="bx bxs-star"></i>
														</li>
														<li>
															<i className="bx bxs-star"></i>
														</li>
														<li className="color-gray">
															<i className="bx bxs-star"></i>
														</li>
														<li>Average</li>
													</ul> */}
												</div>
											</div>
										</div>

										<div className=" card rounded-xxl shadow-sm border-0 mb-4">
											<div className="details-description p-4">
												<h3>Description</h3>
												<div>
													{renderHTML(request?.body?.replace(/\n/g, '<br />'))}
												</div>
											</div>
										</div>

										<div className="widget-area p-0">
											<div className="widget widget_info pb-0 rounded-xxl bg-dark">
												<div className="info-box-one rounded-xxl py-3">
													<img
														src={request?.users_permissions_user.avatar_url}
														alt="user avatar"
													/>
													<h3 className="mb-1">
														{request?.users_permissions_user.first_name}{' '}
														{request?.users_permissions_user.is_verified ? (
															<BsFillPatchCheckFill className="mx-1" />
														) : null}
													</h3>
													<h6 className="text-white">
														@{request?.users_permissions_user?.username}
													</h6>
													{request?.users_permissions_user?.bio && (
														<small className="text-white">
															{request?.users_permissions_user?.bio}
														</small>
													)}
													<br />
												</div>
												{user?.user?.id !==
													request?.users_permissions_user?.id && (
													<div className="d-flex align-items-center my-3 justify-content-between">
														{/* {!request?.is_searching && (
														<div className="col-md-5 col-sm-12 d-flex justify-content-start p-0">
															<button className="btn default-btn btn-sm py-2">
																Pay Rent
															</button>
														</div>
													)} */}
														<div className="col-md-4- text-end col-sm-12 p-0 d-flex justify-content-end">
															{user?.user && (
																<Link
																	to={`/messages/new/${request?.users_permissions_user?.id}`}
																	className="text-white btn mx-1"
																>
																	<IoMail size={29} />
																</Link>
															)}
															<a
																href={
																	user
																		? `tel:${request?.users_permissions_user?.phone_number}`
																		: `/login`
																}
																className="text-white btn px-2"
																onClick={() => {}}
															>
																<IoCallSharp size={29} />
															</a>
														</div>
													</div>
												)}
											</div>
										</div>

										{request?.bedrooms || request?.bathrooms ? (
											<>
												<div className="card shadow-xss rounded-xxl border-0 mb-3 mt-5">
													<div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
														<ul
															className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
															id="pills-tab"
															role="tablist"
														>
															{tabs.map((val, i) => {
																return (
																	<li
																		className={`list-inline-item me-5 ${
																			currentTab === val && 'active'
																		}`}
																		key={i}
																		onClick={() => setCurrentTab(val)}
																	>
																		<a
																			className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
																				currentTab === val && 'active'
																			}`}
																			data-toggle="tab"
																		>
																			{val}
																		</a>
																	</li>
																)
															})}
														</ul>
													</div>
												</div>
												{currentTab === tabs[0] && (
													<div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3 additional_details">
														<div className="block-header border-bottom mb-4">
															<h2 className="block-title">
																<b className="text-grey-700">Property Info</b>
															</h2>
														</div>

														<div className="block-body ml-3">
															<ul className="dw-proprty-info row justify-content-between">
																<li className="col-6 col-md-3 mb-3">
																	<strong className="text-dark font-xssss">
																		Bedrooms:
																	</strong>
																	<br />
																	{request?.bedrooms}
																</li>
																<li className="col-6 col-md-3 mb-3">
																	<strong className="text-dark font-xssss">
																		Bathrooms:
																	</strong>
																	<br />
																	{request?.bathrooms}
																</li>
																<li className="col-6 col-md-3 mb-3">
																	<strong className="text-dark font-xssss">
																		Toilets:
																	</strong>
																	<br />
																	{request?.toilets}
																</li>
																<li className="col-6 col-md-3 mb-3">
																	<strong className="text-dark font-xssss">
																		Is Premium?
																	</strong>
																	<br />
																	{request?.is_premium ? 'Yes' : 'No'}
																</li>
																<li className="col-6 col-md-3 mb-3">
																	<strong className="text-dark font-xssss">
																		Service:
																	</strong>
																	<br />
																	{request?.service && request?.service.name}
																</li>
																<li className="col-6 col-md-3 mb-3">
																	<strong className="text-dark font-xssss">
																		Type:
																	</strong>
																	<br />
																	{request?.category && request?.category.name}
																</li>
																<li className="col-6 col-md-3 mb-3">
																	<strong className="text-dark font-xssss">
																		Rent
																	</strong>
																	<br />₦{' '}
																	{window.formattedPrice.format(
																		request?.budget
																	)}
																</li>
																{request?.rent_per_room && (
																	<li className="col-6 col-md-3 mb-3">
																		<strong className="text-dark font-xssss">
																			Per Room
																		</strong>
																		<br />₦{' '}
																		{window.formattedPrice.format(
																			request?.rent_per_room
																		)}
																	</li>
																)}

																<li className="col-6 col-md-3 mb-3">
																	<strong className="text-dark font-xssss">
																		State
																	</strong>
																	<br />
																	{request?.state && request?.state.name}
																</li>
															</ul>
														</div>
													</div>
												)}
											</>
										) : null}
										{currentTab === tabs[1] && (
											<RequestReview request={request} />
										)}
									</div>
									{/* <div className="col-lg-3"></div> */}
								</div>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		)
}
