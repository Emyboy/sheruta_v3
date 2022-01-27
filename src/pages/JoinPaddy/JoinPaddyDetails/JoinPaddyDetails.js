import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import JoinPaddyService from '../../../services/JoinPaddyService'
import PageNotFound from '../../../pages/PageNotFound'
import PageLoading from '../../../components/PageLoader'
import Global from '../../../Global'
import ApartmentPreview from './ApartmentPreview'
import GuestsList from './GuestsList'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ApartmentList from './ApartmentList'

export default function JoinPaddyDetails(props) {
	localStorage.setItem('after_login', window.location.pathname)
	const { uuid } = props?.match?.params
	const tabs = ['Members', 'Apartments', 'Chat', 'Timeline', 'Settings']
	const [pageStatus, setPageStatus] = useState('loading')
	const [data, setData] = useState(null)
	const [currentTab, setCurrentTab] = useState(0)
	const [showOptions, setShowOptions] = useState(false)
	const { user } = useSelector((state) => state.auth)

	const getJoinPaddyDetails = useCallback(async () => {
		setPageStatus('loading')
		try {
			const res = await JoinPaddyService.getJoinPaddyByUid(uuid)
			console.log('PADDY ---', res.data[0])
			if (res?.data.length > 0) {
				setData(res.data[0])
				setPageStatus('loaded')
			} else {
				setPageStatus('404')
			}
		} catch (error) {
			setPageStatus('error')
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getJoinPaddyDetails()
	}, [getJoinPaddyDetails])

	if (pageStatus === '404') {
		return <PageNotFound />
	}

	if (pageStatus === 'loading' && !data) {
		return <PageLoading />
	}

	if (!user) {
		return <Redirect to="/login" />
	}

	return (
		<Layout showMessages>
			<div className="row">
				<div className="col-lg-12 mt-5">
					<div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
						<div className="card-body h250 p-3 rounded-xxl overflow-hidden m-3">
							{/* <img src="images/u-bg.jpg" alt="image" /> */}
						</div>
						<div className="card-body p-0 position-relative">
							<figure
								className="avatar position-absolute w100 z-index-1"
								style={{ top: '-40px', left: '30px' }}
							>
								<img
									src={data?.owner?.avatar_url}
									alt="image"
									className="float-right p-1 bg-white rounded-circle w-100 shadow"
								/>
							</figure>
							<h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
								{data?.owner?.first_name}'s Group
								<span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">
									{data?.agenda}
								</span>
							</h4>
							<div
								className={`d-flex align-items-center justify-content-${
									Global.isMobile ? 'start ml-2 mb-3' : 'center'
								} position-absolute-md right-15 top-0 me-2`}
							>
								<a
									href="#"
									className="d-lg-block bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3"
								>
									Add Friend
								</a>
								<a
									href="#"
									className="d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"
								>
									<i className="feather-mail font-md"></i>
								</a>
								<a
									onClick={() => setShowOptions(!showOptions)}
									id="dropdownMenu4"
									className="d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<i className="ti-more font-md tetx-dark"></i>
								</a>
								<div
									className={`dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg ${
										showOptions && 'show'
									}`}
									aria-labelledby="dropdownMenu4"
								>
									<div className="card-body p-0 d-flex">
										<i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
										<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">
											Save Link{' '}
											<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
												Add this to your saved items
											</span>
										</h4>
									</div>
									<div className="card-body p-0 d-flex mt-2">
										<i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
										<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">
											Hide Post{' '}
											<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
												Save to your saved items
											</span>
										</h4>
									</div>
									<div className="card-body p-0 d-flex mt-2">
										<i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
										<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">
											Hide all from Group{' '}
											<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
												Save to your saved items
											</span>
										</h4>
									</div>
									<div className="card-body p-0 d-flex mt-2">
										<i className="feather-lock text-grey-500 me-3 font-lg"></i>
										<h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-0">
											Unfollow Group{' '}
											<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
												Save to your saved items
											</span>
										</h4>
									</div>
								</div>
							</div>
						</div>

						<div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
							<ul
								className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
								id="pills-tab"
								role="tablist"
							>
								{tabs.map((val, i) => {
									return (
										<li
											className="active list-inline-item me-5"
											onClick={() => setCurrentTab(i)}
										>
											<a
												className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
													currentTab === i && 'active'
												}`}
												// href="#navtabs1"
												data-toggle="tab"
											>
												{val}
											</a>
										</li>
									)
								})}
							</ul>
						</div>
					</div>
				</div>
				{!Global.isMobile && (
					<div className="col-xl-4 col-xxl-3 col-lg-4 pe-0 mt-4">
						<ApartmentPreview data={data} onShowMore={() => setCurrentTab(1)} />
					</div>
				)}
				<div className="col-xl-8 col-xxl-9 col-lg-8 mt-4">
					{
						[
							<GuestsList data={data} />,
							<ApartmentList
								list={data?.properties}
								heading="Added Apartments"
							/>,
						][currentTab]
					}
				</div>
			</div>
		</Layout>
	)
}
