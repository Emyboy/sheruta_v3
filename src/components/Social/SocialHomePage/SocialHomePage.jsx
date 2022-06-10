import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Global from '../../../Global'
import EachSocialRequest from '../EachSocialRequest'
import { getUser } from '../../../redux/strapi_actions/auth.actions'
import { Dots } from 'react-activity'
// import Layout from '../../Layout/Layout'
import { Redirect } from 'react-router'
import UserFeedCard from './UserFeedCard'
import SocialFeedsAds from './SocialFeedsAds'
import RecentUsersList from '../../RecentUsersList/RecentUsersList'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { Alert, Button } from 'react-bootstrap'
import moment from 'moment'
import Cookies from 'js-cookie'
import RecentBookingFeed from './RecentBookingFeed'
import Sticky from 'react-sticky-el'
import ErrorBoundary from '../../ErrorBoundary'

// import FreeRequestAds from "../../Ads/RequestAds/FeeRequestAds";
const Layout = React.lazy(() => import('../../Layout/Layout'))

export default (props) => {
	localStorage.setItem('after_login', '/feeds')
	const auth = useSelector((state) => state.auth)
	const view = useSelector((state) => state.view)
	const { personal_info } = view
	const dispatch = useDispatch()
	const [state, setState] = useState({
		properties: [],
		list: [],
	})
	const [filter, setFilter] = useState('all')

	useEffect(() => {
		if (auth.user) {
			dispatch(getUser())
		}
	}, [])

	useEffect(() => {
		if (state.list.length === 0) {
			const dev = process.env.NODE_ENV === 'development'
			axios(
				process.env.REACT_APP_API_URL +
					`/property-requests/?_limit=${
						dev ? '20' : '90'
					}&_start=0&_sort=created_at:DESC`
			)
				.then((res) => {
					setState({ ...state, list: res.data })
					dispatch({
						type: 'SET_VIEW_STATE',
						payload: {
							feed: res.data,
						},
					})
				})
				.catch((err) => {
					return Promise.reject(err)
				})
		}
	}, [state])

	if (!auth.user) {
		return <Redirect to="/login" />
	}

	// if (!view.personal_info) {
	// 	return null
	// }

	return (
		<div className="main-wrapper">
			<Layout currentPage="feeds" showMessages={false}>
				<div className="container">
					<div className="row _feed-body justify-content-evenly">
						{!Global.isMobile && (
							<div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
								<Sticky
									stickyStyle={{
										zIndex: 10,
										marginTop: Global.isMobile ? '6vh' : '11vh',
									}}
								>
									{/* <RecentUsers data={newUsers} /> */}
									<UserFeedCard />
									<RecentBookingFeed />
								</Sticky>
							</div>
						)}
						<div
							className="col-xl-8 col-xxl-8 col-lg-8 pl-1 pr-1"
							style={{
								paddingLeft: Global.isMobile ? 0 : 2,
								paddingRight: Global.isMobile ? 0 : 2,
							}}
						>
							<div className="card shadow-sm rounded-xxl border-0 mb-3 mt-3">
								<div className="card-body d-block w-100 shadow-none mb-0 p-0 ">
									<ul
										className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
										id="pills-tab"
										role="tablist"
									>
										<li className="active list-inline-item me-5">
											<a
												className={`fw-700 font-xssss text-grey-500 pt-3 pb-2 ls-1 d-inline-block ${
													filter === 'all' && 'active'
												}`}
												data-toggle="tab"
												onClick={() => setFilter('all')}
											>
												All
											</a>
										</li>
										<li className="list-inline-item me-5">
											<a
												className={`fw-700 font-xssss text-grey-500 pt-3 pb-2 ls-1 d-inline-block ${
													filter === 'for you' && 'active'
												}`}
												data-toggle="tab"
												onClick={() => setFilter('for you')}
											>
												For You
											</a>
										</li>
									</ul>
								</div>
							</div>

							{Cookies.get('new_user') && (
								<Alert variant="success">
									<Alert.Heading className="fw-bold">
										Hey {auth?.user?.user?.first_name?.split(' ')[0]}, Welcome
										to Sheruta.{' '}
									</Alert.Heading>
									<div className="row justify-content-between align-items-center">
										<p className="col-md-6">
											Your account is set to{' '}
											{view?.personal_info?.looking_for ? (
												<strong>I am looking for</strong>
											) : (
												<strong>I have a flat.</strong>
											)}
										</p>
										<Link to={`/settings/configure-view`} className="col-3">
											<div className="btn border-success border-2">
												<h5 className="mb-0 text-success fw-bold">
													Change This
												</h5>
											</div>
										</Link>
									</div>
									<hr />
									<p className="mb-0">
										{view?.personal_info?.looking_for
											? 'Reach out to those who have a flat to share by calling them or leaving them a message'
											: 'Reach out to those who are looking for a flat to share. You can call them or leave them a message'}
									</p>
								</Alert>
							)}

							<ErrorBoundary>
							{filter === 'all' && (
								<>
									{(view['feed'] ? view['feed'] : state.list).map((val, i) => {
										if (i === 2) {
											return (
												<>
													<div className="d-flex justify-content-between align-items-center  mt-4">
														<h5 className="fw-700 text-grey-600 mb-1 ml-2">
															Recent Verified Users
														</h5>
														<Link to="/start">
															<small className="text-theme fw-bold">
																Get Verified {'>'}
															</small>
														</Link>
													</div>
													{personal_info && (
														<>
															<RecentUsersList key={`ki-${i}`} />
															<SocialFeedsAds index={i} key={`ad-${i}`} />
															<EachSocialRequest
																key={i + ' request'}
																data={val}
															/>
														</>
													)}
												</>
											)
										}
										return (
											<>
												<SocialFeedsAds index={i} key={`ad-${i}`} />
												<EachSocialRequest key={i + ' request'} data={val} />
											</>
										)
									})}
								</>
							)}
							{filter === 'for you' && (
								<>
									{(view['feed'] ? view['feed'] : state.list)
										.filter((x) => x.is_searching == !personal_info.looking_for)
										.map((val, i) => {
											return (
												<>
													<SocialFeedsAds index={i} key={`ad-${i}`} />
													<EachSocialRequest key={i + ' request'} data={val} />
												</>
											)
										})}
								</>
							)}
							</ErrorBoundary>
							{state.list.length > 0 && (
								<div className="card rounded-xxl">
									<div className="card-body text-center">
										<h1 className="fw-bold text-grey-600">There is more</h1>
										<Link
											className="mt-3 mb-2 btn btn-success fw-bold text-white"
											to="/search"
										>
											<FaSearch className="mr-2" />
											Search
										</Link>
									</div>
								</div>
							)}
							{state.list.length === 0 ? (
								<div className="central-meta item rounded-xxl bg-white card text-center d-flex justify-content-center mt-5 pt-5 pb-5">
									<h1 className="fw-bold text-grey-600">
										Customizing Your Feed
									</h1>
									<Dots />
								</div>
							) : null}
						</div>
					</div>
				</div>
			</Layout>
		</div>
	)
}
