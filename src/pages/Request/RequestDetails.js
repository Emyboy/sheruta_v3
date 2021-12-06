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
	const [state, setState] = useState({
		loading: true,
		notFound: false,
	})
	const auth = useSelector((state) => state.auth)
	const deactivated = user?.user.deactivated;

	useEffect(() => {
		setState({ ...state, loading: true })

		axios(process.env.REACT_APP_API_URL + '/property-requests/?uuid=' + uid)
			.then((res) => {
				if (res.data.length === 0) {
					setState({ ...state, notFound: true, loading: false })
				} else {
					setRequest(res.data[0])
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

	const handleCallRequest = () => {
		notifyEmy({
			heading: `Called ${request.users_permissions_user.first_name} ${request.users_permissions_user.last_name}`,
			url: window.location.pathname,
			status: 'success',
		})
	}

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
						<div className="row">
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
															<a className="text-dark">
																{deactivated
																	? '..... .....'
																	: request.users_permissions_user
																			.first_name}{' '}
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
													<div
														className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
														aria-labelledby="dropdownMenu2"
													>
														<div className="card-body p-0 d-flex link">
															<i className="feather-edit text-grey-500 me-3 font-lg"></i>
															<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
																Edit{' '}
																<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
																	Now you can edit your posts
																</span>
															</h4>
														</div>
														<div
															className="card-body p-0 d-flex mt-2 link"
															onClick={() => {
																if (navigator.share) {
																	navigator
																		.share({
																			title: request.heading,
																			url:
																				window?.location?.host +
																				`/request/${request.uuid}/${user?.id}`,
																			text: request.body,
																		})
																		.catch((err) => Promise.reject(err))
																}
															}}
														>
															<i className="feather-share text-grey-500 me-3 font-lg"></i>
															<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
																Share{' '}
																<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
																	Share this post with your friends
																</span>
															</h4>
														</div>
														<hr />
														<div className="card-body p-0 d-flex mt-2 link">
															<i className="feather-trash text-grey-500 me-3 font-lg"></i>
															<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
																Delete Post{' '}
																<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
																	Delete your post from sheruta
																</span>
															</h4>
														</div>
													</div>
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
												{request.image_url && request.image_url.length > 0 ? (
													<ImgContainer
														style={{
															backgroundImage: `url(${request.image_url[0]})`,
														}}
													>
														<button
															className="btn btn-dark btn-sm rounded"
															onClick={() => setShowImages(!showImages)}
														>
															Show All Images
														</button>
													</ImgContainer>
												) : null}
												<div className="container-fluid">
													<div className="row justify-content-between">
														{deactivated ? (
															<DeactivatedBanner />
														) : (
															<div
																className="d-flex col-md-6 pl-0 text-dark"
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
														<div className="col-md-5">
															{user ? (
																// <a
																//     onClick={
																//         handleCallRequest
																//     }
																//     href={`tel:${request.users_permissions_user.phone_number}`}
																//     title=""
																//     className="main-btn bg-theme text-white"
																//     data-ripple=""
																// >
																//     Call Me
																//     <i className="fa fa-phone ml-2"></i>
																// </a>
																<UserAction
																	user={request.users_permissions_user}
																/>
															) : (
																// For Those Who Aren't Logged In
																<Link
																	to={`/signup`}
																	title=""
																	className="main-btn bg-theme text-white"
																	data-ripple=""
																>
																	Call Me
																	<i className="fa fa-phone ml-2"></i>
																</Link>
															)}
														</div>
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
												<div className="d-flex justify-content-between">
													<h1 className="mt-3">
														₦ {window.formatedPrice.format(request.budget)}{' '}
														<small className="text-muted">
															/
															{request.payment_type &&
																request.payment_type.name}
														</small>
													</h1>
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
											</div>
										</div>
										{request.bedrooms && request.bathrooms ? (
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
															<strong className="text-dark">
																Service Type:
															</strong>
															<br />
															{request.service && request.service.name}
														</li>
														<li className="col-4 mb-3">
															<strong className="text-dark">Type:</strong>
															<br />
															{request.category && request.category.name}
														</li>
														<li className="col-4 mb-3">
															<strong className="text-dark">
																Price / Budget
															</strong>
															<br />₦{' '}
															{window.formatedPrice.format(request.budget)}
														</li>

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
