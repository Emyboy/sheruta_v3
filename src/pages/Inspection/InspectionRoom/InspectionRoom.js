import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../_Global'
import { Redirect, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-activity'

export default function InspectionRoom() {
	const [loading, setLoading] = useState(false)
	const { room_id } = useParams()
	const { user } = useSelector((state) => state.auth)
	const [inspectionData, setInspectionData] = useState(null)

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
				if (res.data && res.data.id) {
					setInspectionData(res.data)
				}else {
                    window.location = '/inspections'
                }
			} catch (error) {
				console.log(error)
				return Promise.reject(error)
			}
		})()
	}, [])

	if (!user) {
		return <Redirect to="/login" />
	}

    const _user = user?.user;

	return (
		<div
			className="bg-dark d-flex justify-content-center"
			style={{ minHeight: '100vh', maxHeight: '100vh' }}
		>
			<div className="d-flex flex-column w-100">
				<div className="bg-black flex-1 h-100 d-flex w-100 ">
					{loading || !inspectionData ? (
						<div className="w-100 d-flex justify-content-center align-items-center">
							<Spinner className="text-theme" />
						</div>
					) : (
						<iframe
							src={inspectionData?.meeting_id+`?displayName=${_user?.first_name}&chat=off&logo=off&minimal`}
							allow="camera; microphone; fullscreen; speaker; display-capture; autoplay"
							className="w-100"
						></iframe>
					)}
				</div>
				<div
					style={{ height: '100px', backgroundColor: '#006654' }}
				></div>
			</div>
		</div>
	)
}
