import { notification } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../../components/Layout/Layout'
import { getAuthPersonalInfo } from '../../../redux/strapi_actions/view.action'
import SettingsHeader from '../components/SettingsHeader'

export default function ConfigureViewSettings() {
	const { personal_info } = useSelector((state) => state.view)
	const [view, setView] = useState(personal_info && personal_info?.looking_for)
    const dispatch = useDispatch();

	useEffect(() => {
		if (personal_info && personal_info.looking_for !== view) {
			axios(
				process.env.REACT_APP_API_URL +
					`/personal-infos/${personal_info.id}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
					},
					data: {
						looking_for: view,
					},
				}
			)
				.then((res) => {
					notification.success({ message: "View changed"});
                    dispatch(getAuthPersonalInfo());
				})
				.catch((err) => {
                    notification.error({ message: "Error changing view"});
				})
		}
	}, [view])

	return (
		<Layout>
			<div className="middle-wrap pb-5">
				<div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
					<SettingsHeader heading={'Configure View'} />
					<div className="card-body p-lg-5 p-4 w-100 border-0 text-center mt-1 mb-2">
						{personal_info && (
							<div className="container mt-5 mb-5">
								<div className="row justify-content-center">
									<div className="col-lg-6 col-md-6 mt-4">
										<div
                                            onClick={() => setView(!view)}
											className={`card rounded link ${
												!view ? 'shadow border-success' : ''
											}`}
										>
											<div className="card-body">
												<h2 className='fw-700'>I have an apartment</h2>
												<p>
													Show me those who are looking for an apartment to
													share
												</p>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-md-6 mt-4">
										<div
                                            onClick={() => setView(!view)}
											className={`card rounded link ${
												view ? 'shadow border-success' : ''
											}`}
										>
											<div className="card-body">
												<h2 className='fw-700'>I am looking for</h2>
												<p>Show me those who have apartments for share.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	)
}
