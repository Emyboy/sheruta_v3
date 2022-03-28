import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const options = [
	'User has been unreachable for over 72hrs.',
	"Pictures of the space aren't the same as what's online.",
	'User refused to show proof that he/she rented or owns this flat.',
	'User is rude & unfriendly.',
	"The apartment is no longer available or doesn't exist.",
	'Content is irrelevant.',
	'User has given misleading information concerning the space.',
]

const EachOption = ({ selected, data, onSelect }) => {
	return (
		<div
			className={`card p-2 mb-2 link border-2  ${selected ? 'border-success shadow': 'border-gray'}`}
			onClick={() => onSelect(data)}
		>
			<h5 className="mb-0 fw-500">{data}</h5>
		</div>
	)
}

export default function ReportForm({ onChange }) {
	const [reason, setReason] = useState(null)
	const [reason_text, setReasonText] = useState(null)
	const [loading, setLoading] = useState(false)
	const [done, setDone] = useState(false);
	const { user } = useSelector(state => state.auth);

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			const data = {
				reason,
				reason_text,
				user: sessionStorage.getItem('user'),
				reporter: user?.user?.id
			}
			const res = await axios(process.env.REACT_APP_API_URL + `/red-flags`, {
				method: 'POST',
				data,
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
			})
			onChange(res.data)
			if (res.data) {
                setDone(true)
				setLoading(false)
				setReason(null)
				setReasonText(null)
				setTimeout(() => {
                    setDone(false)
                }, 4000);
			}
		} catch (error) {
			setLoading(false)
			return Promise.resolve(error)
		}
	}

	if (done) {
		return (
			<div className="text-center pt-5 pb-5 animate__animated animate__heartBeat">
				<FaCheckCircle className="text-theme" size={90} />
				<h1 className="mt-4 fw-bold">Sent</h1>
			</div>
		)
	}

	return (
		<div className="pt-3">
			<form className="animate__animated animate__fadeIn">
				<h2 className="text-center fw-bold mb-4">Why are your reporting?</h2>
				{!reason &&
					options.map((val, i) => {
						return (
							<EachOption
								key={`option-${i}`}
								data={val}
								selected={reason === val}
								onSelect={(e) => {
									setReason(e)
								}}
							/>
						)
					})}
				{reason && (
					<div className="animate__animated animate__fadeIn">
						<label className="text-muted">
							Please tell us what happened (optional)
						</label>
						<textarea
							className="p-2 w-100 rounded border-gray"
							placeholder="Please tell us in detail what happened"
							rows={'6'}
							onChange={(e) => setReasonText(e.target.value)}
						/>
					</div>
				)}
				<div className="d-flex mt-4 justify-content-between align-items-center">
					{reason && (
						<>
							<a
								className="text-muted fw-bold"
								onClick={() => (loading ? null : setReason(null))}
							>
								Back
							</a>
							<button
								disabled={loading}
								onClick={handleSubmit}
								className="btn btn-sm btn-success text-white fw-bold "
							>
								Submit
							</button>
						</>
					)}
				</div>
			</form>
		</div>
	)
}
