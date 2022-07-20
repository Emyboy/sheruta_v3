import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getAllViewOptions,
	getAuthPersonalInfo,
	getLocationKeyWordsByState,
} from '../../redux/strapi_actions/view.action'
import Select from 'react-select'
import { Alert } from 'react-bootstrap'
import axios from 'axios'
import { notification } from 'antd'
import store from '../../redux/store/store'
import Cookies from 'js-cookie'

export default function LocationKeywordSelector({
	done,
	heading,
	sub_heading,
	stand_alone,
	disabled,
}) {
	const [state_id, setStateId] = useState(null)
	const { location_keywords, states } = useSelector((state) => state.view);
	const [locationKeyword, setLocationKeyword] = useState(null);
	const { personal_info } = useSelector((state) => state?.view);

	const dispatch = useDispatch();

	const updatePersonalInfo = async () => {
		try {
		
			const res = await axios(
				process.env.REACT_APP_API_URL + `/personal-infos/${personal_info?.id}`,
				{
					method: 'PUT',
					data: {
						state: state_id?.value,
						location_keyword: locationKeyword?.value,
					},
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			
			if (res.data) {
				notification.success({ message: 'Location has been set' })
				store.dispatch(getAuthPersonalInfo())
			}
			// console.log('UPDATED --', res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}

	useEffect(() => {
		if (state_id) {
			dispatch(getLocationKeyWordsByState(state_id?.value))
		}
	}, [state_id, dispatch])

	useEffect(() => {
		if (done && stand_alone) {
			return done({ locationKeyword, state: state_id })
		}
	}, [locationKeyword])

	useEffect(() => {
		dispatch(getAllViewOptions())
	}, [])

	const handleSubmit = () => {
		if (done && locationKeyword) {
			done({ locationKeyword, state_id })
		}
		updatePersonalInfo()
	}

	useEffect(() => {
		if (locationKeyword && state_id) {
			setLocationKeyword(null)
		}
	}, [state_id])

	

	return (
		<div>
			<div className="container-fluid">
				<div className="text-center mb-5">
					<h1 className="fw-bold text-grey-600">
						{heading || 'Select location keyword'}
					</h1>
					<h4 className="text-muted">{sub_heading || 'Get instant updates on location'}</h4>
				</div>
				<Alert variant="success">
					<Alert.Heading className="fw-bold">Why?</Alert.Heading>
					<div className="row justify-content-between align-items-center">
						<p>
							We will notify you when there is an activity in the location you
							select below.
						</p>
						<Alert.Heading className="fw-600">For Example</Alert.Heading>
						<ol>
							<li>
								{' '}
								&#8226;{' '}
								{personal_info?.looking_for
									? 'New flats in this location'
									: 'New users looking for in this location'}
							</li>
							<li> &#8226; Rent updates in this location</li>
						</ol>
					</div>
				</Alert>
				<div className="form-group">
					<label className="text-grey-600">State</label>
					<Select
						options={states.map((val) => {
							return { value: val?.id, label: val?.name }
						})}
						onChange={(e) => {
							setStateId(e)
						}}
						placeholder={"Please select a state"}
					/>
				</div>
				{state_id && (
					<div className={`form-group`}>
						<label className={`text-grey-600`}>
							What area in {state_id?.label}?
						</label>
						<span className="ml-1 text-danger fw-bold">*</span>
						<Select
							options={location_keywords.map((val) => {
								return { value: val?.id, label: val?.name }
							})}
							onChange={(e) => {
								setLocationKeyword(e)
							}}
							className={`${!locationKeyword && 'border-danger border rounded'}`}
							placeholder={`Please select one area in ${state_id?.label}`}
						/>
					</div>
				)}

				{!stand_alone && (
					<div className="d-flex justify-content-center mt-5">
						<button
							disabled={!locationKeyword || !state_id || disabled}
							className="bg-current btn btn-sm text-center text-white font-xsss fw-600 p-2 w-50 rounded-3 d-inline-block"
							onClick={handleSubmit}
						>
							Add Notification
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
