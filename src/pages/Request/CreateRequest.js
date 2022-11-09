import React, { useEffect, useState } from 'react'
import Btn from '../../components/Btn/Btn'
import Select from 'react-select'
import axios from 'axios'
import { Redirect, useParams } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import { v4 as Uid } from 'uuid'
import { Alert, notification, Switch } from 'antd'
import CurrencyInput from 'react-currency-input-field'
import TextInput from '../../components/TextInput/TextInput'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import {
	getAllViewOptions,
	getAuthPersonalInfo,
	getUserFeedback,
} from '../../redux/strapi_actions/view.action'
// import Layout from '../../components/Layout/Layout'
import store from '../../redux/store/store'
import { notifyEmy } from '../../services/Sheruta'
import Cookies from 'js-cookie'
import ImageSelect from './ImageSelect'
import { storage } from '../../Firebase'
import firebase from 'firebase'
import Compressor from 'compressorjs'
import TextArea from 'antd/lib/input/TextArea'
import Global from '../../Global'
import ReactQuill from 'react-quill'
import MainErrorBoundary from '../../components/ErrorBoundries/MainErrorBoundry'
import LocationKeywordSelector from '../../components/LocationKeywordSelector/LocationKeywordSelector'

const Layout = React.lazy(() => import('../../components/Layout/Layout'))

const uid = Uid()

const CraeteRequest = (props) => {
	localStorage.setItem('after_login', `${window.location.pathname}`)
	localStorage.setItem('after_payment', `${window.location.pathname}`)
	const params = useParams()
	const [done, setDone] = useState(false)
	const [image_url, set_image_url] = useState([])
	const dispatch = useDispatch()
	const [edit, setEdit] = useState(false)
	const { personal_info } = useSelector((state) => state.view)

	const { view, match, auth } = props

	// const { params } = match

	const [state, setState] = React.useState({
		categories: [],
		services: [],
		loading: false,
		done: false,
		hideOptions: true,
		message: null,
	})

	const [imageFiles, setImageFiles] = useState({
		img0: null,
		img1: null,
		img2: null,
		img3: null,
		img4: null,
		img5: null,
	})
	const image_count = 5

	const [data, setData] = React.useState({
		heading: null,
		body: null,
		uuid: uid,
		category: null,
		service: null,
		users_permissions_user: props?.auth?.user ? props?.auth?.user?.user?.id : null,
		budget: null,
		location: null,
		google_location: null,
		is_searching: false,
		bathrooms: null,
		bedrooms: null,
		toilets: null,
		is_premium: false,
		payment_type: null,
		state: null,
		rent_per_room: null,
	})

	const sendToDb = () => {
		const newRequest = {
			...data,
			body_html: `<p>${data?.body}</p>`,
			uuid: uid,
			users_permissions_user: props?.auth?.user?.user?.id,
			is_searching: view.personal_info.looking_for,
			image_url,
			state: parseInt(data.state),
			country: process.env.REACT_APP_COUNTRY_ID,
			location_keyword: personal_info?.location_keyword?.id,
			state: personal_info?.state?.id,
		}

		axios(process.env.REACT_APP_API_URL + '/property-requests', {
			method: 'POST',
			data: {
				body: newRequest,
				personal_info: props.view?.personal_info,
			},
			headers: {
				authorization: `Bearer ${Cookies.get('token')}`,
			},
		})
			.then((res) => {
				props.getUserFeedback()
				localStorage.removeItem('ph_request')
				setState({ ...state, loading: false, done: true })
				notification.success({ message: 'You post has been created' })
				setTimeout(() => {
					window.scrollTo(0, 0)
				}, 2000)
			})
			.catch((err) => {
				notifyEmy({
					heading: 'Error Posting requests',
					log: { response: err.response, ...err },
					status: 'error',
				})
				if (err.response.status == 426 || err.response.status === 402) {
					store.dispatch({
						type: 'SET_VIEW_STATE',
						payload: {
							showPaymentPopup: true,
						},
					})
					dispatch(getUserFeedback)
					localStorage.setItem('ph_request', JSON.stringify(newRequest))
				}
				setState({ ...state, loading: false, done: false })
				notification.error({ message: 'Error creating request' })
			})
	}

	useEffect(() => {
		if (params?.request_id) {
			setState({ ...state, loading: true })
			axios(
				process.env.REACT_APP_API_URL +
					`/property-requests/?id=${params.request_id}`
			)
				.then((res) => {
					setData(res.data[0])
					setEdit(true)
					setState({ ...state, loading: false })
				})
				.catch((err) => {
					setEdit(false)
					notification.error({ message: 'Error fetching data' })
					setState({ ...state, loading: false })
					return Promise.reject(err)
				})
		}
	}, [params])

	useEffect(() => {
		dispatch(getAuthPersonalInfo())
	}, [dispatch])

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (parseInt(data.budget) < 100000) {
			notification.error({
				message: 'Rent can not be less than hundred thousand',
			})
			return
		}
		// if (parseInt(data.rent_per_room) < 100000) {
		// 	notification.error({
		// 		message: "Rent per room can't be less than hundred thousand",
		// 	})
		// 	return
		// }
		if (parseInt(data.bathrooms) === 0) {
			notification.error({ message: "Bathroom can't be zero" })
			return
		}
		if (parseInt(data.bedrooms) === 0) {
			notification.error({ message: "Bedroom can't be zero" })
			return
		}
		if (parseInt(data.toilets) === 0) {
			notification.error({ message: "Toilets can't be zero" })
			return
		}
		if (!state.categories) {
			notification.error({ message: 'Please select a category' })
			return
		}
		if (!data.location) {
			notification.error({ message: 'Please add a location' })
			return
		}
		if (!data.category) {
			notification.error({ message: 'Please add a category' })
			return
		}
		if (!data.service) {
			notification.error({ message: 'Please add a service' })
			return
		}
		// if (!data.state) {
		// 	notification.error({ message: 'Please select a state' })
		// 	return
		// }

		//.. Send images to firebase
		const files = []
		const img_urls = []
		Object.values(imageFiles).map((val) => {
			if (val) {
				files.push(val)
			}
		})
		if (files.length === 0) {
			notification.error({ message: 'Please add an image' })
			return
		} else if (files.length < 3) {
			notification.error({ message: 'Please add at least 3 images' })
			return
		}
		setState({ ...state, loading: true })
		if (files.length > 0) {
			files.map(async (file, i) => {
				if (file) {
					await new Compressor(file, {
						quality: 0.3,
						success(result) {
							var uploadTask = storage
								.child(`images/requests/${auth.user.user.id}/${uid}/image_${i}`)
								.put(result)
							uploadTask.on(
								'state_changed',
								(snapshot) => {
									// console.log(
									// 	'PROGRESS ---',
									// 	(snapshot.bytesTransferred / snapshot.totalBytes) * 100
									// )
									var progress =
										(snapshot.bytesTransferred / snapshot.totalBytes) * 100
									// console.log("Upload is " + progress + "% done");
									switch (snapshot.state) {
										case firebase.storage.TaskState.PAUSED: // or 'paused'
											console.log('Upload is paused')
											break
										case firebase.storage.TaskState.RUNNING: // or 'running'
											console.log('Upload is running')
											break
									}
								},
								(error) => {
									notification.error({
										message: 'Upload Error',
									})
									notifyEmy({
										heading: 'Error uploading request image to firebase',
										log: { ...error },
										status: 'error',
									})
								},
								() => {
									uploadTask.snapshot.ref
										.getDownloadURL()
										.then((downloadURL) => {
											img_urls.push(downloadURL)

											if (img_urls.length === files.length) {
												set_image_url(img_urls)
												setDone(true)
											}
										})
								}
							)
						},
						error(err) {
							console.log(err.message)
							notifyEmy({
								heading: 'Error uploading request image to firebase',
								log: { ...err },
								status: 'error',
							})
						},
					})
				}
			})
		} else {
			setDone(true)
		}
	}

	React.useEffect(() => {
		if (done) {
			sendToDb()
		}
	}, [done])

	// React.useEffect(() => {
	// 	const ph_request = JSON.parse(localStorage.getItem('ph_request'))
	// 	if (Object.keys(params).length === 0) {
	// 		setState({ ...state, hideOptions: false })
	// 	}
	// 	if (Object.keys(params).length > 0) {
	// 		setData({
	// 			...data,
	// 			service: parseInt(params.service_id),
	// 			category: parseInt(params.category_id),
	// 			is_searching: params.is_searching === 'true',
	// 		})
	// 		setData({ ...data, ...ph_request })
	// 	}
	// 	if (ph_request) {
	// 		setState({ ...state, message: 'Continue from where you left off' })
	// 		const req = JSON.parse(localStorage.getItem('ph_request'))
	// 		setData({
	// 			...data,
	// 			heading: req.heading,
	// 			body: req.body,
	// 			budget: req.budget,
	// 			category: req.category,
	// 		})
	// 	}
	// }, [])

	useEffect(() => {
		dispatch(getAllViewOptions())
		window.scrollTo(0, 0)
	}, [])

	const handleImageSelect = (file, i) => {
		setImageFiles({ ...imageFiles, [`img${i}`]: file })
	}

	if(personal_info && personal_info?.is_searching){
		return <Redirect to={`/discussion`} />
	}

	if (!auth?.user) {
		return <Redirect to="/signup" />
	}
	if (!props.view.personal_info) {
		return null
	}
	if (auth?.user && auth?.user?.user?.deactivated) {
		return <Redirect to="/settings/deactivate-account" />
	}

	if (!personal_info?.state && !personal_info?.location_keyword) {
		return (
			<Layout currentPage={'requests'}>
				<div className="row justify-content-center pt-5">
					<div className="col-lg-8 col-sm-12">
						<LocationKeywordSelector />
					</div>
				</div>
			</Layout>
		)
	}

	if (state.done) {
		return <Redirect to="/feeds" />
	} else if (!props.auth.user) {
		return <Redirect to="/login" />
	} else
		return (
			<Layout currentPage={'requests'}>
				<MainErrorBoundary>
					<div className="mt-5 pb-5">
						<div className="container card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
							<div className="pt-5 pb-5">
								<div className="text-center">
									<h1 className="display-6 mb-3">
										<b>Submit Property</b>
									</h1>
									<div className="row justify-content-center mb-5">
										<div className="col-lg-6 col-sm-12">
											<div className="alert alert-warning rounded-xxl">
												<h2
													className="fw-700 text-warning mb-2"
													style={{ fontSize: '30px' }}
												>
													Warning
												</h2>
												<h5 className="mb-0">Once posted can't edit</h5>
											</div>
										</div>
									</div>
									{state?.message ? (
										<Alert message={state?.message} type="success" />
									) : null}
								</div>
								<div className="comment-box submit-form border-0">
									{/* <h3 className="reply-title">Post Request</h3> */}
									<div className="comment-form mt-1">
										<form onSubmit={handleSubmit}>
											<div className="row">
												<div className="col-lg-12 col-md-6 col-sm-12">
													<TextInput
														label={'Headline'}
														required
														maxLength={70}
														placeholder={
															'Ex. Newly built flat available for share'
														}
														onChange={(e) =>
															setData({
																...data,
																heading: e.target.value,
															})
														}
														defaultValue={data.heading}
													/>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<label>Bedrooms</label>
														<input
															style={{
																height: '40px',
															}}
															className="form-control"
															type="number"
															required
															defaultValue={data.bedrooms}
															placeholder="Eg. 3"
															onChange={(e) =>
																setData({
																	...data,
																	bedrooms: e.target.value,
																})
															}
														/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<label>Toilets</label>
														<input
															style={{
																height: '40px',
															}}
															className="form-control"
															type="number"
															required
															defaultValue={data.toilets}
															placeholder="Eg. 4"
															onChange={(e) =>
																setData({
																	...data,
																	toilets: e.target.value,
																})
															}
														/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<label>Bathrooms</label>
														<input
															style={{
																height: '40px',
															}}
															className="form-control"
															type="number"
															required
															defaultValue={data.bathrooms}
															placeholder="Eg. 2"
															onChange={(e) =>
																setData({
																	...data,
																	bathrooms: e.target.value,
																})
															}
														/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<label>Payment Type</label>

														<Select
															placeholder="Select Service"
															onChange={(e) => {
																setData({
																	...data,
																	payment_type: e.value,
																})
															}}
															options={view?.payment_types?.map((val) => ({
																label: val.name,
																value: val.id,
															}))}
															className="border rounded"
															disabled={state.loading}
														/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<label>Apartment Type</label>
														<Select
															placeholder="Select Category"
															options={view?.categories?.map((val) => ({
																label: val.name,
																value: val.id,
															}))}
															onChange={(e) => {
																setData({
																	...data,
																	category: e.value,
																})
															}}
															className="border rounded"
															disabled={state.loading}
														/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<label>Select Service</label>
														<Select
															placeholder="Select Service"
															onChange={(e) => {
																setData({
																	...data,
																	service: e.value,
																})
															}}
															options={view?.services?.map((val) => ({
																label: val.name,
																value: val.id,
															}))}
															className="border rounded"
															disabled={state.loading}
														/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<label>
															Where in {personal_info?.location_keyword?.name}?
														</label>
														<GooglePlacesAutocomplete
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
																	setData({
																		...data,
																		google_location: e,
																		location: e.label,
																	})
																},
																placeholder: "Type what area it's located in",
															}}
															autocompletionRequest={{
																componentRestrictions: {
																	country: ['ng'],
																},
															}}
														/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<label>Total Rent</label>
														<div className="input-group mb-2">
															<div className="input-group-prepend">
																<div className="input-group-text">
																	{Global.currency}
																</div>
															</div>
															<CurrencyInput
																style={{
																	height: '40px',
																}}
																id="rent"
																name="rent"
																placeholder="The Total Rent"
																defaultValue={data?.budget}
																decimalsLimit={2}
																onValueChange={(value, name) =>
																	setData({
																		...data,
																		budget: value,
																	})
																}
																className="form-control"
															/>
														</div>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<label>Rent Per Room</label>
														<div className="input-group mb-2">
															<div className="input-group-prepend">
																<div className="input-group-text">
																	{Global.currency}
																</div>
															</div>
															<CurrencyInput
																style={{
																	height: '40px',
																}}
																id="rent"
																name="rent"
																placeholder="Rent Per Room"
																defaultValue={data?.rent_per_room}
																decimalsLimit={2}
																onValueChange={(value, name) =>
																	setData({
																		...data,
																		rent_per_room: value,
																	})
																}
																className="form-control"
															/>
														</div>
													</div>
												</div>
												{/* <div className="col-lg-6 col-md-6 col-sm-12">
												<div className="form-group">
													<label>State</label>
													<Select
														placeholder="Ex. Lagos, Abuja etc"
														onChange={(e) => {
															setData({
																...data,
																state: e.value,
															})
														}}
														options={view.states.map((val) => ({
															label: val.name,
															value: val.id,
														}))}
														className="border rounded"
														disabled={state.loading}
													/>
												</div>
											</div> */}
												{/* <div className="col-lg-6 col-md-6 col-sm-12">
												<div className="form-group">
													<label>Premium Flat?</label>
													<div className="d-flex mt-2">
														<Switch
															defaultChecked={data.is_premium}
															onChange={(e) =>
																setData({
																	...data,
																	is_premium: e,
																})
															}
														/>
													</div>
												</div>
											</div> */}

												<div className="col-lg-12 col-md-12 col-sm-12">
													<div className="form-group">
														<label>Tell us about his flat.</label>
														<TextArea
															rows={6}
															placeholder={
																props?.view?.personal_info &&
																props?.view?.personal_info?.looking_for
																	? "Ex: I'd like an apartment in either Alausa, Oregun or a bedspace in Ikeja GRA. Budget is 200-2..."
																	: 'Ex. This flat is newly build or newly furnished flat with air condition, washing machine ....'
															}
															defaultValue={data?.body}
															value={data?.body}
															required
															name="body"
															minLength={50}
															maxLength={900}
															onChange={(e) => {
																setData({
																	...data,
																	body_html: e.target.value,
																	body: e.target.value,
																})
															}}
															disabled={state.loading}
														/>
													</div>
												</div>
												<>
													<div className="container">
														<label className="display-7">Images</label>
													</div>

													<div className="">
														<div className="col-lg-12 p-0">
															<div className="row justify-content-start">
																{new Array(image_count)
																	.fill(null)
																	.map((_, i) => {
																		return (
																			<div
																				className="col-6 col-md-4 col-lg-4"
																				key={`img-${i}`}
																			>
																				<ImageSelect
																					index={i}
																					edit={edit}
																					image={imageFiles[`img${i}`]}
																					onFileChange={(e) => {
																						handleImageSelect(
																							e.target.files[0],
																							i
																						)
																					}}
																				/>
																			</div>
																		)
																	})}
															</div>
														</div>
													</div>
												</>
												<div className="col-lg-12 col-md-12 col-sm-12">
													<hr />
													<div className="form-group">
														<Btn
															type="submit"
															text={
																props?.view.personal_info &&
																props?.view.personal_info.looking_for
																	? 'Post Request'
																	: 'Post Property'
															}
															className="w-100 shadow"
															loading={state.loading}
															onClick={() => {}}
														/>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</MainErrorBoundary>
			</Layout>
		)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	view: state.view,
})

const mapDispatchToProps = {
	getUserFeedback,
}

export default connect(mapStateToProps, mapDispatchToProps)(CraeteRequest)
