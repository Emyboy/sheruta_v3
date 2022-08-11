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
import { Avatar, notification } from 'antd'
import ImageViewer from 'react-simple-image-viewer'
import { MdImage, MdOutlineLocationOn } from 'react-icons/md'
import ReactHtmlParser from 'react-html-parser'
import PropertyAmenities from './PropertyAmenities'
import ErrorBoundary from '../../components/ErrorBoundries/ErrorBoundary'

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
			{!data?.is_available && (
				<Alert variant="danger" id="interest">
					<Alert.Heading style={{ fontSize: '25px' }} className="fw-bold">
						This flat is currently unavailable at the moment.
					</Alert.Heading>
				</Alert>
			)}
			<ErrorBoundary>
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
							backgroundStyle={{
								height: '70vh',
								marginTop: !Global?.isMobile ? '15vh' : '9vh',
							}}
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
						{data?.is_available && (
							<button
								className="btn btn-lg bg-white shadow fw-bold"
								onClick={() => setShowImages(true)}
							>
								<MdImage size={30} /> View All Images
							</button>
						)}
					</div>
				</div>
			</ErrorBoundary>

			<div className="details-content bg-white rounded">
				<ul className="tag-list">
					{data?.service && <li className="tag">{data?.service?.name}</li>}
					{data?.categorie && (
						<li className="tag-2 bg-accent">{data?.categorie?.name}</li>
					)}
					{process.env.NODE_ENV !== 'production' && (
						<span className="ml-4 h1">#{data?.id}</span>
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
							{window.formattedPrice.format(data.price)}{' '}
							<span className="font-xss text-grey-500 mb-0">
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
			{!standalone && (
				<div className="details-description bg-white rounded widget widget_info">
					<h3>Agent</h3>
					<div className="info-box-one d-flex mt-3">
						<Avatar
							size={80}
							style={{ borderRadius: '50%' }}
							src={data?.agent_profile?.avatar_url}
							alt="agent"
						/>
						<div className="m-2">
							<h3 className="text-grey-600">
								{data?.agent_profile?.first_name}
							</h3>
							<span>
								<i className="bx bxs-home"></i> <a>{data?.agent?.name}</a>
							</span>
						</div>
					</div>
				</div>
			)}

			<PropertyAmenities data={data} />

			{data?.interested_parties?.length > 0 && (
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
							return (
								<EachUserListCard standalone data={val} key={`user-${i}`}  />
							)
						})}
					</ul>
				</div>
			)}

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
						<Alert.Heading style={{ fontSize: '30px' }} className="fw-bold">
							You like this?
						</Alert.Heading>
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
			<div className="details-overview bg-white rounded pt-1 pb-0">
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
						<div className="alert alert-info mb-1">
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
