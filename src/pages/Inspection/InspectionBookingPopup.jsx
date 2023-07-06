import { Modal, notification } from 'antd'
import React, { useEffect } from 'react'
import { Calendar } from 'antd'
// import type { CalendarMode } from 'antd/es/calendar/generateCalendar'
// import moment from 'moment'
import { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { HiCheckCircle } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function InspectionBookingPopup({ request, onClose, show }) {
	const [selectDate, setSelectedDate] = useState(null)
	const [selectedTime, setSelectedTime] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const [loading, setLoading] = useState(false)
	const [pageState, setPageState] = useState('ready')
	const [dateOkay, setDateOK] = useState(false)

	const { user } = useSelector((state) => state.auth)

	const guest = request?.users_permissions_user

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!selectedTime || !selectDate || !setDateOK) {
			return setErrorMessage('Please select date and time')
		}
		try {
			setLoading(true)
			const newInspection = await axios(
				process.env.REACT_APP_API_URL + `/property-inspections`,
				{
					method: 'POST',
					data: {
						owner: user?.user,
						guests: [guest],
						date: selectDate,
						time: selectedTime,
						is_alone: true,
						request,
					},
					headers: {
						authorization: 'Bearer ' + Cookies.get('token'),
					},
				}
			)

			console.log('NEW INSPECTION -', newInspection.data)
			setLoading(false)
			setPageState('done')
		} catch (error) {
			setLoading(false)
			return Promise.reject(error)
		}
	}

	useEffect(() => {
		if (errorMessage) {
			setTimeout(() => {
				setErrorMessage(null)
			}, 4000)
		}
	}, [errorMessage])

	useEffect(() => {
		if (selectDate) {
			const today = new Date()

			const userSelectedDate = new Date(selectDate)

			const threeDaysLater = new Date()
			threeDaysLater.setDate(today.getDate() + 3)

			if (userSelectedDate > threeDaysLater) {
				setDateOK(true)
			} else {
				setDateOK(false)
			}
		}
	}, [selectDate])

	if (request && request?.is_searching) {
		return null
	}

	return (
		<Modal footer={null} open={show} onCancel={onClose}>
			<div className="my-3 d-flex flex-column" style={{ gap: '30px' }}>
				{pageState === 'done' && (
					<div className="mt-4">
						<center className="d-flex flex-column align-items-center gap-4">
							<HiCheckCircle
								className="text-theme animate__animated animate__heartBeat"
								size={100}
							/>
							<h2>Your inspection has been booked successfully</h2>
							<h3 className="fw-normal text-muted">
								<Link
									to={`/user/${guest?.username}`}
									className="fw-bold text-theme"
								>
									{guest?.first_name}
								</Link>{' '}
								will accept your request and reach out to you.
							</h3>
							<button
								className="bg-theme fw-bold btn text-white w-100"
								onClick={onClose}
							>
								Okay
							</button>
						</center>
					</div>
				)}
				{pageState === 'ready' && (
					<>
						<h6 className="font-md">
							Virtual inspection with {guest?.first_name}
						</h6>
						<form
							onSubmit={handleSubmit}
							className="d-flex flex-column"
							style={{ gap: '20px' }}
						>
							<div>
								<label>Select Time:</label>
								<input
									type="time"
									className="form-control"
									required
									onChange={(e) => setSelectedTime(e.target.value)}
								/>
							</div>
							<div>
								<label>Select Date:</label>
								<Calendar
									fullscreen={false}
									onPanelChange={(e) => console.log(e)}
									onChange={(e) => setSelectedDate(new Date(e).toJSON())}
								/>
							</div>
							{selectDate && !dateOkay && (
								<div className="alert alert-danger" role="alert">
									Selected date must be more than{' '}
									<span className="alert-link">3 days into the future </span>
									to give{' '}
									<span className="alert-link">{guest?.first_name}</span> time
									to respond.
								</div>
							)}
							<button
								disabled={loading || !dateOkay || !selectedTime}
								className="bg-dark text-white btn w-100"
							>
								{loading ? 'Loading...' : 'Book Now'}
							</button>
						</form>
					</>
				)}
			</div>
		</Modal>
	)
}
