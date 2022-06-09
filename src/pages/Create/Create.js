import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import UniqueHabitsForm from '../../components/UniqueHabits/UniqueHabitsForm'
import CreateRequest from '../Request/CreateRequest'

export default function Create() {
	const { personal_info } = useSelector((state) => state.view)
	return (
		<Layout currentPage={'requests'}>
			{personal_info?.looking_for ? <UniqueHabitsForm /> : <CreateRequest />}
		</Layout>
	)
}
