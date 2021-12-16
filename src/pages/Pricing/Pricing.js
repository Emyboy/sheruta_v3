import { notification } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { usePaystackPayment, PaystackButton } from 'react-paystack'
import { connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import { notifyEmy } from '../../services/Sheruta'
import end_sarz from '../../assets/img/end_sarz.jpeg'
import FreeRequestAds from '../../components/Ads/RequestAds/FeeRequestAds'
import Global from '../../Global'

const formatedPrice = new Intl.NumberFormat('en-NG')

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps)((props) => {
	localStorage.setItem('after_login', '/pricing')
	const mockRef = {
		message: 'Approved',
		reference: '1625420988167',
		status: 'success',
		trans: '1203458722',
		transaction: '1203458722',
		trxref: '1625420988167',
	}

	const [state, setState] = useState({
		loading: true,
		plans: [],
		paystackDone: false,
		message: null,
		messageType: null,
	})

	const [data, setData] = useState({
		payment_plan: null,
		reference: null,
	})

	const config = {
		reference: new Date().getTime(),
		publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
	}

	const handlePaystackSuccessAction = (reference, payment_plan_id) => {
		// Implementation for whatever you want to do with reference and after success call.
		setData({ ...data, payment_plan: payment_plan_id, reference })
		setState({ ...state, paystackDone: true })
		notifyEmy({
			heading: 'Payment was sent to paystack',
			body: JSON.stringify({ ...reference, payment_plan_id }),
		})
		axios(process.env.REACT_APP_API_URL + '/transactions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${props.auth.user.jwt}`,
			},
			data: {
				...reference,
				// ...mockRef,
				payment_plan: payment_plan_id,
				users_permissions_user: props.auth.user.user.id,
			},
		})
			.then((res) => {
				notifyEmy({
					log: { message: 'Sent transaction to backend' },
					status: 'success',
					url: window.location.pathname,
					heading: 'A user made payments',
				})
				if (res.status === 201) {
					setState({
						...state,
						paystackDone: false,
						message: res.data.message,
						messageType: 'success',
					})
				} else
					setState({
						...state,
						paystackDone: false,
						message: res.data.message,
						messageType: 'failed',
					})
			})
			.catch((err) => {
				notifyEmy({
					heading: 'Payment Error',
					log: { ...err },
					status: 'error',
					url: window.location.pathname,
				})
				setState({
					...state,
					paystackDone: false,
					message: 'Server Error',
					messageType: 'failed',
				})
			})
	}

	// you can call this function anything
	const handlePaystackCloseAction = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log('closed')
	}

	const getAllPaymentPlans = () => {
		axios(process.env.REACT_APP_API_URL + '/payment-plans')
			.then((res) => {
				setState({ ...state, loading: false, plans: res.data })
			})
			.catch((err) => {
				notifyEmy({
					heading: 'Error getting payment plans',
					log: { ...err },
				})
				notification.error({ message: 'Error getting payment plans' })
			})
	}

	// const sendPaymentToBackend = () => {
	//     // console.log('SENDING ----', {
	//     //     ...data.reference,
	//     //     // ...mockRef,
	//     //     payment_plan: data.payment_plan,
	//     //     users_permissions_user: props.auth.user.user.id
	//     // })

	// }
	// useEffect(() => {
	//     if (state.paystackDone) {
	//         sendPaymentToBackend()
	//     }
	// }, [state.paystackDone])

	useEffect(() => {
		getAllPaymentPlans()
		notifyEmy({
			heading: ' Visited the payment page',
		})
		console.log('KEY ----', process.env.REACT_APP_PAYSTACK_PUBLIC_KEY)
	}, [])

	// useEffect(() => {
	//     sendPaymentToBackend();
	// },[])

	return (
		<Layout>
			<div className="container pb-5" style={{ marginTop: !props.auth.user ? '15vh': '3vh'}}>
				<Modal show={state.message ? true : false}>
					<Modal.Body>
						<div className="text-center">
							<i className="fa fa-check display-5"></i>
							<h3>{state.message}</h3>
							<Link to={localStorage.getItem('after_payment') || '/'}>
								<button className="btn bg-theme">Continue</button>
							</Link>
						</div>
					</Modal.Body>
				</Modal>
				<div className="row mt-4 mb-2">
					<div className="col text-center">
						<div className="sec-heading center">
							<h1>
								<b>See our packages</b>
							</h1>
							<p>We offer best and smart packages for you.</p>
						</div>
					</div>
				</div>
				{/* <div className="text-center">
                    <h1 className="text-danger text-center">
                        Payment is on us!
                    </h1>
                    <div className="text-center mb-5">
                        <img src={end_sarz} className="rounded shadow" />
                    </div>
                    <div className='col-lg-6 col-sm-12'>
                        <FreeRequestAds />
                        </div>
                </div> */}
				<div className="row mb-5 justify-content-center">
					{state.plans.map((val, i) => {
						return (
							<div className="col-lg-4 col-md-4" key={i}>
								<div className="card mb-4 rounded-xs shadow-lg rounded">
									<div className="pricing-wrap card-body rounded-xl shadow-lx">
										<div className="pricing-header pb-2">
											<i className="lni-layers"></i>
											<h2 className="pr-title mb-0">
												<b>{val.name}</b>
											</h2>
											<small className="pr-subtitle">{val.sub_title}</small>
										</div>
										<div className="pricing-value">
											{val.discount_price ? (
												<h5 className="mb-0 line-through  text-danger">
													{formatedPrice.format(val.price)}
												</h5>
											) : null}
											<h1 className="pr-value display-3">
												<b>
													{formatedPrice.format(
														val.discount_price ? val.discount_price : val.price
													)}
												</b>
											</h1>
										</div>
										<hr />
										<div className="pricing-body">
											<ul>
												<li className="text-dark">
													<b>{val.duration_in_days} Days Access To</b>
												</li>
												{/* <li className='border-bottom mt-3'>{val.property_count} Property Upload</li> */}
												<li className='border-bottom mt-3'>
													Flatmate Requests{' '}
													{val.requests ? (
														<i className="ti ti-check text-theme"></i>
													) : (
														<i className="ti ti-close text-danger"></i>
													)}
												</li>
												<li className='border-bottom mt-3'>
													Email Updates{' '}
													{val.email_update ? (
														<i className="ti ti-check text-theme"></i>
													) : (
														<i className="ti ti-close text-danger"></i>
													)}
												</li>
												<li className='border-bottom mt-3'>
													Contact Verified Agents
													{val.agent_contact ? (
														<i className="ti ti-check text-theme"></i>
													) : (
														<i className="ti ti-close text-danger"></i>
													)}
												</li>
												<li className='border-bottom mt-3'>
													Access Join paddy
													{val.join_paddy ? (
														<i className="ti ti-check text-theme"></i>
													) : (
														<i className="ti ti-close text-danger"></i>
													)}
												</li>
												<li className='border-bottom mt-3'>
													Property Inspection
													{val.inspection_fee ? (
														<i className="ti ti-check text-theme"></i>
													) : (
														<i className="ti ti-close text-danger"></i>
													)}
												</li>
												<li className='border-bottom mt-3'>
													Contact Users
													{val.user_contacts ? (
														<i className="ti ti-check text-theme"></i>
													) : (
														<i className="ti ti-close text-danger"></i>
													)}
												</li>
												<li className='border-bottom mt-3'>
													Property Upload{' '}
													{val.upload_property ? (
														<i className="ti ti-check text-theme"></i>
													) : (
														<i className="ti ti-close text-danger"></i>
													)}
												</li>
											</ul>
										</div>
										<div className="pricing-bottom">
											{!props.auth.user ? (
												<Link to="/login" className="btn shadow-sm bg-theme mt-3">
													Login To Pay
												</Link>
											) : (
												<PaystackButton
													className="btn bg-theme rounded w-50 btn-success mt-4"
													{...{
														...config,
														text: 'Pay Now',
														amount: `${
															val.discount_price
																? val.discount_price + '00'
																: val.price + '00'
														}`,
														email: props.auth.user.user.email,
														onSuccess: (reference) =>
															handlePaystackSuccessAction(reference, val.id),
														onClose: handlePaystackCloseAction,
													}}
												/>
											)}
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</Layout>
	)
})
