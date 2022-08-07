import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Btn from '../../components/Btn/Btn'
import { Spinner } from 'react-activity'
import { Link } from 'react-router-dom'
import { notification } from 'antd'
import Layout from '../../components/Layout/Layout'
import { notifyEmy } from '../../services/Sheruta'
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdOutlineError } from 'react-icons/md';

const VerifyEmail = (props) => {
	const [state, setState] = useState({
		heading: null,
		error: false,
		display: 'loading',
	})

	const confirmationToken = props.match.params.confirmationToken || null
	const token = props.match.params.token || null

	const verifyUserAccount = () => {
		axios(process.env.REACT_APP_API_URL + `/verify/email`, {
			method: 'POST',
			data: { confirmationToken, token },
		})
			.then((res) => {
				if (res.status === 200) {
					sessionStorage.clear()
					setState({
						...state,
						display: 'verified',
						heading: 'Your account has been verified',
					})
				}
			})
			.catch((err) => {
				notifyEmy({
					heading: 'Error verifing email',
					log: { ...err },
				})
				if (err.response.status === 404) {
					setState({
						...state,
						display: null,
						heading: 'You are already verified',
					})
				} else {
					notification.error({ message: 'Error, Please refresh page' })
				}
			})
	}

	useEffect(() => {
		verifyUserAccount()
	}, [])

	return (
		<Layout>
			<div
				className="animate__animated animate__fadeIn  container mt-5 mb-5"
				role="document"
			>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-7 col-sm-12">
							<div
								className="card shadow-sm"
								id="sign-up-success"
								style={{ marginTop: '30vh' }}
							>
								<div className="modal-body text-center">
									<h4
										className="modal-header-title"
										style={{ lineHeight: '60px' }}
									>
										{state.heading}
									</h4>
									{state.display === 'loading' ? (
										<div className="text-center">
											<p className="text-center">Please Wait</p>
											<div className="text-center">
												<Spinner style={{ margin: 0 }} />
											</div>
										</div>
									) : null}
									{state.display === 'verified' ? (
										<>
											<div className="text-center">
												{/* <i
										className="ti ti-check text-success mb-2"
										style={{ fontSize: '100px' }}
									></i> */}
												<BsCheckCircleFill
													className="text-success"
													style={{ fontSize: '100px' }}
												/>
											</div>
											<Link to="/login" className="form-group mt-3">
												<Btn text="Login" className="full-width mt-2" />
											</Link>
										</>
									) : null}
									{state.display === 'error' ? (
										<>
											<div className="text-center">
												{/* <i
										className="fa fa-times text-danger mb-2"
										style={{ fontSize: '100px' }}
									></i> */}
												<MdOutlineError
													className="text-danger"
													style={{ fontSize: '100px' }}
												/>
											</div>
											<Link to="/login" className="form-group mt-3">
												<Btn text="Login" className="full-width mt-2" />
											</Link>
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

const mapStateToProps = (state) => ({
	auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)
