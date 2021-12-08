import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import AccountDeactivationSetting from './settings/AccountDeactivationSetting'
import AccountSettings from './settings/AccountSettings'
import PersonalInfoSettings from './settings/PersonalInfoSettings'
import { Switch } from 'antd'
import ConfigureViewSettings from './settings/ConfigureViewSettings'

export default function Settings({ match }) {
	const { user } = useSelector((state) => state.auth)
	const [darkMode, setDarkMode] = useState(false)
	const type = match.params?.type

	useEffect(() => {
		if (darkMode) {
			document.getElementById('body-tag').classList.add('theme-dark')
		} else {
			document.getElementById('body-tag').classList.remove('theme-dark')
		}
	}, [darkMode])

	if (!user) {
		return <Redirect to="/login" />
	} else
		switch (type) {
			case 'account-settings':
				return <AccountSettings />
			case 'personal-info':
				return <PersonalInfoSettings />
			case 'deactivate-account':
				return <AccountDeactivationSetting />
			case 'configure-view':
				return <ConfigureViewSettings />
			default:
				return (
					<Layout currentPage={'settings'}>
						<div className="middle-wrap">
							<div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
								<div className="card-body p-lg-5 p-4 w-100 border-0">
									<div className="row">
										<div className="col-lg-12">
											<h4 className="mb-4 font-xxl fw-700 mont-font mb-lg-5 mb-4 font-md-xs">
												Settings
											</h4>
											<div className="nav-caption fw-600 font-xssss text-grey-500 mb-2">
												Account
											</div>
											<ul className="list-inline mb-4">
												<li className="list-inline-item d-block border-bottom me-0 pl-0">
													<Link
														to="/settings/account-settings"
														className="pt-2 pb-2 d-flex align-items-center"
													>
														<i className="btn-round-md bg-primary-gradiant text-white feather-user font-md me-3"></i>{' '}
														<h4 className="fw-600 font-xsss mb-0 mt-0">
															Account Settings
														</h4>
														<i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
													</Link>
												</li>
												<li className="list-inline-item d-block border-bottom me-0 pl-0">
													<Link
														to="/settings/personal-info"
														className="pt-2 pb-2 d-flex align-items-center"
													>
														<i className="btn-round-md bg-gold-gradiant text-white feather-map-pin font-md me-3"></i>{' '}
														<h4 className="fw-600 font-xsss mb-0 mt-0">
															Personal Info
														</h4>
														<i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
													</Link>
												</li>
												<li className="list-inline-item d-block border-bottom me-0 pl-0">
													<Link
														to={'/settings/deactivate-account'}
														className="pt-2 pb-2 d-flex align-items-center"
													>
														<i className="btn-round-md bg-mini-gradiant text-white feather-power font-md me-3"></i>{' '}
														<h4 className="fw-600 font-xsss mb-0 mt-0">
															{user?.user.deactivated
																? 'Activate'
																: 'Deactivate'}{' '}
															Account
														</h4>
														<i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3 mr-3"></i>
													</Link>
												</li>
											</ul>

											<div className="nav-caption fw-600 font-xsss text-grey-500 mb-2">
												Application
											</div>
											<ul className="list-inline mb-4">
												<li className="list-inline-item d-block border-bottom me-0">
													<Link
														to={`/settings/configure-view`}
														className="pt-2 pb-2 d-flex align-items-center"
													>
														<i className="btn-round-md bg-mini-gradiant text-white feather-file-text font-md me-3"></i>{' '}
														<h4 className="fw-600 font-xsss mb-0 mt-0">
															Configure View
														</h4>
														<i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
													</Link>
												</li>
												<li className="list-inline-item d-block  me-0 pl-0">
													<a
														href="#mode"
														className="pt-2 pb-2 d-flex align-items-center"
													>
														<i className="btn-round-md bg-blue-gradiant text-white feather-moon font-md me-3"></i>{' '}
														<h4 className="fw-600 font-xsss mb-0 mt-0 mr-3">
															Dark Mode
														</h4>
														<Switch
															defaultChecked={darkMode}
															onChange={() => setDarkMode(!darkMode)}
														/>
														{/* <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i> */}
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Layout>
				)
		}
}
