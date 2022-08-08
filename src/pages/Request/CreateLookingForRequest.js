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

export default function CreateLookingForRequest() {
	const { categories, payment_types, personal_info } = useSelector(
		(state) => state.view
	)
	const { user } = useSelector((state) => state.auth)

	const dispatch = useDispatch()
	const history = useHistory()

	const [message_text, setMessageText] = useState('')
	const [payment_type, setPaymentType] = useState(null)
	const [category, setCategory] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		dispatch(getAllViewOptions())
		dispatch(getAuthPersonalInfo())
	}, [dispatch])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const data = {
			message_text: `${message_text}<br /><br />
			<div className="d-flex justify-content-end">
				
				<span>Budget - N${window.formattedPrice.format(user?.user?.budget)} /${
				payment_type?.name
			}</span>
			</div>`,
			location_keyword: personal_info?.location_keyword?.id,
			from: user?.user?.id,
		}

		try {
			setLoading(true)
			const res = await axios(
				process.env.REACT_APP_API_URL + `/property-requests/create/message`,
				{
					method: 'POST',
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
					data,
				}
			)
			notifyEmy({
				heading: `Posted looking for Request to ${personal_info?.location_keyword?.name} discussion group`,
				status: 'success',
			})
			history.push(
				`/discussion/room/${personal_info?.location_keyword?.id}/${res.data?.id}`
			)
			notification.success({ message: 'Request sent' })
			return Promise.resolve()
		} catch (error) {
			setLoading(false)
			notification.error({ message: 'Error, please try again' })
			return Promise.reject(error)
		}
	}

	return (
		<div>
			<div className="container-fluid">
				<div className="row justify-content-center">
					<div className="col-sm-12 col-md-7">
						{!personal_info?.location_keyword ? (
							<div style={{ paddingTop: '15vh' }}>
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

											<div className="col-lg-12 col-md-12">
												<div className="form-group">
													<label>Message</label>
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
														!message_text ||
														loading
													}
													type="submit"
													className="default-btn  btn"
													// style={{ pointerEvents: 'all', cursor: 'pointer' }}
												>
													Send Message <span></span>
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
			<FooterNav pageName={'requests'} />
		</div>
	)
}
