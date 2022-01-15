import React, { useEffect, useState } from 'react'
import RequestService from '../../../services/RequestService'
import { Dots } from 'react-activity'
import { Radio } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import Select from 'react-select'
import { useSelector } from 'react-redux'

export default function JoinPaddyDetailsFrom() {
	const { amenities, payment_types, categories, states } = useSelector(
		(state) => state.view
	)
	const { user } = useSelector(state => state.auth);
	const [request, setRequest] = useState(null)
	const [loading, setLoading] = useState(true)
	const [state, setState] = useState({
		budget: null,
		bedrooms: null,
		toilets: null,
		bathrooms: null,
		sittingrooms: null,
		body: null,
	})
	useEffect(async () => {
		try {
			setLoading(true)
			const res = await RequestService.getUserRequestByUserId(user?.user?.id)
			setRequest(res.data[0])
			console.log('REQUEST --', res.data[0])
			setLoading(false)
		} catch (error) {
			setLoading(false)
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		if (request) {
			setState({
				budget: request.budget,
				bedrooms: request.bedrooms,
				toilets: request.toilets,
				sittingrooms: request.sittingrooms,
				bathrooms: request.bathrooms,
				body: request.body,
			})
		}
	}, [request])

	if (loading) {
		return (
			<div>
				<div className="d-flex justify-content-center mt-5 mb-5 text-center">
					<div>
						<h5>Please Wait</h5>
						<Dots />
					</div>
				</div>
			</div>
		)
	}

	return (
		<div>
			<form action="#">
				{request && request.bedrooms && (
					<div className="alert alert-info text-center p-1">
						<h5 className="fw-700 mb-0">Auto filled from your request</h5>
					</div>
				)}
				<div className="row">
					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Bedrooms</label>
							<input
								required
								type="number"
								name="comment-name"
								className="form-control"
								defaultValue={state.bedrooms}
							/>
						</div>
					</div>

					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Bathroom</label>
							<input
								required
								type="number"
								name="comment-name"
								className="form-control"
								defaultValue={state.bathrooms}
							/>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Toilet</label>
							<input
								required
								type="number"
								name="comment-name"
								className="form-control"
								defaultValue={state.toilets}
							/>
						</div>
					</div>
					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Amenities</label>
							{/* <input
								required
								type="number"
								name="comment-name"
								className="form-control"
							/> */}
							<Select
								options={
									amenities &&
									amenities.map((val) => ({
										value: val.id,
										label: val.name,
									}))
								}
								multi
							/>
						</div>
					</div>
					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Payment Type</label>
							<Select
								options={payment_types.map((val) => ({
									value: val.id,
									label: val.name,
								}))}
								multi
							/>
						</div>
					</div>
					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Type</label>
							<Select
								options={categories.map((val) => ({
									value: val.id,
									label: val.name,
								}))}
								multi
							/>
						</div>
					</div>
					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">State</label>
							<Select
								options={states.map((val) => ({
									value: val.id,
									label: val.name,
								}))}
								multi
							/>
						</div>
					</div>

					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Budget</label>
							<input
								required
								type="text"
								name="comment-name"
								className="form-control"
								defaultValue={state.budget}
							/>
						</div>
					</div>

					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">
								Can You Change Budget?
							</label>
							<br />
							<Radio.Group
								options={[
									{ label: 'Yes', value: 'Yes' },
									{ label: 'No', value: 'No' },
								]}
								onChange={() => {}}
								value={'Yes'}
								optionType="button"
							/>
						</div>
					</div>

					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Newly Built?</label>
							<br />
							<Radio.Group
								options={[
									{ label: 'Yes', value: 'Yes' },
									{ label: 'No', value: 'No' },
								]}
								onChange={() => {}}
								value={'No'}
								optionType="button"
							/>
						</div>
					</div>
					<div className="col-lg-12 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Agenda</label>
							<TextArea
								showCount
								defaultValue={state.body}
								maxLength={400}
								style={{ height: 100 }}
								onChange={() => {}}
								required
							/>
							{/* <p>{state.body}</p> */}
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}
