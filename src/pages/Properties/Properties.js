import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import EachProperty from './EachProperty'
// import { HiFilter } from 'react-icons/hi'
import { Form, Select } from 'antd'
import { getLocationKeyWordsByState } from '../../redux/strapi_actions/view.action'
import { Alert, Button } from 'react-bootstrap'
import Sticky from 'react-sticky-el'
import Global from '../../Global'
import store from '../../redux/store/store'
import SMap from '../../components/SMap/SMap'
import {
	getAllRecentProperties,
	getPropertiesByLocationKeyword,
} from '../../redux/strapi_actions/properties.action'
import { BiSearchAlt } from 'react-icons/bi'

const { Option } = Select

export default function Properties() {
	const { recent_properties, properties } = useSelector(
		(state) => state.properties
	)
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

	useEffect(() => {
		if(personal_info && personal_info?.location_keyword) {
			dispatch(getPropertiesByLocationKeyword(personal_info?.location_keyword?.id))
			setFilterOptions(personal_info?.state?.id)
		}
	},[personal_info?.location_keyword])

	return (
		<Layout full_screen>
			<div
				className="container-fluid"
				style={{ paddingTop: !user ? '15vh' : '0' }}
			>
				<div className="row">
					<div className="col-xl-7   chat-left scroll-bar">
						<div className="">
							<Sticky
								className="shadow-xxl w-100"
								// stickyClassName="animate__animated animate__fadeInDown"
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
												<div className="d-flex">
													<div className="badge badge-info">
														{personal_info?.location_keyword?.name}
													</div>
													{/* <div className="ml-2 badge badge-info">
														{personal_info?.state?.name}
													</div> */}
												</div>
											)}
										</div>

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
							{personal_info?.state && personal_info?.location_keyword && (
								<div className="row justify-content-center align-items-center">
									<div className="col-md-9 col-sm-12">
										<Alert
											variant="info"
											className="row justify-content-between"
										>
											<div className="col-md-8">
												<Alert.Heading as="h1" className="mb-0 fw-bold">
													Your Current location
												</Alert.Heading>
												<p>
													Your current location is set to{' '}
													<strong>
														{personal_info?.location_keyword?.name},
													</strong>{' '}
													<strong>{personal_info?.state?.name}</strong>
												</p>
											</div>
											<div className="col-md-3">
												<button
													onClick={() => {
														store.dispatch({
															type: 'SET_VIEW_STATE',
															payload: {
																collect_location_keyword: true,
															},
														})
													}}
													className="btn btn-info btn-sm align-self-center"
												>
													Change This
												</button>
											</div>
										</Alert>
									</div>
								</div>
							)}
							{personal_info && !personal_info?.location_keyword && (
								<Alert variant="danger" className="mt-4 mb-4">
									<Alert.Heading className="fw-bold">
										Hey, {user?.user?.first_name?.split(' ')[0]}
									</Alert.Heading>
									<hr />
									<div className="row justify-content-between">
										<p className="mb-0 col-md-6">
											Please set a state so we can find the best flat for you.
											Click on the <strong>Select State</strong> button to
											start.
										</p>
										<div className="col-md-4 col-sm-12">
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
									{[
										properties?.length > 0
											? [...properties]
											: [...recent_properties],
									][0].map((val, i) => {
										return (
											<div
												className="col-6 col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2"
												key={`property-${i}`}
											>
												<EachProperty data={val} />
											</div>
										)
									})}
								</div>
							)}
							{recent_properties?.length === 0 && (
								<div className="text-center mt-5">
									<BiSearchAlt className="text-grey-500" size={60} />
									<h2 className="text-grey-500 fw-bold">No Result Found</h2>
								</div>
							)}
						</div>
					</div>
					<div className="col-xl-5 d-none d-xl-block ps-0 chat-left">
						{recent_properties?.length > 0 && (
							<div className="card p-2 mb-4" style={{ height: '800px' }}>
								<SMap properties={recent_properties} />
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	)
}
