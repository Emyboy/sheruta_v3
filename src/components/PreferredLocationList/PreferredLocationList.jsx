import axios from 'axios'
import React from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Dots } from 'react-activity'

export default function PreferredLocationList({ userData }) {
	const [pageState, setPageState] = useState('loading')
	const [list, setList] = useState([])

	const getLocations = useCallback(async () => {
		setPageState('loading')
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/user-preferred-locations?users_permissions_user=${userData?.id}`
			)
			if (res?.data) {
				setPageState('loaded')
			}
			setList(res.data)
		} catch (error) {
			setPageState('error')
			return Promise.reject(error)
		}
	}, [setList])

	useEffect(() => {
		getLocations()
	}, [getLocations])

	return (
		<div>
			<div
				className="card rounded border-0 d-flex  p-2 "
				style={{ minHeight: '300px' }}
			>
				{pageState === 'loading' && (
					<div className="text-center mt-5">
						<Dots />
					</div>
				)}
				{pageState === 'error' && (
					<div className="text-center">
						<h5>Error, Please Reload</h5>
					</div>
				)}
				{pageState === 'loaded' &&
					list.map((val, i) => {
						return (
							<div
								className="border-0 p-2 d-flex align-items-center mb-2 border-bottom truncate"
								key={`local-${i}`}
							>
								<i className="ti ti-location-pin"></i>
								<h4 class="fw-700 font-xsss m-0 pl-3">{val?.location}</h4>
							</div>
						)
					})}
			</div>
		</div>
	)
}
