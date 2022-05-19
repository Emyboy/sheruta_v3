import { DatePicker, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { BsFillCalendarXFill } from 'react-icons/bs'
import moment from 'moment'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

export default function InspectionDate({ data }) {
	const [date, setDate] = useState(null)
	const [time, setTime] = useState(null)
	const [dateError, setDateError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { user } = useSelector((state) => state.auth)

	const validateDate = () => {
		const _end = moment(date)
		const end = new Date(_end)
		const startTime = new Date()
		var difference = end.getTime() - startTime.getTime() // This will give difference in milliseconds
		const result = Math.round(difference / 60000)
		if (result < 0) {
			setDateError('Invalid date. The date you set has passed')
		}
	}

	useEffect(() => {
		if (date) {
			validateDate()
		}
	}, [validateDate])

	useEffect(() => {
		if (dateError) {
			setTimeout(() => {
				setDateError(null)
			}, 4000)
		}
	}, [dateError])

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/property-inspections/invitation/booking/${user?.user?.id}/${data?.id}`,
				{
					method: 'POST',
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
					data: {
						date,
						time
					}
				}
			)
			if (res.data) {
				console.log(res.data)
				setLoading(false)
			}
		} catch (error) {
			if (error.response?.data?.message) {
				notification.error({ message: error.response?.data?.message })
			}
			setLoading(false)
			return Promise.reject(error)
		}
		console.log({
			time,
		})
	}

	return (
		<div className="container-fluid pt-3 pb-3">
			{data?.guests?.length + 1 < data?.property?.bedroom ? (
				<Alert variant="info" className="text-center">
					<Alert.Heading className="fw-bold mb-4">
						Sorry can't book inspection now.
					</Alert.Heading>
					<BsFillCalendarXFill size={100} className="mb-3" />
					<hr />
					<p className="mb-0">
						Not enough members to book an inspection for the{' '}
						<strong>{data?.property?.bedroom}</strong> bedroom flat.
					</p>
				</Alert>
			) : (
				<div>
					<h2 className="text-center fw-bold text-grey-600">Book Inspection</h2>
					<Alert variant="info" className="text-center">
						<p className="mb-0">
							Once you book your inspection everyone on the group will be
							notified.
						</p>
					</Alert>
					<div className="form-group">
						<label>Select Date</label>
						<DatePicker
							aria-errormessage={dateError}
							className="form-control"
							onChange={(e) => setDate(e)}
							disabledTime
						/>
						<small className="text-danger">{dateError}</small>
					</div>
					<div className="form-group">
						<label>Select Time</label>
						<input
							className="form-control"
							type="time"
							onChange={(e) => setTime(e.target?.value)}
						/>
					</div>
					<div className="text-center">
						<button
							onClick={handleSubmit}
							disabled={!date || !time || loading}
							className="bg-accent text-white btn w-50 mt-4 mb-4 btn-lg"
						>
							Book
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
