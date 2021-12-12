import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import SettingsHeader from '../components/SettingsHeader'
import { MdOutlineWarningAmber } from 'react-icons/md'
import DeactivationQuestions from './DeactivationQuestions'
import axios from 'axios'
import Cookies from 'js-cookie'
import { notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../redux/strapi_actions/auth.actions'

export default function AccountDeactivationSetting() {
	const { user } = useSelector((state) => state.auth)
	const [understand, setUnderstand] = useState(false)
	const [password, setPassword] = useState(null)
	const [loading, setLoading] = useState(false)
	const [step, setStep] = useState(0)
	const dispatch = useDispatch()

	useEffect(() => {
		if (user?.user.deactivated) {
			setStep(3)
		}
	}, [])

	const handlePasswordSubmit = () => {
		if (!password) {
			return notification.error({ message: 'Please type your password' })
		}
		setLoading(true)
		axios(
			process.env.REACT_APP_API_URL +
				`/users-permissions/auth/confirm-password`,
			{
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
				method: 'POST',
				data: {
					password,
				},
			}
		)
			.then((res) => {
				setLoading(false)
				const correct = res.data.isPassword
				if (correct) {
					setStep(step + 1)
				} else {
					notification.error({ message: 'Incorrect password' })
				}
			})
			.catch((err) => {
				setLoading(false)
				notification.error({ message: 'Error verifying password' })
			})
	}

	const deactivate = () => {
		setLoading(true)
		axios(
			process.env.REACT_APP_API_URL +
				`/users-permissions/auth/account-deactivate`,
			{
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
				method: 'POST',
				data: {
					deactivate: !user?.user.deactivated,
				},
			}
		)
			.then((res) => {
				setLoading(false)
				dispatch(getUser())
				if (res.data.deactivated) {
					notification.success({ message: 'Account activated' })
				} else {
					notification.error({ message: 'Account deactivated' })
				}
			})
			.catch((err) => {
				setLoading(false)
				notification.error({ message: 'Error deactivating account' })
			})
	}

	return (
		<Layout>
			<div className="middle-wrap pb-5 ">
				<div className="container-fluid card w-100 border-0 bg-white shadow-xs mb-4">
					<SettingsHeader
						heading={
							user?.user.deactivated ? 'Activate Account' : 'Deactivate Account'
						}
					/>
					<div className="text-center mt-3 mb-3">
						<strong>{step + 1}/4</strong>
					</div>
					{step === 0 && (
						<>
							<div className="card-body p-lg-5 p-4 w-100 border-0 text-center mt-1 mb-2">
								<div className="alert-danger card rounded">
									<div className="card-body p-1">
										<h1 className="text-danger" style={{ fontSize: '3rem' }}>
											<MdOutlineWarningAmber /> Warning!
										</h1>
										<div>
											<p>You are attempting to deactivate your account</p>
											<p>Doing so will revoke access to the following</p>
											<ol>
												<li>1. Notification Updates</li>
												<li>2. Match with possible flat mates </li>
												<li>3. Join paddy privileges </li>
												<li>4. 24/7 support </li>
											</ol>
										</div>
									</div>
								</div>
							</div>
							<div className="row justify-content-center">
								<div className="col-lg-6 mb-5">
									<div className="form-group">
										<input
											type="checkbox"
											defaultChecked={understand}
											onChange={(e) => setUnderstand(e.target.checked)}
										/>
										<span className="ml-3">
											I understand the above warning and wish to continue
										</span>
									</div>
									<button
										onClick={() => setStep(step + 1)}
										className="btn w-50 bg-danger text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
										disabled={!understand}
									>
										Continue
									</button>
								</div>
							</div>
						</>
					)}

					{step === 1 && (
						<div className="row justify-content-center mt-5 mb-5">
							<div className="col-lg-6 mb-3">
								<div className="form-group">
									<label className="mont-font fw-600 font-xsss">
										Enter Password
									</label>
									<input
										type="password"
										className="form-control"
										onChange={(e) => setPassword(e.target.value)}
										disabled={loading}
									/>
								</div>
								<button
									onClick={handlePasswordSubmit}
									className="btn w-50 bg-danger text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
									disabled={!password || loading}
								>
									Continue
								</button>
							</div>
						</div>
					)}

					{step === 2 && (
						<DeactivationQuestions done={() => setStep(step + 1)} />
					)}
					{step === 3 && (
						<div className="container mb-5 mt-3">
							<div
								className={`alert text-center alert-${
									user?.user.deactivated ? 'danger' : 'success'
								}`}
							>
								<h3>
									Your account is currently{' '}
									{user?.user.deactivated ? 'inactive' : 'active'}
								</h3>
							</div>
							{!user?.user.deactivated ? (
								<div className="text-center">
									<img
										src={`https://cliply.co/wp-content/uploads/2021/03/392103840_SAD_EMOJI_WITH_TEAR_400px.gif`}
										width="100"
									/>
									<h2>So sad to see you go </h2>
									<button
										className="mt-2 btn w-50 bg-danger text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
										onClick={deactivate}
										disabled={loading}
									>
										Deactivate Now
									</button>
								</div>
							) : (
								<div className="text-center">
									<img
										src={`https://cliply.co/wp-content/uploads/2021/03/392103840_SAD_EMOJI_WITH_TEAR_400px.gif`}
										width="100"
									/>
									<h2>Activate account? </h2>
									<button
										className="mt-2 btn w-50 bg-theme text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
										onClick={deactivate}
										disabled={loading}
									>
										Activate Now
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</Layout>
	)
}
