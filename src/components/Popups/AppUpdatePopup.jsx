import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { AiFillWarning } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAppDetail } from '../../redux/strapi_actions/view.action'
import Btn from '../Btn/Btn';
import Cookies from 'js-cookie';

export default function AppUpdatePopup() {
	const [show, setShow] = useState(false)
	const { app_details } = useSelector((state) => state.view)
	const { user } = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const localVersion = localStorage.getItem('version')

	const handleReload = async () => {
		// const data = await caches.keys().then((keyList) => {
		//     Promise.all(
		//         keyList.map((key) => {
		//             console.log("KEY ====", key);
		//             caches.delete(key);
		//         }),
		//     );
		// });
		Cookies.remove('token')
		localStorage.clear();
		sessionStorage.clear();
		caches
			.keys()
			.then((cacheNames) => {
				cacheNames.forEach((cacheName) => {
					caches.delete(cacheName)
				})
			})
			.catch((error) => {
				return Promise.reject(error)
			})
		localStorage.setItem('version', app_details?.version);
		localStorage.setItem('after_login', window.location.pathname)
		window.location.reload()
	}

	useEffect(() => {
		dispatch(getAppDetail())
	}, [])

	useEffect(() => {
		if (app_details && localVersion && user) {
			if (
				app_details.version !== localVersion &&
				typeof localVersion !== undefined
			) {
				setShow(true);
			}
		} else if (app_details) {
			localStorage.setItem('version', app_details?.version)
		}
	}, [app_details])

	return (
		<Modal show={show} style={{ paddingTop: '10vh', paddingRight: 0 }}>
			<div className="bg-whtie p-2 text-center rounde">
				<AiFillWarning size={80} className="text-warning" />
				<h3 className="fw-700" style={{ fontSize: '40px' }}>
					New Update Available
				</h3>
				<p>The current version you are using is currently out of date.</p>
				<p>Please reload the app to get the latest updates.</p>
				<Btn text="Reload" className="w-50 mt-2" onClick={handleReload} />
				<br />
				<Btn
					className="mt-3 btn-sm mb-4"
					danger
					text="Remind Me Later"
					onClick={() => setShow(false)}
				/>
			</div>
		</Modal>
	)
}
