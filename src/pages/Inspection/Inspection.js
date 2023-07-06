import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { notification } from 'antd'
import EachInspection from './EachInspection'
import Cookies from 'js-cookie'

export default function Inspection() {
	localStorage.setItem('after_login', '/inspections')

	const { user } = useSelector((state) => state.auth)
	const [inspections, setInspections] = useState([])
	useEffect(() => {
		;(async () => {
			try {
				const res = await axios(
					process.env.REACT_APP_API_URL + `/property-inspections/me`,
					{
						headers: {
							authorization: 'Bearer ' + Cookies.get('token'),
						},
					}
				)
				console.log(res.data)
				setInspections([...res.data.mine, ...res.data.others])
			} catch (error) {
				notification.error({ message: 'Error fetching inspections' })
				return Promise.reject(error)
			}
		})()
	}, [])

	if (!user) {
		return <Redirect to="/login" />
	}

	function compareBookings(a, b) {
		const today = new Date().toISOString().split('T')[0]
		if (a.date === today && b.date !== today) {
			return -1 // a is today's date, so it comes before b
		} else if (a.date !== today && b.date === today) {
			return 1 // b is today's date, so it comes before a
		} else {
			// Both have the same date or are not today's date, compare by updated_at
			return new Date(b.updated_at) - new Date(a.updated_at)
		}
	}

	return (
		<Layout>
			<div className="container">
				<div className="row flex-column align-items-center gap-3">
					<div className="col-lg-8 col-sm-12">
						<h1>Your inspections</h1>
					</div>
					{inspections?.sort(compareBookings).map((ins) => {
						return <EachInspection key={ins?.id} data={ins} />
					})}
				</div>
			</div>
		</Layout>
	)
}
