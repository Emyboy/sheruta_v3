import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Layout from '../../components/Layout/Layout'

import { Tabs, notification } from 'antd'
import axios from 'axios'
import EachSocialRequest from '../../components/Social/EachSocialRequest'
import PageLoader from '../../components/PageLoader'
import PageNotFound from '../PageNotFound'

import { notifyEmy } from '../../services/Sheruta'
import MetaTags from 'react-meta-tags'
import VerifiedBadge from '../../components/VerifiedBadge/VerifiedBadge'
import Notifications from '../../services/Notifications'
import UserAction from '../../components/UserAction/UserAction'
import Global from '../../Global'
import ProfileJumb from '../../components/ProfileComponents/ProfileJumb'
import ProfileAbout from '../../components/ProfileComponents/ProfileAbout'
const { TabPane } = Tabs

export const Profile2 = (props) => {
	localStorage.setItem('after_login', window.location.pathname)
	const { auth } = props
	const { params } = props.match
	const [state, setState] = useState({
		showImageModal: false,
		userRequests: [],
	})
	const [loading, setLoading] = useState(true)
	const [userData, setUserData] = useState(null)
	const [notFound, setNotFound] = useState(false)
	// const user = props.auth.user;

	useEffect(() => {
		if (userData) {
			axios(
				process.env.REACT_APP_API_URL +
					'/property-requests/?users_permissions_user=' +
					userData.id,
				{}
			)
				.then((res) => {
					setState({ ...state, userRequests: res.data })
				})
				.catch((err) => {
					notification.error({ message: 'Error Fetching User Reques' })
					notifyEmy({
						heading: 'Error fetch user requests',
						log: err,
						status: 'error',
						url: window.location.pathname,
					})
				})
		}
	}, [userData])

	useEffect(() => {
		if (params.username) {
			axios(
				process.env.REACT_APP_API_URL + `/users/?username=${params.username}`
			)
				.then((res) => {
					if (res.data.length > 0) {
						setUserData(res.data[0])
						const user = res.data[0]
						notifyEmy({
							heading: `Visited ${user.first_name} ${user.last_name}'s Profile'`,
							log: res.data[0],
						})
					} else {
						setNotFound(true)
					}
					setLoading(false)
					Notifications.notifyUser({
						owner: res.data[0].id,
						// users_permissions_user:
						//     res.data[0].users_permissions_user.id,
						title: 'viewed your profile',
						sub_title: null,
						type: 'profile_view',
					})
				})
				.catch((err) => {
					console.log('ERROR ----', err)
					notification.error({ message: 'Error fetching user data' })
					setNotFound(true)
					notifyEmy({
						heading: 'Error fetch user data on profile page',
						log: err,
						status: 'error',
						url: window.location.pathname,
					})
				})
		}
	}, [params])

	useEffect(() => {}, [])

	if (loading) {
		return <PageLoader />
	} else if (notFound) {
		return <PageNotFound />
	} else {
		return (
			<Layout currentPage="profile">
				<div className={!auth.user ? "container": ""} style={{ marginTop: !auth.user ? '15vh': ''}}>
					<MetaTags>
						<title>
							{`${userData.first_name} ${userData.last_name}`}'s Profile |
							Sheruta
						</title>
						<meta
							name="description"
							content={`${userData.first_name} ${userData.last_name}'s Profile | Sheruta`}
						/>
						<meta
							property="og:title"
							content={`${userData.first_name} ${userData.last_name}'s Profile | Sheruta`}
						/>
						<meta
							property="og:description"
							content={`${userData.first_name} ${userData.last_name}'s Profile | Sheruta`}
						/>
					</MetaTags>
					{userData && <ProfileJumb user={userData} />}
					{userData && (
						<div
							className="fixed-bottom text-center"
							style={{
								marginBottom: Global.isMobile ? '15vh' : '10vh',
								zIndex: 1,
							}}
						>
							<UserAction user={userData} />
						</div>
					)}
					<div className="container-fluid">
						<div className="row">
							<div
								className={`col-xl-4 col-xxl-3 col-lg-4 mt-4 ${
									Global.isMobile && 'p-0'
								}`}
							>
								<ProfileAbout user={userData} />
							</div>
							<div
								className={`col-xl-8 col-xxl-9 col-lg-8 mt-4 ${
									Global.isMobile && 'p-0'
								}`}
							>
								{state.userRequests.map((val, i) => {
									return <EachSocialRequest key={i} data={val} />
								})}
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Profile2)
