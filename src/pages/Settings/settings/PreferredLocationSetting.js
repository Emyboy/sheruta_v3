import React from 'react'
import Layout from '../../../components/Layout/Layout'
import  PreferredLocations  from '../../GetStarted/Steps/PrefaredLocations'
import SettingsHeader from '../components/SettingsHeader'

export default function PreferredLocationSetting() {
	return (
		<Layout>
			<div className="middle-wrap pb-5">
				<div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
					<SettingsHeader heading={'Edit Preferred Location(s)'} />
					<div className="card-body p-lg-5 p-4 w-100 border-0 text-center mt-1 mb-2">
						<PreferredLocations standAlone />
					</div>
				</div>
			</div>
		</Layout>
	)
}
