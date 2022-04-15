import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getAllViewOptions,
	getLocationKeyWordsByState,
} from '../../redux/strapi_actions/view.action'
import Select from 'react-select'

export default function LocationKeywordSelector({
	done,
	heading,
	sub_heading,
	stand_alone,
}) {
	const [state_id, setStateId] = useState(null)
	const { location_keywords, states } = useSelector((state) => state.view)
	const [locationKeyword, setLocationKeyword] = useState(null)

	const dispatch = useDispatch()

	useEffect(() => {
		if (state_id) {
			dispatch(getLocationKeyWordsByState(state_id?.value))
		}
	}, [state_id, dispatch])

	useEffect(() => {
		if (done && stand_alone) {
			return done(locationKeyword)
		}
	}, [locationKeyword])

	useEffect(() => {
		dispatch(getAllViewOptions())
	}, [])

	const handleSubmit = () => {
		if (done && locationKeyword) {
			done({ locationKeyword, state_id })
		}
	}


	return (
		<div>
			<div className="container-fluid">
				<div className="text-center mb-5">
					<h1 className="fw-bold text-grey-600">
						{heading || 'Select location keyword'}
					</h1>
					<h4>{sub_heading || 'What area?'}</h4>
				</div>
				<div className="form-group">
					<label className="text-grey-600">State</label>
					<Select
						options={states.map((val) => {
							return { value: val?.id, label: val?.name }
						})}
						onChange={(e) => {
							setStateId(e)
						}}
					/>
				</div>
				{state_id && (
					<div className="form-group">
						<label className="text-grey-600">
							What area in {state_id?.label}?
						</label>
						<Select
							options={location_keywords.map((val) => {
								return { value: val?.id, label: val?.name }
							})}
							onChange={(e) => {
								setLocationKeyword(e)
							}}
						/>
					</div>
				)}

				{!stand_alone && (
					<div className="d-flex justify-content-center mt-5">
						<button
							disabled={!locationKeyword || !state_id}
							className="bg-current btn btn-sm text-center text-white font-xsss fw-600 p-2 w100 rounded-3 d-inline-block"
							onClick={handleSubmit}
						>
							Add
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
