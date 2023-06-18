import React from 'react'
import BankingInformation from '../../../components/BankingInfo/BankingInformation'
import Layout from '../../../components/Layout/Layout'
import SettingsHeader from '../components/SettingsHeader'

export default function BankingInformationSettings() {
	return (
		<Layout>
			<div className="middle-wrap pb-5 ">
				<SettingsHeader heading={'Manage Banking Information'} />
				<div className="container-fluid card w-100 border-0 bg-white shadow-xs mb-4">
					<div>
						<BankingInformation />
					</div>
				</div>
			</div>
		</Layout>
	)
}
