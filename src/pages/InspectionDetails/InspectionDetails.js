import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useSelector } from 'react-redux'
import InspectionChat from './InspectionChat'
import InspectionGuestList from './InspectionGuestList'
import InspectionDate from './InspectionDate'
import InspectionProperty from './InspectionProperty'
import axios from 'axios'
import { notification } from 'antd'
import Cookies from 'js-cookie'
import Sticky from 'react-sticky-el'
import Global from '../../Global'
import AgentCard from '../../components/Agent/AgentCard'
import { Redirect } from 'react-router'

export default function InspectionDetails({ match }) {
	const tabs = ['Members', 'Inspection', 'Property', 'Agent']
	const [tab, setTab] = useState(tabs[0])
	const { user } = useSelector((state) => state?.auth)
	const [data, setData] = useState(null)

	const getInspection = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/property-inspections/${match?.params?.inspection_id}`,
				{
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			setData(res.data)
			console.log('THE DATA --', res.data)
		} catch (error) {
			notification.error({ message: 'Error loading page' })
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getInspection()
	}, [getInspection])

	if (!user) {
		return <Redirect to="/" />
	}

	return (
		<Layout showMessages>
			{data && (
				<div>
					<div className="row justify-content-center">
						<div className="col-xl-9">
							{/* <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
							<div className="card-body d-flex align-items-center p-0">
								<h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">
									Badge
								</h2>

								<a
									href="#"
									className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3"
								>
									<i className="feather-filter font-xss text-grey-500"></i>
								</a>
							</div>
						</div> */}

							<div className="d-block">
								<div className="bg-white p-0 shadow-lg rounded-3">
									<Sticky
										stickyStyle={{
											zIndex: 10,
											marginTop: Global.isMobile ? '6vh' : '11vh',
										}}
										stickyClassName="bg-white shadow rounded-xxxl animate__animated animate__bounceInDown"
									>
										<div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
											<ul
												className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
												id="pills-tab"
												role="tablist"
											>
												{tabs?.map((val, i) => {
													return (
														<li
															className={`${
																tab === val && 'active'
															} list-inline-item me-5`}
															onClick={() => setTab(val)}
														>
															<a
																className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
																	tab === val && 'active'
																}`}
																data-toggle="tab"
															>
																{val}
															</a>
														</li>
													)
												})}
											</ul>
										</div>
									</Sticky>
									{tab === tabs[0] && <InspectionGuestList data={data} />}
									{tab === tabs[1] && (
										<InspectionDate
											data={data}
											done={(e) => {
												getInspection()
											}}
										/>
									)}
									{tab === tabs[2] && <InspectionProperty data={data} />}
									{tab === tabs[3] && (
										<>
											{!data?.date && !data?.time ? (
												<div className="text-center pt-5 pb-5">
													<h3 className="fw-bold text-grey-700">
														You haven't booked an inspection yet.
													</h3>
													<h4 className="text-grey-600 fw-500">
														Once you book an inspection we'll assign an gent to
														you.
													</h4>
												</div>
											) : (
												<AgentCard val={data} />
											)}
										</>
									)}
									{tab === tabs[4] && <InspectionChat />}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</Layout>
	)
}
