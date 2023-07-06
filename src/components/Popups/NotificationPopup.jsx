import React, { useState } from 'react'
import { BiBell } from 'react-icons/bi'
import Btn from '../Btn/Btn'
import firebase from '../../Firebase'
import { useSelector } from 'react-redux'
import { notifyEmy } from '../../services/Sheruta'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Modal, notification } from 'antd'

export default function NotificationPopup() {
	const [done, setDone] = useState(false)
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState(false)
	const { user } = useSelector((state) => state.auth)
	const { personal_info } = useSelector((state) => state.view)

	const savePushToken = (token) => {
		axios(
			process.env.REACT_APP_API_URL + `/notifications/store/${user.user.id}`,
			{
				method: 'POST',
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
				data: {
					push_token: token,
				},
			}
		)
			.then((res) => {
				setDone(true)
				setLoading(false)
				setShow(false)
				notifyEmy({
					heading: 'Enabled notifications',
				})
				notification.success({ message: 'Notification enabled' })
			})
			.catch((err) => {
				console.log('Error saving notification', err)
				setDone(true)
				setLoading(false)
				setShow(false)
				notifyEmy({
					heading: 'Error saving notification key to DB',
					log: err,
				})
			})
	}

	const handleClick = () => {
		setShow(false)
		Notification.requestPermission().then(() => {
			const msg = firebase.messaging()
			msg
			.requestPermission()
			.then(() => {
					setLoading(false)
					return msg.getToken()
				})
				.then((data) => {
					savePushToken(data)
				})
				.catch((err) => {
					setShow(false)
					// console.log('ERROR --', err)
					// notifyEmy({
					// 	heading: 'Error turning on notification',
					// 	log: { ...err },
					// })
				})
		})
	}

	React.useEffect(() => {
		setTimeout(() => {
			if (
				user &&
				personal_info &&
				Notification.permission !== 'granted' &&
				!sessionStorage.getItem('notify_show')
			) {
				setTimeout(() => {
					// setShow(true)
					handleClick()
					sessionStorage.setItem('notify_show', true)
				}, 20000)
			}
		}, 5000)
		// setShow(true)
	}, [personal_info])

	if (done) {
		return null
	}

	return (
		<Modal visible={show} footer={null} closable={false}>
			<div className="card-body">
				<div className="text-center">
					<BiBell size={80} />
					<h2 className="mt-3 display-6">
						<b>Allow Notifications</b>
					</h2>
					<h4>Get Realtime updates on</h4>
					<hr />
					<div>
						<h2>New flat for share</h2>
						<h2>Requests update</h2>
						<h2>Messages</h2>
						<h2>Profile activities</h2>
						<h2>And much more...</h2>
					</div>
					<hr />
				</div>
				<div className="text-center">
					<Btn
						text="Allow Notifications"
						onClick={handleClick}
						loading={loading}
					/>
					<br />
					<button
						text="Not Now"
						onClick={() => {
							setShow(false)
							notifyEmy({
								heading: `Closed notification popup`,
								log: {page: window.location.pathname}
							})
						}}
						className="btn fw-bold mt-4 btn-sm bg-white text-danger"
					>
						Not Now
					</button>
				</div>
			</div>
		</Modal>
	)
}
