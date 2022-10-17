import { Popover, Tooltip } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { API_URL } from '../../../redux/strapi_actions/contact.actions'

export default function Promote({ type, request_id, user_id }) {
	const [days, setDays] = useState(5)
	const { user } = useSelector((state) => state.auth)
	const [showTip, setShowTip] = useState(true)

	useEffect(() => {
		if (days < 5) {
			setDays(5)
		}
	}, [days])
	useEffect(() => {
		if (showTip) {
			setTimeout(() => {
				setShowTip(false)
			}, 7000)
		}
	}, [showTip])

	const promote = async () => {
		try {
			const res = await axios(API_URL + `/ads/promote`, {
				method: 'POST',
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
				data: {
					days,
					owner: user_id || user?.user?.id,
					type,
					request_id,
					profile: user_id,
				},
			})
			console.log('RES --', res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}

	const content = (
		<div>
			<p>Content</p>
			<p>Content</p>
		</div>
	)

	return (
		<div className="container">
			<div className="d-flex flex-column text-center py-5">
				<h2>Promote</h2>
				<small style={{ lineHeight: '15px' }}>
					Promote your post or profile and get more visibility
				</small>

				<div className="mt-5">
					<div className="mb-5 d-flex justify-content-center">
						<button
							disabled={days === 5}
							onClick={() => setDays(days - 1)}
							className="btn align-self-center fw-bold font-xl btn-sm border"
							style={{ borderRadius: '70px', width: '50px', height: '50px' }}
						>
							-
						</button>
						<div>
							<small>For </small>
							<h1 className="font-xxl mx-4 mb-0 ">{days} Days</h1>
						</div>
						<Tooltip
							visible={showTip}
							open={true}
							content={content}
							title="Extend duration"
						>
							<button
								onClick={() => setDays(days + 1)}
								className="btn align-self-center fw-bold font-xl btn-sm border"
								style={{ borderRadius: '70px', width: '50px', height: '50px' }}
							>
								+
							</button>
						</Tooltip>
					</div>
					<div className="d-flex flex-column">
						<button className="btn bg-accent text-white" onClick={promote}>
							Promote For{' '}
							{days > 5 ? (
								<strong>
									₦ {window.formattedPrice.format(500 * days - 2000)}
								</strong>
							) : (
								'Free'
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
