import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import EachNotification from './EachNotification'
import Layout from '../../components/Layout/Layout';
import { Redirect } from 'react-router';

export default function Notifications() {
	const { user } = useSelector(state => state.auth);
	const { notifications } = useSelector((state) => state.view);
    localStorage.setItem('after_login', '/notifications');
	if(!user){
		return <Redirect to={'/login'} />
	}
	return (
		<Layout pageName="notifications">
			<div className="container">
				<div className="row">
					<div className="col-xl-12">
						<div className="chat-wrapper p-3 w-100 position-relative scroll-bar bg-white theme-dark-bg">
							<h2 className="fw-700 mb-4 mt-2 font-md text-grey-900 d-flex align-items-center">
								Notification
								<span className="circle-count bg-warning text-white font-xsssss rounded-3 ms-2 ls-3 fw-600 p-2  mt-0">
									{notifications.filter((x) => !x.seen).length}
								</span>
								{/* <a
									href="#"
									className="ms-auto btn-round-sm bg-greylight rounded-3"
								>
									<i className="feather-hard-drive font-xss text-grey-500"></i>
								</a>
								<a
									href="#"
									className="ms-2 btn-round-sm bg-greylight rounded-3"
								>
									<i className="feather-alert-circle font-xss text-grey-500"></i>
								</a>
								<a
									href="#"
									className="ms-2 btn-round-sm bg-greylight rounded-3"
								>
									<i className="feather-trash-2 font-xss text-grey-500"></i>
								</a> */}
							</h2>

							<ul className="notification-box">
								{notifications &&
									notifications.map((val, i) => {
										return <EachNotification key={`notify-${i}`} data={val} />
									})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
