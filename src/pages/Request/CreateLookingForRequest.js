import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import FooterNav from '../../components/Layout/FooterNav'
import axios from 'axios'
import Cookies from 'js-cookie'
import {
	getAllViewOptions,
	getAuthPersonalInfo,
} from '../../redux/strapi_actions/view.action'
import { notification } from 'antd'
import { useHistory } from 'react-router'
import { notifyEmy } from '../../services/Sheruta'
import { Link } from 'react-router-dom'
import LocationKeywordSelector from '../../components/LocationKeywordSelector/LocationKeywordSelector'
import Global from '../../Global'
import CInput from 'react-currency-input-field'
import GInput from 'react-google-places-autocomplete'
import { v4 as uuidv4 } from 'uuid'

export default function CreateLookingForRequest() {
	const { categories, payment_types, personal_info, services } = useSelector(
		(state) => state.view
	)
	const { user } = useSelector((state) => state.auth)

	const dispatch = useDispatch()
	const history = useHistory()

	const [loading, setLoading] = useState(false)

	const [message_text, setMessageText] = useState('')
	const [payment_type, setPaymentType] = useState(null)
	const [category, setCategory] = useState(null)
	const [service, setService] = useState(null)
	const [budget, setBudget] = useState(user.user?.budget || 0)
	const [location, setLocation] = useState(null)

	useEffect(() => {
		dispatch(getAllViewOptions())
		dispatch(getAuthPersonalInfo())
	}, [dispatch])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if(message_text?.length < 140){
			setTimeout(() => {
				notification.info({ message: 'Describe your ideal room', type: 'info' })
			}, 3000);
			return notification.success({ message: 'Request text is too short' })
		}
		const data = {
			body: message_text,
			uuid: uuidv4(),
			users_permissions_user: user?.user?.id,
			category:category?.id,
			service: service?.id,
			body_html: message_text,
			location_keyword: personal_info?.location_keyword?.id,
			state: personal_info?.state?.id,
			budget: budget,
			is_searching: true,
			location: location?.label,
			google_location: location,
			country: 1,
			heading: `In need a ${category?.name} for share in ${personal_info?.location_keyword?.name}`
		}

		console.log(data)


		try {
			setLoading(true)
			const res = await axios(
				process.env.REACT_APP_API_URL + `/property-requests`,
				{
					method: 'POST',
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
					data: {
						body: data,
						personal_info
					}
				}
			)
			notifyEmy({
				heading: `Posted looking for Request to ${personal_info?.location_keyword?.name}`,
				status: 'success',
			})
			window.location = '/'
			notification.success({ message: 'Request sent' })
			return Promise.resolve()
		} catch (error) {
			setLoading(false)
			notification.error({ message: 'Error, please try again' })
			return Promise.reject(error)
		}
	}

	if (!personal_info) {
		return (
			<div className="d-flex justify-content-center py-5">
				<h4>A Moment..</h4>
			</div>
		)
	} else
		return (
			<div>
				<div className="container-fluid">
					<div className="row justify-content-center">
						<div className="col-sm-12 col-md-7">
							{!personal_info?.location_keyword ? (
								<div style={{ paddingTop: '15vh', paddingBottom: '20vh' }}>
									<LocationKeywordSelector />
								</div>
							) : (
								<div
									className="card p-4 shadow-sm rounded-xxl border-0 animate__fadeIn animate__animated"
									style={{ marginTop: '15vh', marginBottom: '25vh' }}
								>
									<div className="contact-form">
										<div className="title">
											<h3>Post Your Flat Request</h3>
											<p>
												Looking for flat? Post you request and have like minded
												people reach out to you.
											</p>
										</div>

										<form onSubmit={handleSubmit} noValidate="true">
											<div className="row justify-content-center">
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Type Of Flat</label>
														<Select
															options={categories.map((val) => ({
																value: val,
																label: val.name,
															}))}
															onChange={(e) => setCategory(e.value)}
															placeholder="Self Con, Mini Flat etc"
														/>

														<div className="help-block with-errors"></div>
													</div>
												</div>

												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Payment Type</label>
														<Select
															options={payment_types.map((val) => ({
																value: val,
																label: val.name,
															}))}
															onChange={(e) => setPaymentType(e.value)}
															placeholder="Monthly, Annually etc"
														/>
														<div className="help-block with-errors"></div>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Budget</label>
														<input
															className="form-control"
															placeholder="Your rent budget"
															defaultValue={budget}
															onChange={(e) => {
																setBudget(e.target.value)
															}}
															required
														/>
														<div className="help-block with-errors"></div>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Service Type</label>
														<Select
															options={services.map((val) => ({
																value: val,
																label: val.name,
															}))}
															onChange={(e) => setService(e.value)}
															placeholder="Monthly, Annually etc"
														/>
														<div className="help-block with-errors"></div>
													</div>
												</div>
												<div className="col-12">
													<div className="form-group">
														<label>
															Where in {personal_info?.location_keyword?.name}?
														</label>
														<GInput
															apiKey={
																process.env.REACT_APP_GOOGLE_PLACES_API_KEY
															}
															apiOptions={{
																language: 'en',
																region: 'ng',
															}}
															selectProps={{
																// props.state.location,
																className: 'border',
																onChange: (e) => {
																	setLocation(e)
																},
															}}
															autocompletionRequest={{
																componentRestrictions: {
																	country: ['ng'],
																},
															}}
														/>
														<div className="help-block with-errors"></div>
													</div>
												</div>

												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>
															Describe your ideal room {`(140 chars)`}
														</label>
														{/* <ReactQuill
													theme="snow"
													value={message_text}
													onChange={(e) => setMessageText(e)}
													modules={{
														toolbar: false,
													}}
													placeholder="I'm looking for a shared flat with AC, Wifi and Gas Cooker"
													className="rounded-xxl"
												/> */}
														<textarea
															className="form-control"
															onChange={(e) => setMessageText(e.target.value)}
															placeholder="I'm looking for a shared flat with AC, Wifi and Gas Cooker"
															rows={'6'}
														/>
														<div className="help-block with-errors"></div>
													</div>
												</div>

												<div className="d-flex justify-content-between align-items-center">
													<Link
														to={`/discussion`}
														className="fw-bold text-danger"
													>
														Cancel
													</Link>
													<button
														disabled={
															!category ||
															!payment_type ||
															!service ||
															!message_text ||
															loading
														}
														type="submit"
														className="default-btn  btn"
														// style={{ pointerEvents: 'all', cursor: 'pointer' }}
													>
														Post Request <span></span>
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				{Global.isMobile && <FooterNav pageName={'requests'} />}
			</div>
		)
}
