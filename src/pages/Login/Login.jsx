import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router'
import { setAuthState } from '../../redux/strapi_actions/auth.actions'
import axios from 'axios'
import { notification } from 'antd'
import MetaTags from 'react-meta-tags'
import { Link } from 'react-router-dom'
import VerifyEmailProcess from '../VerifyEmail/VerifyEmailProcess'
import Layout from '../../components/Layout/Layout'
import { notifyEmy } from '../../services/Sheruta'
import Cookies from 'js-cookie'
import loginImg from '../../assets/img/login-bg.png'
import Global from '../../Global'
import UserService from '../../services/UserService'

const mapStateToProps = (state) => ({
	auth: state.auth,
})

const mapActionToProps = {
	setAuthState,
}

const Login = (props) => {
	const [state, setState] = useState({
		loading: false,
		errorMessage: null,
		notVerified: false,
		userData: null,
	})
	// useEffect(() => {

	// }, [state.userData]);

	const { register, handleSubmit, errors } = useForm();

	const updateLastSeen = async() => {
		try {
			const update = await UserService.updateProfile({ last_seen: new Date() });
			return Promise.resolve(update);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	const onSubmit = (data) => {
		setState({ ...state, loading: true })
		axios(process.env.REACT_APP_API_URL + '/auth/local', {
			method: 'POST',
			data,
		})
			.then((res) => {
				const isVerified = res.data.user.confirmed
				if (isVerified) {
					notifyEmy({
						heading: 'Just logged in',
						user: res.data.user,
						status: 'success',
						log: res.data.user,
					})
					Cookies.set('token', res.data.jwt, { expires: 7 })
					setState({ ...state, loading: false })
					notification.success({ message: 'Welcome' });
					props.setAuthState({
						user: res.data,
					})
					updateLastSeen();
					window.location.reload()
				} else {
					setState({ ...state, notVerified: true, userData: res.data })
				}
			})
			.catch((err) => {
				notifyEmy({
					heading: 'Login Error',
					log: {
						email: data.email,
						errorMessage: err.response
							? err.response.data.data[0].messages[0].message
							: 'Server Error',
					},
					status: 'error',
				})
				setState({
					...state,
					errorMessage: err.response
						? err.response.data.data[0].messages[0].message
						: 'Server Error',
					loading: false,
				})
				setTimeout(() => {
					setState({ ...state, errorMessage: null })
				}, 3000)
			})
	}

	useEffect(() => {
		if (localStorage.getItem('after_login') === '/login') {
			localStorage.setItem('after_login', '/')
		}
	})

	if (props.auth.user) {
		return <Redirect to={localStorage.getItem('after_login') || '/'} />
	} else if (state.notVerified) {
		return <VerifyEmailProcess userData={state.userData} />
	} else
		return (
			<Layout back page="login">
				<MetaTags>
					<title>Login | Sheruta NG</title>
					<meta
						name="description"
						content={
							'Login to Sheruta and get access to shared apartments today'
						}
					/>
					<meta property="og:title" content={'Login | Sheruta NG'} />
					<meta
						property="og:description"
						content={
							'Login to Sheruta and get access to shared apartments today'
						}
					/>
				</MetaTags>
				<div className="main-wrap">
					<div className="row">
						<div
							className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
							style={{ backgroundImage: `url(${loginImg})` }}
						></div>
						<div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
							<div className="card shadow-none border-0 ms-auto me-auto login-card">
								<div
									className={` ${
										Global.isMobile && 'p-0'
									} card-body rounded-0 text-left`}
								>
									<h2 className="fw-700 display1-size display2-md-size mb-3">
										Login into <br />
										your account
									</h2>
									{state.errorMessage && (
										<div className="alert alert-danger p-2">
											<strong>{state.errorMessage}</strong>
										</div>
									)}
									<form onSubmit={handleSubmit(onSubmit)}>
										<div className="form-group icon-input mb-3">
											<i className="font-sm ti-email text-grey-500 pe-0"></i>
											<input
												className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
												disabled={state.loading}
												autoFocus
												name="identifier"
												id="identifier"
												// type="email"
												placeholder="Username or Email"
												{...register('identifier')}
											/>
										</div>
										<div className="form-group icon-input mb-1">
											<input
												className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
												disabled={state.loading}
												name="password"
												id="password"
												type="password"
												placeholder="*******"
												{...register('password')}
											/>
											<i className="font-sm ti-lock text-grey-500 pe-0"></i>
										</div>
										<div className="form-check text-left mb-3">
											<input
												type="checkbox"
												className="form-check-input mt-2"
												id="exampleCheck5"
											/>
											<label
												className="form-check-label font-xsss text-grey-500"
												htmlFor="exampleCheck5"
											>
												Remember me
											</label>
											<Link
												to="/password/reset/request"
												className="fw-600 font-xsss text-grey-700 mt-1 float-right"
											>
												Forgot your Password?
											</Link>
										</div>
										<div className="form-group mb-1">
											<button
												type="submit"
												disabled={state.loading}
												className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
											>
												{state.loading ? 'Loading...' : 'Login'}
											</button>
										</div>
									</form>

									<div className="col-sm-12 p-0 text-left">
										<h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
											Dont have account{' '}
											<Link to="/signup" className="fw-700 ms-1 text-success">
												Register
											</Link>
										</h6>
									</div>
									{/* <div className="col-sm-12 p-0 text-center mt-2">
										<h6 className="mb-0 d-inline-block bg-white fw-500 font-xsss text-grey-500 mb-3">
											Or, Sign in with your social account{' '}
										</h6>
										<div className="form-group mb-1">
											<a
												href="#"
												className="form-control text-left style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2"
											>
												<img
													src="/assets/img/icon-1.png"
													alt="icon"
													className="ms-2 w40 mb-1 me-5"
												/>{' '}
												Sign in with Google
											</a>
										</div>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* <div
					className="animate__animated animate__fadeIn modal-dialog modal-dialog-centered login-pop-form mt-5 "
					role="document"
				>
					<div className="modal-content rounded shadow" id="registermodal">
						<span className="mod-close" data-dismiss="modal" aria-hidden="true">
							<i className="ti-close"></i>
						</span>
						<div className="modal-body">
							<div className="heading">
								<h2 className="text-center">Login to your account</h2>
								<p className="text-center">
									Don't have an account?{' '}
									<Link className="text-thm" to="/signup">
										Sign Up!
									</Link>
								</p>
							</div>
							
							<div className="login-form">
								{state.errorMessage ? (
									<div className="alert alert-danger text-center">
										<b className="m-0 p-0 h5">{state.errorMessage}</b>
									</div>
								) : null}
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="form-group">
										<label>Email</label>
										<div className="input-with-icon">
											<input
                                            className="form-control"
												disabled={state.loading}
												autoFocus
												name="identifier"
												id="identifier"
												type="email"
												placeholder="Email"
												{...register('identifier')}
											/>
											<i className="ti-user"></i>
										</div>
										
									</div>

									<div className="form-group">
										<label>Password</label>
										<div className="input-with-icon">
											<input
												disabled={state.loading}
												name="password"
												id="password"
												type="password"
												className="form-control"
												placeholder="*******"
												{...register('password')}
											/>
											<i className="ti-unlock"></i>
										</div>
										
									</div>

									<div className="form-group">
										<Btn
											id="login-btn"
											text="Login"
											loading={state.loading}
											className="full-width mt-2 mb-3"
											type="submit"
										/>
										<Link
											to="/password/reset/request"
											className="text-theme pl-0 link btn"
										>
											Forgot Password
										</Link>
										
									</div>
								</form>
							</div>
						</div>
					</div>
				</div> */}
			</Layout>
		)
}

export default connect(mapStateToProps, mapActionToProps)(Login)
