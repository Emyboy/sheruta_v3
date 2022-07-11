import React from 'react'
import Layout from '../../../components/Layout/Layout'
import SettingsHeader from '../components/SettingsHeader'
import UniqueHabitsForm from '../../../components/UniqueHabits/UniqueHabitsForm'

export default function UniqueHabitsSettings() {
  return (
		<Layout>
			<div className="middle-wrap pb-5">
				<div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
					<SettingsHeader heading={'Edit Unique Habits'} />
					<div className="card-body p-lg-5 p-4 w-100 border-0 text-center mt-1 ">
						<UniqueHabitsForm />
					</div>
					
				</div>
			</div>
		</Layout>
	)
}
