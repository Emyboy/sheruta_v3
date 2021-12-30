import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import UserService from '../../services/UserService'

export default function LocationUpdatePopup() {
	const [show, setShow] = useState(false)
	const { user } = useSelector((state) => state.auth)

	const saveLocation = (longitude, latitude) => {
		// if (
		// 	user.user.geo_location && JSON.parse(user.user.geo_location).longitude !== longitude &&
		// 	JSON.parse(user.user.geo_location).latitude !== latitude
		// ) {
		// }
		if (!sessionStorage.getItem('loc-set')) {
			UserService.updateProfile({
				geo_location: JSON.stringify({ longitude, latitude }),
			})
			sessionStorage.setItem('loc-set', true)
		}
		setShow(false)
	}

	const enableLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(
				function (position) {
					let longitude = position.coords.longitude
					let latitude = position.coords.latitude

					saveLocation(longitude, latitude)
				},
				function (error) {
					if (error.code == error.PERMISSION_DENIED) {
						setShow(true)
					}
				}
			)
			// setTimeout(() => {
			// }, 70000);
			navigator.geolocation.getCurrentPosition((e) => {
				let longitude = e.coords.longitude
				let latitude = e.coords.latitude
				saveLocation(longitude, latitude)
				setShow(false)
			})
		} else {
			setShow(false)
		}
	}

	useEffect(() => {
		setTimeout(() => {
			if (user && !user.user.geo_location) {
				setShow(true)
			}
		}, 15000)
	}, [])

	return (
		<Modal show={show}>
			<Modal.Body className="text-center">
				<h1 className="fw-bold mt-3">Enable Location</h1>
				<h2>Help us find the best flatmate in your region</h2>
				{/* <div className='badge badge-info mb-3'>Get the best out of Sheruta</div><br /> */}
				<i
					className="ti ti-location-pin fw-bold"
					style={{ fontSize: '100px' }}
				></i>
				<br />
				<button
					className="btn bg-theme fw-bold mt-5 shadow mb-4 w-50"
					onClick={enableLocation}
				>
					Enable
				</button>
				<br />
				<button
					className="btn btn-sm text-danger mb-4"
					onClick={() => setShow(false)}
				>
					Remind Me Later
				</button>
			</Modal.Body>
		</Modal>
	)
}
