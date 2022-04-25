import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import EachInspection from './EachInspection'

export default function Inspection() {
	const { user } = useSelector((state) => state.auth)
	const [ownersGroup, setOwnersGroup] = useState([])
	const [getGroups, setGuestGroup] = useState([])

	const getUserInspection = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/property-inspections/?owner=${user?.user?.id}`,
				{
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)

			setOwnersGroup(res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	const getUserInvitedInspection = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/property-inspections/?guests_in=${user?.user?.id}`,
				{
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)

			setGuestGroup(res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getUserInspection()
		getUserInvitedInspection()
	}, [getUserInspection, getUserInvitedInspection])

	return (
		<Layout>
			<div className="col-xl-12">
				<div class="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
					<div class="card-body d-flex align-items-center p-0">
						<h2 class="fw-700 mb-0 mt-0 font-md text-grey-600">Your Groups</h2>
					</div>
				</div>
				<div className="row ps-2 pe-1 mb-4">
					{ownersGroup?.map((val, i) => {
						return (
							<EachInspection key={`insp-${i}`} data={val} index={i + 100} />
						)
					})}
				</div>
				<div class="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
					<div class="card-body d-flex align-items-center p-0">
						<h2 class="fw-700 mb-0 mt-0 font-md text-grey-600">Other Groups</h2>
					</div>
				</div>
				<div className="row ps-2 pe-1">
					{getGroups?.map((val, i) => {
						return (
							<EachInspection key={`insp-${i}`} data={val} index={i + 110} />
						)
					})}
				</div>
			</div>
		</Layout>
	)
}
