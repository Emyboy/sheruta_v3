import { notification } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Layout from '../../../components/Layout/Layout'
import LocationKeywordSelector from '../../../components/LocationKeywordSelector/LocationKeywordSelector'
import PersonalInfoService from '../../../services/PersonalInfoService'
import SettingsHeader from '../components/SettingsHeader'

export default function LocationKeywordSettings() {
	const [state, setState] = useState(null)
	const [location_keyword, setLocationKeyword] = useState(null)
	const { personal_info } = useSelector(state => state.view);
	const history = useHistory();

	const update = async () => {
		try {
			const res = await PersonalInfoService.updatePersonalInfo({
				state,
				location_keyword,
			})
			if (res) {
				notification.success({ message: 'location set' })
				if(personal_info?.unique_habits?.length === 0){
					history.push('/settings/unique-habits')
				}
			}
		} catch (error) {
			notification.error({ message: 'Error, please try again' })
			return Promise.reject(error)
		}
	}

	return (
		<Layout>
			<div className="middle-wrap pb-5">
				<div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
					<SettingsHeader heading={'Location Keyword'} />
					<div className="card-body p-lg-5 p-4 w-100 border-0 text-center mt-1 ">
						<LocationKeywordSelector
							done={(e) => {
								setState(e?.state?.value)
								setLocationKeyword(e?.locationKeyword?.value)
							}}
							stand_alone
						/>
						<div className="">
							<button
								disabled={!state && !location_keyword}
								className="btn bg-accent text-white w100"
								onClick={update}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
