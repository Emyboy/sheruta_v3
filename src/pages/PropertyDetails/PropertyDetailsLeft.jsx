import React, { useState } from 'react'
import { FaBath, FaBed, FaToilet } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Alert, Modal } from 'react-bootstrap'
import { BsCheckCircleFill } from 'react-icons/bs'
// import { HorizontalScrollWrapper } from '../HomeNew/components/HomeListings/HomeListings'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import EachUserListCard from '../../components/RecentUsersList/EachUserListCard'
import { Dots } from 'react-activity'
import { useSelector } from 'react-redux'
import Global from '../../Global'
import axios from 'axios'
import Cookies from 'js-cookie'
import { notification } from 'antd'
import ImageViewer from 'react-simple-image-viewer'
import { MdImage, MdOutlineLocationOn } from 'react-icons/md'
import ReactHtmlParser from 'react-html-parser'

export default function PropertyDetailsLeft({ data, done, standalone }) {
	const { user } = useSelector((state) => state.auth)
	const [showImages, setShowImages] = useState(false)
	const iconSize = 19

	const [listLoading, setListLoading] = useState(false)

	const showInterest = async () => {
		setListLoading(true)
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL + `/properties/interest/add`,
				{
					method: 'POST',
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
					data: {
						user: user?.user?.id,
						property: data?.id,
					},
				}
			)
			if (res.data) {
				setListLoading(false)
				console.log('ADDED ---', res.data)
				done({
					...data,
					interested_parties: [...data?.interested_parties, user?.user],
				})
				notification.success({ message: "You've been added" })
			}
		} catch (error) {
			setListLoading(false)
			notification.error({ message: 'Error, please try again' })
			return Promise.reject(error)
		}
	}
	return (
		<div className="property-details-desc">
			<div
				className="details-content bg-white rounded"
				style={{
					backgroundImage: `url(${data?.image_urls[0]})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					height: '20rem',
				}}
			>
				{showImages && (
					<ImageViewer
						src={data?.image_urls}
						disableScroll={false}
						closeOnClickOutside={true}
						onClose={() => setShowImages(false)}
						backgroundStyle={{ height: '70vh', marginTop: !Global?.isMobile ? '15vh':'9vh' }}
					/>
				)}
				<div
					className="rounded d-flex justify-content-center align-items-center"
					style={{
						background: '#0606068c',
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: 0,
						left: 0,
					}}
				>
					<button className="btn btn-lg bg-white shadow fw-bold" onClick={() => setShowImages(true)}>
						<MdImage size={30} /> View All Images
					</button>
				</div>
			</div>
			<div className="details-content bg-white rounded">
				<ul className="tag-list">
					{data?.service && <li className="tag">{data?.service?.name}</li>}
					{data?.categorie && (
						<li className="tag-2 bg-accent">{data?.categorie?.name}</li>
					)}
				</ul>

				{/* <div className="price">$2,500</div> */}

				<div className="content">
					<span>
						<MdOutlineLocationOn />
						{data?.location}
					</span>
					<h3>{data?.name}</h3>

					<ul className="list">
						<li>
							<i className="bx bx-bed"></i> {data?.bedroom} Bedrooms
						</li>
						<li>
							<i className="bx bxs-bath"></i> {data?.bathroom} Baths
						</li>
						<li>
							<i className="bx bx-bath"></i> {data?.toilet} Toilets
						</li>
					</ul>

					<ul className="rating-list">
						<h3 className="font-grey-300 mb-0">
							{Global?.currency}
							{window.formatedPrice.format(data.price)}{' '}
							<span className="font-xss text-grey-500">
								/ {data.payment_type && data.payment_type.abbreviation}
							</span>{' '}
						</h3>
					</ul>
				</div>
			</div>

			<div className="details-description bg-white rounded">
				<h3>Description</h3>
				<div>{ReactHtmlParser(data?.description)}</div>
			</div>
			<div className="details-description bg-white rounded widget widget_info">
				<h3>Agent</h3>
				<div className="info-box-one d-flex mt-3">
					<img
						width={'100'}
						style={{ borderRadius: '50%' }}
						src={data?.agent_profile?.avatar_url}
						alt="image"
					/>
					<div className="m-2">
						<h3 className='text-grey-600'>{data?.agent_profile?.first_name}</h3>
						<span>
							<i className="bx bxs-home"></i> <a>{data?.agent?.name}</a>
						</span>
					</div>
				</div>
			</div>

			<div className="details-features bg-white rounded">
				<h3>Features</h3>

				<div className="row justify-content-start">
					<div className="col-lg-4 col-md-6">
						<ul className="features-list">
							{data?.amenities?.map((val, i) => {
								if (i < 4) {
									return (
										<li key={`cat-l-${i}`}>
											<i className="bx bx-check"></i> {val?.name}
										</li>
									)
								}
							})}
						</ul>
					</div>

					<div className="col-lg-4 col-md-6">
						<ul className="features-list">
							{data?.amenities?.map((val, i) => {
								if (i > 3 && i < 8) {
									return (
										<li key={`cat-r-${i}`}>
											<i className="bx bx-check"></i> {val?.name}
										</li>
									)
								}
							})}
						</ul>
					</div>
					<div className="col-lg-4 col-md-6">
						<ul className="features-list">
							{data?.amenities?.map((val, i) => {
								if (i > 7 && i < 12) {
									return (
										<li key={`cat-r-${i}`}>
											<i className="bx bx-check"></i> {val?.name}
										</li>
									)
								}
							})}
						</ul>
					</div>
				</div>
			</div>

			<div className="details-overview bg-white rounded">
				<div className="d-flex justify-content-between mb-2 align-items-center">
					<h3 className="mb-0">
						Interested Users ({data?.interested_parties?.length})
					</h3>
					<a href="#interest" className="fw-bold text-theme">
						Join List
					</a>
				</div>

				<ul className="overview-listx d-flex" style={{ overflowX: 'scroll' }}>
					{data?.interested_parties?.map((val, i) => {
						return <EachUserListCard standalone data={val} key={`user-${i}`} />
					})}
				</ul>
			</div>

			{/* <div className="details-video">
				<h3>Video</h3>

				<div className="video-image">
					<img
						src="assets/images/property-details/property-details-3.jpg"
						alt="image"
					/>

					<a
						href="https://www.youtube.com/watch?v=ODfy2YIKS1M"
						className="video-btn popup-youtube"
					>
						<i className="bx bx-play"></i>
					</a>
				</div>
			</div> */}

			{!standalone && (
				<>
					<Alert variant="success" id="interest">
						<Alert.Heading style={{ fontSize: '30px' }} className="fw-bold">You like this?</Alert.Heading>
						<p>There are two ways you can take action.</p>
						<hr />
						<p className="mb-0">
							<strong>1.</strong> Click on the <strong>I'm Interested</strong>{' '}
							button bellow, and we will add you to the list of those who are
							interested in this flat.
							<br />
							<strong>Why?</strong>. Because when someone else shows interest,
							we'll notify you
						</p>
						<p className="mb-0">
							<strong>2.</strong> Click on the <strong>Book Inspection</strong>{' '}
							button bellow, add someone from your contact list or from the list
							of people who are interested in this flat.
						</p>
					</Alert>
				</>
			)}
			<div className="details-overview bg-white rounded pt-1 pb-1">
				{user ? (
					!standalone && (
						<div className="row mb-2 mt-3 justify-content-between">
							<div className="col-md-6 col-sm-12">
								{data?.interested_parties?.filter(
									(x) => x?.id === user?.user?.id
								)?.length === 1 ? (
									<span className="w-100 alert alert-success border-accent border-4 text-white fw-600 text-uppercase font-xsss float-left rounded-3 d-inline-block mt-0 p-1 lh-34 text-accent ls-3 w200 text-center">
										<BsCheckCircleFill size={20} /> Added To List
									</span>
								) : (
									<button
										onClick={showInterest}
										disabled={listLoading || !data?.is_available}
										className="w-100 border-accent border-4 text-white fw-600 text-uppercase font-xssss float-left rounded-3 d-inline-block mt-0 p-1 lh-34 text-accent ls-3 w200"
									>
										{listLoading ? (
											<Dots />
										) : (
											<>
												I'M INTERESTED{' '}
												<span style={{ fontSize: '20px' }}>✋🏽</span>
											</>
										)}
									</button>
								)}
							</div>
							<Link
								to={`/inspections/booking/${data?.id}`}
								className="col-md-6 col-sm-12"
							>
								<button
									disabled={!data?.is_available}
									className="w-100 bg-accent border-0 text-white fw-600 text-uppercase font-xssss float-left rounded-3 d-inline-block mt-0 p-2 lh-34 text-center ls-3 w200"
								>
									{'BOOK INSPECTION'}
								</button>
							</Link>
						</div>
					)
				) : (
					<div className=" justify-content-between">
						<div className="alert alert-info">
							<h2 className="text-center fw-700 text-grey-700">
								Login To Book An Inspection
							</h2>
						</div>
					</div>
				)}
			</div>
		</div>
	)
	return (
		<div className="card d-block mt-4 border-0 shadow-xss bg-white ">
			{showImages && (
				<ImageViewer
					src={data?.image_urls}
					disableScroll={false}
					closeOnClickOutside={true}
					onClose={() => setShowImages(false)}
					backgroundStyle={{ height: '80vh', marginTop: '7vh' }}
				/>
			)}
			<div
				className="card-header d-flex justify-content-center text-center align-items-center"
				style={{
					backgroundImage: `url(${data.image_urls[0]})`,
					height: '200px',
					backgroundRepeat: 'no-repeat',
					backgroundSize: '100%',
					backgroundPosition: 'center',
				}}
			>
				<button
					className="btn bg-accent p-2 w-50 rounded shadow text-white"
					onClick={() => setShowImages(true)}
				>
					View All Images
				</button>
			</div>
			<div onClick={() => setShowImages(false)} className="card-body">
				<span className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-theme shadow d-inline-block text-white ">
					Featured
				</span>
				{!standalone && (
					<span className="font-xsssss live-tag mt-2 bottom-0 mb-4 bg-accent ml-3 ps-3 pe-3 p-2 rounded-3 text-white text-uppersace fw-700 ls-3">
						{data?.location_keyword?.name}
					</span>
				)}
				<span
					className={`font-xsssss live-tag mt-2 bottom-0 mb-4 ${
						data?.is_available ? 'bg-current' : 'bg-danger'
					} ml-3 ps-3 pe-3 p-2 rounded-3 text-white text-uppersace fw-700 ls-3`}
				>
					{data?.is_available ? 'Available' : 'Unavailable'}
				</span>
				<p className="review-link font-xsss fw-600 text-grey-500 lh-3 mb-0 mt-4">
					<i className="ti-location-pin mr-2"></i>
					{data?.location}
				</p>
				<h2 className="fw-700 font-lg mt-3 mb-2 text-grey-700">{data.name}</h2>
				<p className="font-xsss fw-500 text-grey-500 lh-30 pe-5 mt-3 me-5">
					{data.description}
				</p>
				<h2 className="fw-700 font-lg mt-3 mb-2 text-grey-700">
					{Global?.currency}
					{window.formatedPrice.format(data.price)}{' '}
					<span className="font-xss text-grey-500">
						/ {data.payment_type && data.payment_type.abbreviation}
					</span>{' '}
				</h2>
				<div className="clearfix"></div>
				<div className="star d-block w-100 text-left mt-2"></div>

				<div className="clearfix"></div>
				<h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-4">
					<i className="btn-round-sm bg-greylight text-grey-500 me-1">
						<FaBed size={iconSize} />
					</i>
					<b>{data.bedroom}</b>
				</h5>
				<h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-4">
					<i className="btn-round-sm bg-greylight text-grey-500 me-1">
						<FaBath size={iconSize} />
					</i>
					<b>{data.bathroom}</b>
				</h5>
				<h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-4">
					<i className="btn-round-sm bg-greylight text-grey-500 me-1">
						<FaToilet size={iconSize} />
					</i>
					<b>{data.toilet}</b>
				</h5>
				{!standalone && (
					<>
						<hr />
						<div>
							<h2 className="fw-700 text-grey-700">Amenities</h2>
							<div className="container-fluid pl-0">
								<div className="row">
									{data?.amenities?.map((val, i) => {
										return (
											<div className="col-md-3 col-5" key={`am-${i}`}>
												<h5 className="bg-grey badge mt-1 mb-3 d-inline-block font-xsss fw-600 text-grey-600 me-2">
													{/* <i className="btn-round-sm bg-greylight ti-ruler-pencil text-grey-500 me-1"></i>{' '} */}
													{val?.name}
												</h5>
											</div>
										)
									})}
								</div>
							</div>
						</div>
					</>
				)}
				{data?.interested_parties?.filter((x) => x?.id !== user?.user?.id)
					?.length > 0 && (
					<>
						<hr />
						<div>
							<h2 className="fw-700 text-grey-700">Interested Users</h2>
							<div className="container-fluid pl-0">
								<div className="mb-5">
									<div>
										<ScrollMenu
											// LeftArrow={() => <button>Left</button>}
											// RightArrow={() => <button>Right</button>}
											wrapperClassName="wrapper"
											// onWheel={onWheel}
										>
											{data?.interested_parties?.map((val, i) => {
												return (
													<EachUserListCard
														standalone
														data={val}
														key={`user-${i}`}
													/>
												)
											})}
										</ScrollMenu>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
				{data?.google_location?.photos?.length > 0 && (
					<>
						<hr />
						<div>
							<h2 className="fw-700 text-grey-700">Landmarks Images</h2>
							<div className="container-fluid pl-0">
								<div className="mb-5">
									<div>
										<ScrollMenu
											// LeftArrow={() => <button>Left</button>}
											// RightArrow={() => <button>Right</button>}
											wrapperClassName="wrapper"
											// onWheel={onWheel}
										>
											{data?.google_location?.photos?.map((val, i) => {
												return (
													<div
														className="card mr-3"
														key={`pic-${i}`}
														style={{
															backgroundImage: `url(https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${val?.photo_reference}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY})`,
															height: '300px',
															width: '200px',
															backgroundSize: 'cover',
															backgroundPosition: 'center',
														}}
													/>
												)
											})}
										</ScrollMenu>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
				{/* <div className="clearfix mb-5"></div> */}
				{!standalone && (
					<>
						<hr className="mb-4" />
						<Alert variant="success">
							<Alert.Heading className="fw-bold">You like this?</Alert.Heading>
							<p>There are two ways you can take action.</p>
							<hr />
							<p className="mb-0">
								<strong>1.</strong> Click on the <strong>I'm Interested</strong>{' '}
								button bellow, and we will add you to the list of those who are
								interested in this flat.
								<br />
								<strong>Why?</strong>. Because when someone else shows interest,
								we'll notify you
							</p>
							<p className="mb-0">
								<strong>2.</strong> Click on the{' '}
								<strong>Book Inspection</strong> button bellow, add someone from
								your contact list or from the list of people who are interested
								in this flat.
							</p>
						</Alert>
					</>
				)}
				{/* <a
									href="#share"
									className="btn-round-lg ms-3 d-inline-block rounded-3 bg-greylight"
									onClick={() => {
										if (navigator.share) {
											navigator
												.share({
													title: data.name,
													url: window.location.pathname,
													text: data.description,
												})
												.catch((err) => Promise.reject(err))
										}
									}}
								>
									<i className="feather-share-2 font-sm text-grey-700"></i>
								</a>
								<a
									href="#"
									className="btn-round-lg ms-2 d-inline-block rounded-3 bg-theme"
								>
									<i className="feather-send font-sm text-white"></i>{' '}
								</a> */}

				{user ? (
					!standalone && (
						<div className="row mb-2 mt-3 justify-content-between">
							<div className="col-md-6 col-sm-12">
								{data?.interested_parties?.filter(
									(x) => x?.id === user?.user?.id
								)?.length === 1 ? (
									<span className="w-100 alert alert-success border-accent border-4 text-white fw-600 text-uppercase font-xsss float-left rounded-3 d-inline-block mt-0 p-1 lh-34 text-accent ls-3 w200 text-center">
										<BsCheckCircleFill size={20} /> Added To List
									</span>
								) : (
									<button
										onClick={showInterest}
										disabled={listLoading || !data?.is_available}
										className="w-100 mb-2 border-accent border-4 text-white fw-600 text-uppercase font-xssss float-left rounded-3 d-inline-block mt-0 p-1 lh-34 text-accent ls-3 w200"
									>
										{listLoading ? (
											<Dots />
										) : (
											<>
												I'M INTERESTED{' '}
												<span style={{ fontSize: '20px' }}>✋🏽</span>
											</>
										)}
									</button>
								)}
							</div>
							<Link
								to={`/inspections/booking/${data?.id}`}
								className="col-md-6 col-sm-12"
							>
								<button
									disabled={!data?.is_available}
									className="w-100 mb-2 bg-accent border-0 text-white fw-600 text-uppercase font-xssss float-left rounded-3 d-inline-block mt-0 p-2 lh-34 text-center ls-3 w200"
								>
									{'BOOK INSPECTION'}
								</button>
							</Link>
						</div>
					)
				) : (
					<div className=" justify-content-between">
						<div className="alert alert-info">
							<h2 className="text-center fw-700 text-grey-700">
								Login To Book An Inspection
							</h2>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
