import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import PageLoader from '../../components/PageLoader'
import MetaTags from 'react-meta-tags'
import Global from '../../Global'
import PageNotFound from '../../pages/PageNotFound'
import { Link } from 'react-router-dom'
import { notifyEmy } from '../../services/Sheruta'
import styled from 'styled-components'
import ImageViewer from 'react-simple-image-viewer'
import { notification, Tag } from 'antd'
import { ImLocation } from 'react-icons/im'
import moment from 'moment'
import VerifiedBadge from '../../components/VerifiedBadge/VerifiedBadge'
import Notifications from '../../services/Notifications'
import UserAction from '../../components/UserAction/UserAction'
import DeactivatedBanner from '../../components/DeactivatedBanner/DeactivatedBanner'
import { Redirect } from 'react-router'
import EachRequestOptions from '../../components/Social/EachRequestOptions'
import Analytics, { AnalyticsTypes } from '../../services/Analytics'
const ImgContainer = styled.section`
	padding: 5em;
	margin-bottom: 1em;
	border-radius: 10px;
	background-size: cover;
	background-repeat: no-repeat;
`
export default function RequestDetails(props) {
	localStorage.setItem('after_login', window.location.pathname)
	const { uid } = props.match.params
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

	useEffect(() => {
		setState({ ...state, loading: true })
		axios(process.env.REACT_APP_API_URL + '/property-requests/?uuid=' + uid)
			.then((res) => {
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
				auth.user.user.id !== request.users_permissions_user.id
			) {
				notifyEmy({
					heading: `${auth.user.user.first_name} ${auth.user.user.last_name} Viewed ${request.users_permissions_user.first_name} ${request.users_permissions_user.last_name}'s Request`,
					url: window.location.pathname,
				})
			} else if (!auth.user) {
				notifyEmy({
					heading: `Someone Viewed ${request.users_permissions_user.first_name} ${request.users_permissions_user.last_name}'s Request`,
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
				<MetaTags>
					<title>{request.heading} | Request</title>
					<meta name="description" content={request.body} />
					<meta property="og:title" content={request.heading + ' | Request'} />
					<meta
						property="og:description"
						content={`${request.users_permissions_user.first_name} ${request.users_permissions_user.last_name} says: ${request.body}`}
					/>
					<meta
						name="keywords"
						content={`${request.category ? request.category.name : null}, ${
							request.service ? request.service.name : null
						}`}
					/>
					<script type="application/ld+json">
						{/* {makeJobSchema(request)} */}
					</script>
				</MetaTags>
				{showImages ? (
					<ImageViewer
						src={request.image_url}
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
										<div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
											<div className="d-flex">
												<div className="card-body p-0 d-flex">
													{request.users_permissions_user && (
														<figure className="avatar me-3">
															<img
																src={
																	deactivated
																		? Global.USER_PLACEHOLDER_AVATAR
																		: request.users_permissions_user.avatar_url
																}
																alt="image"
																className="shadow-sm rounded-circle w45"
															/>
														</figure>
													)}
													<h4 className="fw-700 text-grey-900 font-xssss mt-1">
														<Link
															to={`/user/${request.users_permissions_user.username}`}
														>
															<a className="text-dark d-flex">
																{deactivated
																	? '..... .....'
																	: request.users_permissions_user
																			.first_name}{' '}
																<VerifiedBadge
																	user={request.users_permissions_user}
																	className={'ml-2'}
																	size={'15'}
																/>
															</a>
														</Link>
														<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
															{moment(request.created_at).fromNow()}
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
														data={request}
														deleted={deleted}
														setDeleted={() => setDelete(true)}
													/>
												</div>
											</div>
											<div className="post-meta">
												<h1
													style={{
														fontSize: Global.isMobile ? '18px' : '22px',
														fontWeight: 'bold',
													}}
												>
													{request.heading}
												</h1>
												{!request.users_permissions_user.deactivated &&
												request.image_url &&
												request.image_url.length > 0 ? (
													<ImgContainer
														style={{
															backgroundImage: `url(${request.image_url[0]})`,
														}}
													>
														<button
															className="btn btn-dark btn-sm rounded shadow-lg"
															onClick={() => setShowImages(!showImages)}
														>
															Show All Images
														</button>
													</ImgContainer>
												) : null}
												<div className="container-fluid pl-3">
													<div className="row justify-content-between">
														{deactivated ? (
															<DeactivatedBanner />
														) : (
															<div
																className="d-flex col-md-8 pl-0 text-dark"
																style={{
																	alignItems: 'center',
																}}
															>
																<span
																	style={{
																		alignSelf: 'center',
																	}}
																>
																	<ImLocation />
																</span>{' '}
																{request.location}
															</div>
														)}
													</div>
												</div>
												<div className="description mt-3">
													<p
														style={{
															fontSize: '16px',
														}}
													>
														{request.body}
													</p>
												</div>
												<div className="d-flex justify-content-between align-items-center">
													<div>
														<small className="mb-0">
															{request.is_searching
																? 'My Budget:'
																: 'Total Rent:'}
														</small>
														<h2 className="mt-1 fw-700">
															₦ {window.formatedPrice.format(request.budget)}{' '}
															<small className="text-muted">
																/
																{request.payment_type &&
																	request.payment_type.name}
															</small>
														</h2>
													</div>
													<div
														className="d-flex"
														style={{
															alignItems: 'center',
														}}
													>
														<div className="ml-2">
															{request.category && (
																<Tag color="volcano">
																	{request.category.name}
																</Tag>
															)}
															{request.service && (
																<Tag color="cyan">{request.service.name}</Tag>
															)}
														</div>
													</div>
												</div>
												{request.rent_per_room && (
													<div className="d-flex justify-content-between align-items-center">
														<div>
															<small className="mb-0">
																{request.is_searching
																	? 'Min Budget:'
																	: 'Rent Per Room:'}
															</small>
															<h2 className="mt-1 fw-700">
																₦{' '}
																{window.formatedPrice.format(
																	request.rent_per_room
																)}{' '}
																<small className="text-muted">
																	/
																	{request.payment_type &&
																		request.payment_type.name}
																</small>
															</h2>
														</div>
													</div>
												)}
												<div className="col-md-5 mt-4">
													{user ? (
														<UserAction user={request.users_permissions_user} />
													) : (
														// For Those Who Aren't Logged In
														<Link
															to={`/signup`}
															title=""
															className="btn main-btn bg-theme text-white"
															data-ripple=""
														>
															Call Me
															<i className="fa fa-phone ml-2"></i>
														</Link>
													)}
												</div>
											</div>
										</div>
										{request.bedrooms || request.bathrooms ? (
											<div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3 additional_details">
												<div className="block-header">
													<h4 className="block-title">
														<b>Property Info</b>
													</h4>
												</div>

												<div className="block-body ml-3">
													<ul className="dw-proprty-info row justify-content-between">
														<li className="col-4 mb-3">
															<strong className="text-dark">Bedrooms:</strong>
															<br />
															{request.bedrooms}
														</li>
														<li className="col-4 mb-3">
															<strong className="text-dark">Bathrooms:</strong>
															<br />
															{request.bathrooms}
														</li>
														<li className="col-4 mb-3">
															<strong className="text-dark">Toilets:</strong>
															<br />
															{request.toilets}
														</li>
														<li className="col-4 mb-3">
															<strong className="text-dark">Is Premium?</strong>
															<br />
															{request.is_premium ? 'Yes' : 'No'}
														</li>
														<li className="col-4 mb-3">
															<strong className="text-dark">Service:</strong>
															<br />
															{request.service && request.service.name}
														</li>
														<li className="col-4 mb-3">
															<strong className="text-dark">Type:</strong>
															<br />
															{request.category && request.category.name}
														</li>
														<li className="col-4 mb-3">
															<strong className="text-dark">Rent</strong>
															<br />₦{' '}
															{window.formatedPrice.format(request.budget)}
														</li>
														{request.rent_per_room && (
															<li className="col-4 mb-3">
																<strong className="text-dark">Per Room</strong>
																<br />₦{' '}
																{window.formatedPrice.format(
																	request.rent_per_room
																)}
															</li>
														)}

														<li className="col-4 mb-3">
															<strong className="text-dark">State</strong>
															<br />
															{request.state && request.state.name}
														</li>
													</ul>
												</div>
											</div>
										) : null}
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
