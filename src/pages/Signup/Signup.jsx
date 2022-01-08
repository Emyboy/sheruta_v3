import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { notification } from 'antd'
import MetaTags from 'react-meta-tags'
import Layout from '../../components/Layout/Layout'
import { notifyEmy } from '../../services/Sheruta'
import loginImg from '../../assets/img/login-bg.png'

export const Signup = (props) => {
	const { register, handleSubmit } = useForm()
	const [state, setState] = useState({
		loading: false,
		errorMessage: null,
		goToSuccess: false,
		gender: 'female',
	})
	const [termsAccepted, setTermsAccepted] = useState(false)

	const onSubmit = (e) => {
		// console.log(e)
		if (!termsAccepted) {
			notification.info({ message: 'You need to accept the terms' })
			return
		}
		setState({ ...state, loading: true })
		axios(process.env.REACT_APP_API_URL + '/auth/local/register', {
			method: 'POST',
			data: { ...e, username: e.username.replace(/\s/g, '') },
		})
			.then((res) => {
				if (res.status === 201) {
					notification.success({ message: 'Account Created' })
					sessionStorage.setItem('mail', e.email)
					setState({ ...state, loading: false, goToSuccess: true })
				}
				setState({ ...state, loading: false })
				// store.dispatch({
				//     type: 'SET_AUTH_STATE',
				//     payload: {
				//         user: res.data
				//     }
				// })
			})
			.catch((err) => {
				console.log(err)
				setState({ ...state, loading: false })
				setState({
					...state,
					errorMessage: err.response.data.message || 'Singup Error',
				})
				setTimeout(() => {
					setState({ ...state, errorMessage: null })
				}, 3000)
				notifyEmy({
					heading: 'Error signing Up',
					log: {
						email: e.email,
						first_name: e.first_name,
						last_name: e.last_name,
						phone_number: e.phone_number,
						errorMessage: err.response || 'Singup Error',
					},
				})
			})
	}

	if (props.auth.user) {
		return <Redirect to="/feeds" />
	}

	if (state.goToSuccess) {
		// return <SignUpSuccess />
		return <Redirect to="/signup/success" />
	} else {
		return (
			<Layout>
				<MetaTags>
					<title>Signup | Sheruta NG</title>
					<meta
						name="description"
						content={
							'Be the first to Signup on Sheruta and get access to shared apartments today'
						}
					/>
					<meta property="og:title" content={'Signup | Sheruta NG'} />
					<meta
						property="og:description"
						content={
							'Be the first to Signup on Sheruta and get access to shared apartments today'
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
								<div className="card-body rounded-0 text-left">
									<h2 className="fw-700 display1-size display2-md-size mb-4">
										Create <br />
										your account
									</h2>
									<form onSubmit={handleSubmit(onSubmit)}>
										{state.errorMessage ? (
											<div className="alert alert-danger">
												{state.errorMessage}
											</div>
										) : null}
										<div className="form-group icon-input mb-3">
											<i className="font-sm ti-user text-grey-500 pe-0"></i>
											<input
												required
												name="first_name"
												{...register('first_name')}
												id="first_name"
												type="text"
												className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
												placeholder="First Name"
											/>
										</div>
										<div className="form-group icon-input mb-3">
											<i className="font-sm ti-user text-grey-500 pe-0"></i>
											<input
												required
												name="last_name"
												id="last_name"
												{...register('last_name')}
												type="text"
												className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
												placeholder="Last Name"
											/>
										</div>
										<div className="form-group icon-input mb-3">
											<i className="font-sm ti-user text-grey-500 pe-0"></i>
											<input
												required
												type="text"
												name="username"
												id="_username"
												{...register('username')}
												className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
												placeholder="Username Ex john_doe"
											/>
										</div>
										<div className="form-group icon-input mb-3">
											<i className="font-sm ti-email text-grey-500 pe-0"></i>
											<input
												required
												type="email"
												name="email"
												id="email"
												{...register('email')}
												className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
												placeholder="Your Email Address"
											/>
										</div>
										<div className="form-group icon-input mb-3">
											<i className="font-sm ti-mobile text-grey-500 pe-0"></i>
											<input
												required
												type="number"
												name="phone_number"
												id="phone_number"
												{...register('phone_number')}
												className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
												placeholder="Phone Number"
											/>
										</div>
										<div className="form-group icon-input mb-3">
											<input
												required
												type="password"
												name="password"
												id="password"
												{...register('password')}
												className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
												placeholder="Password"
											/>
											<i className="font-sm ti-lock text-grey-500 pe-0"></i>
										</div>
										<div className="form-group icon-input mb-1">
											<input
												type="Password"
												className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
												placeholder="Confirm Password"
											/>
											<i className="font-sm ti-lock text-grey-500 pe-0"></i>
										</div>
										<div className="form-check text-left mb-3">
											<input
												type="checkbox"
												className="form-check-input mt-2"
												id="exampleCheck2"
												onChange={(e) => setTermsAccepted(e.target.checked)}
											/>
											<label
												className="form-check-label font-xsss text-grey-500"
												for="exampleCheck2"
											>
												Accept <Link to="/terms">Term and Conditions</Link>
											</label>
										</div>
										<div className="form-group mb-1">
											<button
												type="submit"
												className="btn  w-100 text-center text-white fw-600 bg-theme border-0 "
											>
												{state.loading ? 'Loading...' : 'Register'}
											</button>
										</div>
									</form>

									<div className="col-sm-12 p-0 text-left">
										<h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
											Already have account{' '}
											<Link to="/login" className="fw-700 ms-1">
												Login
											</Link>
										</h6>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>

			// {/* <Layout back>
			//     <div className="animate__animated animate__fadeIn modal-dialog modal-dialog-centered login-pop-form mt-5 mb-5 pb-5">
			//         <MetaTags>
			//             <title>Signup | Sheruta NG</title>
			//             <meta
			//                 name="description"
			//                 content={
			//                     "Be the first to Signup on Sheruta and get access to shared apartments today"
			//                 }
			//             />
			//             <meta property="og:title" content={"Signup | Sheruta NG"} />
			//             <meta
			//                 property="og:description"
			//                 content={
			//                     "Be the first to Signup on Sheruta and get access to shared apartments today"
			//                 }
			//             />
			//         </MetaTags>
			//         <div
			//             className="modal-content m-2 border-gray rounded shadow"
			//             id="sign-up"
			//         >
			//             <Link to="/">
			//                 <span
			//                     className="mod-close"
			//                     data-dismiss="modal"
			//                     aria-hidden="true"
			//                 >
			//                     <i className="ti-close"></i>
			//                 </span>
			//             </Link>
			//             <div className="modal-body">
			//                 <div className="heading">
			//                     <h3 className="text-center">
			//                         Register to join the community
			//                     </h3>
			//                     <p className="text-center">
			//                         Have an account?{" "}
			//                         <Link className="text-thm" to="/login">
			//                             Login
			//                         </Link>
			//                     </p>
			//                 </div>
			//                 <div className="login-form">
			//                     <form onSubmit={handleSubmit(onSubmit)}>
			//                         {state.errorMessage ? (
			//                             <div className="alert alert-danger">
			//                                 {state.errorMessage}
			//                             </div>
			//                         ) : null}
			//                         <div className="row">
			//                             <div className="col-lg-6 col-md-6">
			//                                 <div className="form-group">
			//                                     <div className="input-with-icon">
			//                                         <input
			//                                             required
			//                                             name="first_name"
			//                                             {...register("first_name")}
			//                                             id="first_name"
			//                                             type="text"
			//                                             className="form-control"
			//                                             placeholder="First Name"
			//                                         />
			//                                         <i className="ti-user"></i>
			//                                     </div>
			//                                 </div>
			//                             </div>
			//                             <div className="col-lg-6 col-md-6">
			//                                 <div className="form-group">
			//                                     <div className="input-with-icon">
			//                                         <input
			//                                             required
			//                                             name="last_name"
			//                                             id="last_name"
			//                                             {...register("last_name")}
			//                                             type="text"
			//                                             className="form-control"
			//                                             placeholder="Last Name"
			//                                         />
			//                                         <i className="ti-user"></i>
			//                                     </div>
			//                                 </div>
			//                             </div>

			//                             <div className="col-lg-6 col-md-6">
			//                                 <div className="form-group">
			//                                     <div className="input-with-icon">
			//                                         <input
			//                                             required
			//                                             type="text"
			//                                             name="username"
			//                                             id="username"
			//                                             {...register("username")}
			//                                             className="form-control"
			//                                             placeholder="Username"
			//                                         />
			//                                         <i className="ti-user"></i>
			//                                     </div>
			//                                 </div>
			//                             </div>
			//                             <div className="col-lg-6 col-md-6">
			//                                 <div className="form-group">
			//                                     <div className="input-with-icon">
			//                                         <input
			//                                             required
			//                                             type="email"
			//                                             name="email"
			//                                             id="email"
			//                                             {...register("email")}
			//                                             className="form-control"
			//                                             placeholder="Email"
			//                                         />
			//                                         <i className="ti-email"></i>
			//                                     </div>
			//                                 </div>
			//                             </div>
			//                             <div className="w-100 col">
			//                                 <div className="form-group">
			//                                     <div className="input-with-icon">
			//                                         <input
			//                                             required
			//                                             type="text"
			//                                             className="form-control"
			//                                             placeholder="Phone No (whatsapp)"
			//                                             name="password"
			//                                             id="phone_no"
			//                                             {...register(
			//                                                 "phone_number",
			//                                             )}
			//                                         />
			//                                         <i className="lni lni-phone"></i>
			//                                     </div>
			//                                 </div>
			//                             </div>

			//                             <div className="col-lg-6 col-md-6">
			//                                 <div className="form-group">
			//                                     <div className="input-with-icon">
			//                                         <input
			//                                             required
			//                                             type="password"
			//                                             name="password"
			//                                             id="password"
			//                                             {...register("password")}
			//                                             className="form-control"
			//                                             placeholder="Password"
			//                                         />
			//                                         <i className="ti-unlock"></i>
			//                                     </div>
			//                                 </div>
			//                             </div>
			//                             <div className="col-lg-6 col-md-6">
			//                                 <div className="form-group">
			//                                     <div className="input-with-icon">
			//                                         <input
			//                                             required
			//                                             type="password"
			//                                             id="confirm_password"
			//                                             className="form-control"
			//                                             placeholder="Confirm Password"
			//                                         />
			//                                         <i className="ti-unlock"></i>
			//                                     </div>
			//                                 </div>
			//                             </div>

			//                             <div className="col-lg-6 col-md-6">
			//                                 <div className="form-group">
			//                                     <div className="input-with-icon">
			//                                         <select
			//                                             className="form-control"
			//                                             {...register("gander")}
			//                                         >
			//                                             <option value="male">
			//                                                 Male
			//                                             </option>
			//                                             <option value="femaile">
			//                                                 Female
			//                                             </option>
			//                                         </select>
			//                                         <i className="ti-face-smile"></i>
			//                                     </div>
			//                                 </div>
			//                             </div>
			//                         </div>

			//                         <div className="form-group">
			//                             <button
			//                                 disabled={state.loading}
			//                                 type="submit"
			//                                 id="signup-btn"
			//                                 className="btn btn-log btn-block btn-thm2"
			//                             >
			//                                 {state.loading ? (
			//                                     <Spinner color="white" />
			//                                 ) : (
			//                                     "Sign Up"
			//                                 )}
			//                             </button>
			//                         </div>
			//                     </form>
			//                 </div>
			//             </div>
			//         </div>
			//     </div>
			// </Layout> */}
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
