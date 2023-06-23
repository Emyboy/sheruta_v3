import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
	HiCalendarDays,
	HiClock,
	HiEllipsisHorizontal,
	HiOutlineVideoCamera,
	HiOutlineTrash
} from 'react-icons/hi2'
import moment from 'moment'
import axios from 'axios'
import { API_URL } from '../../_Global'
import Cookies from 'js-cookie'
import { notification } from 'antd'
import { Dropdown } from 'react-bootstrap'
import { FiRefreshCcw } from 'react-icons/fi'
import { HiOutlineLogout } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function EachInspection({ data }) {
	const { user } = useSelector((state) => state.auth)
	const [_data, setData] = useState(data)
	const [loading, setLoading] = useState(false)

	const auth = user?.user
	const owner = _data?.owner
	const isMine = owner?.id === auth?.id
	const guest = _data?.guests[0]
	const today = new Date().toISOString().split('T')[0]
	const isToday = _data?.date == today
	// console.log(_data)

	const updateInspectionStatus = async (status) => {
		try {
			setLoading(true)
			const res = await axios(API_URL + `/property-inspections/status`, {
				data: {
					inspection_id: data?.id,
					status,
				},
				headers: {
					authorization: 'Bearer ' + Cookies.get('token'),
				},
				method: 'PUT',
			})
			// console.log('UPDATE --', res.data)
			setData(res.data)
			setLoading(false)
			if (status === 'approved') {
				notification.success({ message: `Invitation accepted 🎉` })
			} else {
				notification.success({ message: `Invitation rejected 💔` })
			}
		} catch (error) {
			setLoading(false)
			notification.error({ message: `Error, please try again` })
			return Promise.reject(error)
		}
	}

	return (
		<div className="col-lg-8 col-sm-12">
			<div className="card">
				<div className="card-body d-flex gap-4 flex-column">
					<div className="d-flex align-items-center justify-content-between flex-row w-100">
						<span>
							Inspection with {isMine ? guest?.first_name : owner?.first_name}
						</span>
						{process.env.NODE_ENV === 'development' && (
							<Dropdown>
								<Dropdown.Toggle
									id="dropdown-basic"
									className="bg-white p-1 border-0 text-muted"
								>
									{/* <HiEllipsisHorizontal size={30} /> */}
									menu
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item>
										<FiRefreshCcw /> Reschedule
									</Dropdown.Item>
									{isMine ? (
										<Dropdown.Item>
											<HiOutlineTrash /> Close inspection
										</Dropdown.Item>
									) : (
										<Dropdown.Item>
											<HiOutlineLogout /> Leave
										</Dropdown.Item>
									)}
								</Dropdown.Menu>
							</Dropdown>
						)}
					</div>
					<div className="d-flex gap-3 align-items-center flex-wrap">
						<span>
							<HiCalendarDays />{' '}
							{isToday ? (
								'Today'
							) : (
								<>{moment(_data?.date).format('Do [of] MMMM')}</>
							)}
						</span>
						<span>
							<HiClock /> {moment(_data?.time, 'HH:mm').format('h:mm A')}
						</span>
						{
							<span
								className={`badge badge-${
									_data?.status === 'awaiting_approval'
										? 'warning'
										: _data?.status === 'rejected'
										? 'danger'
										: 'success'
								}`}
							>
								{_data?.status}
							</span>
						}{' '}
						<span>{moment(_data?.created_at).fromNow()}</span>
					</div>
					{!isMine && _data?.status === 'awaiting_approval' && (
						<div className="btn-group" role="group" aria-label="Basic example">
							<button
								disabled={loading}
								type="button"
								className="btn text-danger fw-bold bg-danger-light"
								onClick={() => updateInspectionStatus('rejected')}
							>
								Reject
							</button>
							<button
								disabled={loading}
								onClick={() => updateInspectionStatus('approved')}
								type="button"
								className="btn bg-theme-light text-theme fw-bold"
							>
								Accept
							</button>
						</div>
					)}
					{_data?.meeting_id && isToday && (
						<div className="btn-group" role="group" aria-label="Basic example">
							{/* <button
								disabled={loading}
								type="button"
								className="btn text-danger fw-bold bg-danger-light"
								onClick={() => updateInspectionStatus('rejected')}
							>
								Reject
							</button> */}
							<Link
								to={`/inspections/room/${_data?.id}`}
								className="btn text-theme fw-bold"
							>
								<HiOutlineVideoCamera size={30} /> Join Call
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
