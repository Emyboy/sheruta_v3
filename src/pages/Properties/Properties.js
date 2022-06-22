import React, { useCallback, useEffect, useState } from 'react'
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
import { Helmet } from 'react-helmet'
import {
	getAllRecentProperties,
	getPropertiesByLocationKeyword,
} from '../../redux/strapi_actions/properties.action'
import { BiSearchAlt } from 'react-icons/bi'
import { useLocation, useParams } from 'react-router'
import PropertiesService from '../../services/PropertiesServices'
import loadingGIF from '../../assets/img/loading.gif'
import { Dots } from 'react-activity'

const { Option } = Select

export function useURLQuery() {
	const { search } = useLocation()

	return React.useMemo(() => new URLSearchParams(search), [search])
}

export default function Properties(props) {
	// console.log('PROPS --', props)
	localStorage.setItem(
		'after_login',
		window.location.pathname + window.location.search
	)
	const { recent_properties, properties } = useSelector(
		(state) => state.properties
	)
	const [list, setList] = useState([])
	const { location_keywords, categories, services } = useSelector(
		(state) => state.view
	)
	const { user } = useSelector((state) => state.auth)
	const { personal_info } = useSelector((state) => state.view)
	const dispatch = useDispatch()
	const defaultTabs = ['Grid View', 'Map View', 'User View']
	const [tab, setTab] = useState(defaultTabs[0])
	const [pageState, setPageState] = useState('loading')

	const getPropertiesViaULR = useCallback(async () => {
		try {
			const res = await PropertiesService.getPropertyViaQuery(
				String(props?.location?.search)
					.replace('location', 'location_keyword.slug')
					.replace('type', 'categorie.slug')
					.replace('service', 'service.slug') + `&_sort=created_at:DESC`
			)
			setList(res.data)
			if (res.data.length === 0) {
				setPageState('404')
			} else {
				setPageState('loaded')
			}
		} catch (error) {
			setPageState('404')
			return Promise.reject(error)
		}
	}, [])

	const getRecentProperties = useCallback(async () => {
		try {
			const res = await PropertiesService.getRecentProperties(1)
			setList(res.data);
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		if (props?.location?.search) {
			getPropertiesViaULR()
		} else {
			getRecentProperties()
		}
	}, [getPropertiesViaULR, props?.location?.search])

	let query = useURLQuery()

	const seo_heading = `Available ${
		query.get('type') ? query.get('type').replace('-', ' ') : 'Flats'
	} for
				share in ${query.get('location') ? query.get('location') : 'Lagos'}`

	return (
		<Layout full_screen>
			<Helmet>
				<title>{seo_heading + ' | Sheruta'}</title>
				<meta
					name="description"
					content={`List of ${seo_heading}, also for rent.`}
				/>
			</Helmet>

			<div
				className="container-fluid"
				style={{ paddingTop: !user ? '1vh' : '0' }}
			>
				<div className="row">
					<div className="col-xl-7   chat-left scroll-bar scrollarea">
						<Sticky
							className="shadow-xxl w-100"
							scrollElement=".scrollarea"
							stickyClassName="animate__animated animate__fadeInDown"
							stickyStyle={{
								zIndex: 10,
								marginTop: Global.isMobile ? '0vh' : '0vh',
							}}
						>
							<h2
								className="m-0 p-0"
								style={{ size: '0px', visibility: 'hidden' }}
							>
								Flats{' '}
								{query.get('location') ? 'in ' + query.get('location') : ''}
							</h2>
							<div className="card shadow-md w-100 d-block d-flex pt-3 mb-3 pb-3 pl-0 pr-0 rounded-xxl">
								<div className="d-flex align-items-center  justify-content-between">
									<div className="row m-0 justify-content-between w-100">
										<div className="col-md-4 col-sm-12">
											<Select
												placeholder="Filter By Location"
												className={Global.isMobile ? 'w-100 mb-3' : ''}
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

										<div className="col-md-5 col-sm-12 text-end">
											<Select
												placeholder="Filter By Type"
												className={Global.isMobile ? 'w-100' : ''}
												allowClear
												style={{ width: '200px' }}
												onChange={(e) => dispatch(getAllRecentProperties(e))}
											>
												{categories?.map((val, i) => {
													return (
														<Option value={val?.id} key={`option-${i}`}>
															{val?.name}
														</Option>
													)
												})}
											</Select>
										</div>
									</div>
								</div>
								{/* <div className="d-block w-100 shadow-none mb-0 p-0 border-top-xs">
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
								</div> */}
							</div>
						</Sticky>
						{personal_info?.state && personal_info?.location_keyword && (
							<div className="row justify-content-center align-items-center">
								<div className="col-md-9 col-sm-12">
									<Alert variant="info" className="row justify-content-between">
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
										Click on the <strong>Select State</strong> button to start.
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
							<>
								<h1
									className="mb-3 mt-5 ml-3"
									style={{ textTransform: 'capitalize' }}
								>
									{seo_heading}
								</h1>
								<div className="row ps-2 pe-2">
									{list.map((val, i) => {
										return (
											<div
												className="col-lg-12 col-md-12 col-sm-12"
												key={`property-${i}`}
											>
												<EachProperty data={val} />
											</div>
										)
									})}
								</div>
							</>
						)}
						{pageState === '404' && (
							<div className="text-center " style={{ marginTop: '10vh' }}>
								<BiSearchAlt className="text-grey-500" size={60} />
								<h2 className="text-grey-500 fw-bold">
									No Result Found{' '}
									{list?.state && `In ${personal_info?.location_keyword?.name}`}
								</h2>
							</div>
						)}
						{pageState === 'loading' && (
							<div className="text-center " style={{ paddingTop: '20vh' }}>
								<Dots />
								<h5 className="fw-500">Just A Moment</h5>
							</div>
						)}
					</div>
					{!Global.isMobile && (
						<div className="col-xl-5 col-md-12 d-none d-xl-block ps-0 chat-left">
							<div
								className="card p-2 mb-4 rounded-xxl"
								style={{ height: '800px' }}
							>
								<SMap properties={list} />
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	)
}
