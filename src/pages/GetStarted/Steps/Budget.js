import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Global from '../../../Global'
import UserService from '../../../services/UserService'
import CurrencyInput from 'react-currency-input-field'

export default function Budget(props) {
	const { step, setStep, info } = props
	const [budget, setBudget] = useState(0)
	const { user } = useSelector((state) => state.auth)

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
		if (user && user?.user?.budget) {
			setStep(step + 1)
		}
	}, [])

	return (
		<div className="text-center mt-5">
			<h1 className="fw-700 font-xxl">
				{info.looking_for ? 'Tell us your budget' : 'Expected Rent'}
			</h1>
			<div className="alert alert-info p-1 text-center">
				<h6 className="mb-0">You can change this in account settings</h6>
			</div>
			{/* <h1 className="fw-bold">
				{Global.currency}
				{window.formattedPrice.format(budget)}
			</h1> */}
			<div className="row justify-content-center">
				<div className="col-lg-4 mb-3">
					<div className="form-group">
						<label className="mont-font fw-600 font-xsss">
							Enter {info.looking_for ? 'Budget' : 'Rent'}
						</label>
						<div className="input-group mb-2">
							<div className="input-group-prepend">
								<div className="input-group-text">{Global.currency}</div>
							</div>
							<CurrencyInput
								// type="number"
								name="comment-name"
								id="comment-name"
								className="form-control text-center font-xxl fw-bold"
								defaultValue={budget}
								decimalsLimit={2}
								// onChange={(e) => setBudget(e.target.value)}
								onValueChange={(value) => setBudget(value)}
							/>
						</div>
					</div>
					<button
						onClick={handleSubmit}
						disabled={budget < 20}
						className="btn bg-theme text-white fw-700 mt-4 w-100"
					>
						Continue
					</button>
				</div>
			</div>
		</div>
	)
}
