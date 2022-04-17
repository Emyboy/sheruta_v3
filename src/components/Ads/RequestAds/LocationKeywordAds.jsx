import React, { useState } from 'react'
import { Modal, notification } from 'antd'
import LocationKeywordSelector from '../../LocationKeywordSelector/LocationKeywordSelector'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

export default function LocationKeywordAds() {
	const [showLocationKeyword, setShowLocationKeyword] = useState(false)
	const { personal_info } = useSelector((state) => state?.view)
	const [loading, setLoading] = useState(false)

	const updatePersonalInfo = async (data) => {
		setLoading(true)
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL + `/personal-infos/${personal_info?.id}`,
				{
					method: 'PUT',
					data: {
						state: data?.state,
						location_keyword: data?.location_keyword,
					},
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			setShowLocationKeyword(false)
			if (res.data) {
				notification.success({ message: 'Location has been set' })
				setLoading(false)
			}
			console.log('UPDATED --', res.data)
		} catch (error) {
			setLoading(false)
			return Promise.reject(error)
		}
	}

	return (
		<div
			className="card rounded-xxl mb-4"
			style={{
				backgroundImage: `url(https://png.pngtree.com/thumb_back/fw800/background/20191011/pngtree-abstract-white-background-with-rounded-squares-image_319149.jpg)`,
				backgroundPosition: 'center',
				backgroundSize: '100% 100%',
				// filter: ""
			}}
		>
			<Modal closable={false} visible={showLocationKeyword} footer={null}>
				<LocationKeywordSelector
					done={(e) => {
						updatePersonalInfo({
							location_keyword: e.locationKeyword?.value,
							state: e.state_id?.value,
						})
					}}
					disabled={loading}
				/>
				<div className="text-center">
					<button
						onClick={() => {
							setShowLocationKeyword(false)
						}}
						className="btn text-danger mt-4"
					>
						Close
					</button>
				</div>
			</Modal>
			<div className="card-body">
				<h1 className="fw-bold">Turn on location notification</h1>
				<h4>
					Get notified when there is a flat or flatmate in your area of choice.
				</h4>
				<button
					onClick={() => setShowLocationKeyword(true)}
					className="btn bg-current text-white fw-bold mt-3"
				>
					Turn On
				</button>
			</div>
		</div>
	)
}
