import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Btn from '../../components/Btn/Btn'
import { notification } from 'antd'
import Layout from '../../components/Layout/Layout'

const VerifyEmailProcess = ({ userData }) => {
	const [state, setState] = useState({
		loading: false,
		display: 'verify',
	})

	const verificationRequest = () => {
		setState({
			...state,
			loading: true,
		})
		axios(
			process.env.REACT_APP_API_URL + '/personal-infos/verify/email/request',
			{
				method: 'POST',
				// headers: {
				//     Authorization: 'Bearer ' + userData.jwt
				// },
				data: { token: userData.jwt },
			}
		)
			.then((res) => {
				setState({
					...state,
					loading: false,
					display: 'sent',
				})
			})
			.catch((err) => {
				setState({
					...state,
					loading: false,
				})
				notification.error({ message: 'Error, Please try again.' })
			})
	}

	return (
		<Layout page="login">
			<div className="animate__animated animate__fadeIn " role="document">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-6 col-sm-12">
							<div
								// className="modal-content"
								className="card shadow-sm rounded"
								id="sign-up-success"
								style={{ marginTop: '30vh' }}
							>
								<div className="modal-body text-center">
									{state.display === 'verify' ? (
										<>
											<h2
												className="modal-header-title fw-700"
												style={{ lineHeight: '46px' }}
											>
												Please Verify You Email
											</h2>

											<div className="text-center">
												<i
													className="fa fa-times text-center mb-2"
													style={{ fontSize: '100px' }}
												></i>
											</div>
											<h5>Didn't get an email?</h5>
											<Btn
												text="Resend Verification Email"
												className="full-width mt-4 mb-4"
												onClick={verificationRequest}
												loading={state.loading}
											/>
										</>
									) : null}
									{state.display === 'sent' ? (
										<>
											<h4
												className="modal-header-title fw-bold font-xl"
												style={{ lineHeight: '46px' }}
											>
												Email Has Been Sent
											</h4>
											<p className="text-center">{userData.user.email}</p>
											<div className="text-center">
												<i
													className="fa fa-check text-center mb-2"
													style={{ fontSize: '100px' }}
												></i>
											</div>
										</>
									) : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailProcess)
