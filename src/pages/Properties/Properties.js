import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import EachProperty from './EachProperty'
import { HiFilter } from 'react-icons/hi'
import { Form, Select } from 'antd'
import { getLocationKeyWordsByState } from '../../redux/strapi_actions/view.action'
import { Alert, Button } from 'react-bootstrap'
import Sticky from 'react-sticky-el'
import Global from '../../Global'
import store from '../../redux/store/store'
import SMap from '../../components/SMap/SMap'
import { getAllRecentProperties } from '../../redux/strapi_actions/properties.action'

const { Option } = Select

export default function Properties() {
	const { recent_properties } = useSelector((state) => state.properties)
	const { location_keywords } = useSelector((state) => state.view)
	const { user } = useSelector((state) => state.auth)
	const { personal_info } = useSelector((state) => state.view)
	const dispatch = useDispatch()
	const defaultTabs = ['Grid View', 'Map View', 'User View']
	const [tabs] = useState(defaultTabs)
	const [tab, setTab] = useState(defaultTabs[0])
	const [filterOption, setFilterOptions] = useState(
		personal_info?.state ? personal_info?.state?.id : 1
	)

	useEffect(() => {
		dispatch(getLocationKeyWordsByState(filterOption))
	}, [dispatch, filterOption])

	return (
		<Layout>
			<div className="row">
				<div className="">
					<Sticky
						className="shadow-xxl w-100"
						stickyStyle={{
							zIndex: 10,
							marginTop: Global.isMobile ? '6vh' : '11vh',
						}}
					>
						<div className="card shadow-xss w-100 d-block d-flex p-4 mb-3 pb-2 rounded-xxl">
							<div className="card-body d-flex align-items-center p-0 justify-content-between pb-3">
								<div>
									<h2 className="fw-700 mb-0 mt-0 font-md text-grey-700">
										Flats
									</h2>
									{personal_info?.location_keyword && (
										<div className="badge badge-info">
											{personal_info?.location_keyword?.name}
										</div>
									)}
								</div>
								{/* <div className="search-form-2 ms-auto">
								<i className="ti-search font-xss"></i>
								<input
									type="text"
									className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
									placeholder="Search here."
								/>
							</div> */}
								{/* <a
								href="#"
								className="pl-3 pr-3 ms-2 bg-greylight theme-dark-bg rounded-3"
							>
								<i className=" font-xss text-grey-600">
									<HiFilter />
								</i>{' '}
								<span className="text-grey-600 fw-700">Filter</span>
							</a> */}

								<Select
									placeholder="Search Location"
									allowClear
									style={{ width: '200px' }}
									onChange={(e) => dispatch(getAllRecentProperties(e))}
								>
									{location_keywords?.map((val, i) => {
										return (
											<Option value={val?.id} key={`option-${i}`}>
												{val?.name}
											</Option>
										)
									})}
								</Select>
							</div>
							<div className="d-block w-100 shadow-none mb-0 p-0 border-top-xs">
								<ul
									className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ml-0"
									id="pills-tab"
									role="tablist"
								>
									{tabs.map((val, i) => {
										return (
											<li
												key={`tab-${i}`}
												className={`${
													tab === val && 'active'
												} list-inline-item me-5`}
											>
												<a
													className={`fw-700 font-xssss text-grey-500 pt-3 pb-2 ls-1 d-inline-block ${
														tab === val && 'active'
													}`}
													href="#navtabs1"
													data-toggle="tab"
													onClick={() => setTab(val)}
												>
													{val}
												</a>
											</li>
										)
									})}
								</ul>
							</div>
						</div>
					</Sticky>
					{personal_info && !personal_info?.location_keyword && (
						<Alert variant="danger" className="mt-4 mb-4">
							<Alert.Heading className="fw-bold">
								Hey, {user?.user?.first_name?.split(' ')[0]}
							</Alert.Heading>
							<hr />
							<div className="row justify-content-between">
								<p className="mb-0 col-md-6">
									Please set a state so we can find the best flat for you. Click
									on the <strong>Select State</strong> button to start.
								</p>
								<div className="col-md-3 col-sm-12">
									<Button
										variant="dark"
										className="mt-3 w-100 bg-accent text-white fw-bold"
										onClick={() => {
											store.dispatch({
												type: 'SET_VIEW_STATE',
												payload: {
													collect_location_keyword: true,
												},
											})
										}}
									>
										Select State
									</Button>
								</div>
							</div>
						</Alert>
					)}
					{tab === defaultTabs[1] && (
						<>
							{recent_properties?.length > 0 && (
								<div className="card p-2 mb-4" style={{ height: '800px' }}>
									<SMap properties={recent_properties} />
								</div>
							)}
						</>
					)}
					{tab === defaultTabs[0] && (
						<div className="row ps-2 pe-2">
							{recent_properties.map((val, i) => {
								return (
									<div
										className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2"
										key={`property-${i}`}
									>
										<EachProperty data={val} />
									</div>
								)
							})}
						</div>
					)}
				</div>
			</div>
		</Layout>
	)
}
