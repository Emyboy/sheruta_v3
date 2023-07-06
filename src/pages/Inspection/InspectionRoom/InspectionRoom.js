import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../_Global'
import { Redirect, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-activity'
import { useInterval } from 'react-use'

export default function InspectionRoom() {
	const [loading, setLoading] = useState(false)
	const { room_id } = useParams()
	const { user } = useSelector((state) => state.auth)
	const [inspectionData, setInspectionData] = useState(null)
	const [pageState, setPageState] = useState('loading')
	const meeting_limit = process.env.NODE_ENV !== 'production' ? 30 : 3600;

	// console.log(params);

	useEffect(() => {
		;(async () => {
			try {
				const res = await axios(API_URL + `/property-inspections/${room_id}`, {
					headers: {
						authorization: 'Bearer ' + Cookies.get('token'),
					},
				})
				console.log(res.data)
				if (res.data && res.data.id && res.data?.meeting_id) {
					setInspectionData(res.data)
					setPageState('meeting_ready')
				} else {
					window.location = '/inspections'
				}
			} catch (error) {
				console.log(error)
				return Promise.reject(error)
			}
		})()
	}, [])

	const timeChecker = useInterval(() => {
		let timer = Number(Cookies.get(`inspection_${inspectionData?.id}`))
		let expires = 7
		if (inspectionData && timer) {
			Cookies.set(`inspection_${inspectionData?.id}`, parseInt(timer) + 1, {
				expires,
			})
		} else if (inspectionData && !timer) {
			Cookies.set(`inspection_${inspectionData?.id}`, 1, { expires })
		}
	}, [1000]);

	const timeKeeper = useInterval(() => {
		let timer = Number(Cookies.get(`inspection_${inspectionData?.id}`))
		if (timer >= meeting_limit) {
			setPageState('ended')
			alert('Time is up')
		}
	},[10000])
	
	useEffect(() => {
		let timer = Number(Cookies.get(`inspection_${inspectionData?.id}`))
		if (inspectionData && timer && timer >= meeting_limit) {
			//! time is over
			window.location = '/inspections';
		}
		/**
		 * - check if inspection is active
		 * - if active and more than 3 days old delete
		 * - check remaining time
		 *
		 */
	}, [inspectionData])

	useEffect(() => {
		return () => {
			clearInterval(timeKeeper)
			clearInterval(timeChecker)
		}
	},[])

	if (!user) {
		return <Redirect to="/login" />
	}

	if (pageState === 'ended') {
		return <Redirect to="/inspections" />
	}

	const _user = user?.user

	return (
		<div
			className="bg-dark d-flex justify-content-center"
			style={{ minHeight: '100vh', maxHeight: '100vh' }}
		>
			<div className="d-flex flex-column w-100">
				<div className="bg-black flex-1 h-100 d-flex w-100 ">
					{pageState === 'loading' && (
						<div className="w-100 d-flex justify-content-center align-items-center">
							<Spinner className="text-theme" />
						</div>
					)}
					{/* // todo: display iframe if ongoing and all participants are present */}
					{pageState === 'meeting_ready' && (
						<>
							<iframe
								src={
									inspectionData?.meeting_id +
									`?displayName=${_user?.first_name}&chat=off&logo=off&minimal`
								}
								allow="camera; microphone; fullscreen; speaker; display-capture; autoplay"
								className="w-100"
							></iframe>
						</>
					)}
				</div>
				<div style={{ height: '100px', backgroundColor: '#006654' }}></div>
			</div>
		</div>
	)
}
