import React, { useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { useParams } from 'react-router'
import Cookies from 'js-cookie'
import { notification, Spin } from 'antd'
import { useSelector } from 'react-redux'
import Global from '../../Global'
import PersonalInfo from '../Profile/PersonalInfo'
import { Modal } from 'antd'

const EachGuest = ({ val, pending, group }) => {
	const [loading, setLoading] = useState(false)
	const { inspection_id } = useParams()
	const [deleted, setDeleted] = useState(false)
	const { user } = useSelector(state => state.auth);

	const [showInfo, setShowInfo] = useState(false);

	const removeGuest = async () => {
		setLoading(true)
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/property-inspections/remove/user/${val?.id}/${inspection_id}`,
				{
					method: 'PUT',
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			if (res.data) {
				setLoading(false)
				setDeleted(true)
				notification.success({ message: 'Removed user' })
			}
			console.log(res.data)
		} catch (error) {
			setLoading(false)
			return Promise.reject(error)
		}
	}

	if (deleted) {
		return null
	}

	return (
		<li>
			<Modal visible={showInfo} footer={null} onCancel={() => setShowInfo(false)}>
				<PersonalInfo userData={val} />
			</Modal>
			<div className="rounded-3 bg-transparent pb-2 mb-2 border-bottom d-flex justify-content-between">
				<div className="email-user d-flex align-items-center">
					<img
						src={val?.avatar_url}
						alt="user"
						className="w35 me-2"
						style={{ borderRadius: '300px' }}
					/>
					<h6 className="font-xss text-grey-700 mb-0 mt-0 fw-700 link" onClick={() => setShowInfo(true)}>
						{val?.first_name?.split(' ')[0]}{' '}
						<span
							className={`btn-round-xss ms-0 bg-${
								val?.online ? 'success' : 'danger'
							} me-2`}
						></span>
						<h6 className="text-grey-600 fw-400 font-xsss mt-2">
							{Global.currency} {window.formatedPrice.format(val.budget)} -
							Budget
						</h6>
					</h6>
				</div>
				<div className="d-flex align-items-center">
					{pending && (
						<span className="mr-2 btn-round-sm bg-current text-white feather-phone font-xss ms-auto mt-2"></span>
					)}
					<span className="mr-2 btn-round-sm bg-current text-white feather-mail font-xss ms-auto mt-2"></span>
					{!pending && user?.user?.id == val?.id && (
						<button
							className="btn btn-sm bg-danger text-white font-xss ms-auto mt-2"
							onClick={removeGuest}
						>
							{loading ? (
								<Spin className="text-white" />
							) : (
								<i className="feather-trash"></i>
							)}{' '}
							Leave
						</button>
					)}
					{!pending && user?.user?.id == group?.owner?.id && (
						<button
							className="btn btn-sm bg-danger text-white font-xss ms-auto mt-2"
							onClick={removeGuest}
						>
							{loading ? (
								<Spin className="text-white" />
							) : (
								<i className="feather-trash"></i>
							)}{' '}
							Remove
						</button>
					)}
				</div>
			</div>
		</li>
	)
}

export default function InspectionGuestList({ data }) {
	return (
		<div className=" p-3 w-100 position-relative scroll-bar bg-white theme-dark-bg">
			{data?.pending_guests?.length > 0 && (
				<>
					<h4 className="fw-bold text-grey-500 mb-3 mt-3">Pending Guests</h4>
					<ul className="email-message">
						{data?.pending_guests?.map((val, i) => {
							return <EachGuest key={`guest-${i}`} val={val} pending group={data} />
						})}
					</ul>
				</>
			)}
			<h4 className="fw-bold text-grey-500 mb-3 mt-5">Guests</h4>
			<ul className="email-message">
				{data?.guests?.map((val, i) => {
					return <EachGuest key={`guest-${i}`} val={val} group={data} />
				})}
			</ul>
		</div>
	)
}
