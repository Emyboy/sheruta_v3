import React, { useEffect, useState } from 'react'
import Global from '../../../Global'
import UserService from '../../../services/UserService'

export default function Budget(props) {
	const { step, setStep, info } = props
	const [budget, setBudget] = useState(0)

	const handleSubmit = async () => {
		try {
			const res = await UserService.updateProfile({ budget })
			if (res) {
				setStep(step + 1)
			}
		} catch (error) {
			console.log(error)
			return Promise.reject(error)
		}
	}

	useEffect(() => {
		if (!info.looking_for) {
			setStep(step + 1)
		}
	}, [])

	return (
		<div className="text-center mt-5">
			<h1 className="fw-700 font-xxl">{info.looking_for ? "Tell us your budget": "Expected Rent"}</h1>
			<div className="alert alert-info p-1 text-center">
				<h6 className="mb-0">You can change this in account settings</h6>
			</div>
			<h1 className="fw-bold">
				{Global.currency}
				{window.formatedPrice.format(budget)}
			</h1>
			<div className="row justify-content-center">
				<div className="col-lg-6 mb-3">
					<div className="form-group">
						<label className="mont-font fw-600 font-xsss">Enter Budget</label>
						<input
							type="number"
							name="comment-name"
							className="form-control text-center font-xxl fw-bold"
							defaultValue={budget}
							onChange={(e) => setBudget(e.target.value)}
						/>
					</div>
					<button
						onClick={handleSubmit}
						disabled={budget < 20}
						className="btn bg-theme text-white fw-700 mt-4 w-50"
					>
						Continue
					</button>
				</div>
			</div>
		</div>
	)
}
