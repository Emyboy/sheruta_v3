import { Modal, notification } from 'antd'
import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import LocationKeywordSelector from '../LocationKeywordSelector/LocationKeywordSelector'
import store from '../../redux/store/store'
import { getAuthPersonalInfo } from '../../redux/strapi_actions/view.action'


export default function LocationKeywordPopup() {
	const { personal_info, collect_location_keyword } = useSelector((state) => state?.view)
	const [loading, setLoading] = useState(false);

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
			store.dispatch({
				type: 'SET_VIEW_STATE',
				payload: {
					collect_location_keyword: false
				}
			})
			if (res.data) {
				notification.success({ message: 'Location has been set' })
				setLoading(false)
				store.dispatch(getAuthPersonalInfo())
			}
			console.log('UPDATED --', res.data)
		} catch (error) {
			setLoading(false)
			return Promise.reject(error)
		}
	}
	return (
		<Modal closable={false} visible={collect_location_keyword} footer={null}>
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
						store.dispatch({
							type: 'SET_VIEW_STATE',
							payload: {
								collect_location_keyword: false,
							},
						})
					}}
					className="btn text-danger mt-4"
				>
					Close
				</button>
			</div>
		</Modal>
	)
}
