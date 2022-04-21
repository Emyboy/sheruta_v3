import React from 'react'
import { Link } from 'react-router-dom'
import Global from '../../Global'
import { FaBath, FaBed, FaToilet } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import VerifiedBadge from '../../components/VerifiedBadge/VerifiedBadge'

export const formatPropertyURL = (data) => {
	return `/flat/${`${data?.service?.name}/${
		data.categorie?.name
	}-in-${data?.location?.replace(/[^\w\s]/gi, '').replace(/\s/g, '-')}`
		.toLocaleLowerCase()
		.replace(/\s/g, '-')}/${data.id}`
}

export default function EachProperty({ data }) {
	const iconSize = 19
	return (
		<article className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1">
			{data.categorie && (
				<span className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-xl ls-2 bg-theme shadow d-inline-block text-white position-absolute mt-3 ms-3 z-index-1">
					{data.categorie.name}
				</span>
			)}
			<div className="card-image w-100 mb-3">
				<Link
					to={{
						pathname: formatPropertyURL(data),
						state: data,
					}}
					className="position-relative d-block"
				>
					{/* <LazyLoadImage
						src={data.image_urls[0]}
						alt={data.name}
						className="w-100"
					/> */}
					<div
						className="card"
						style={{
							backgroundImage: `url(${data?.image_urls[0]})`,
							height: '300px',
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
							backgroundPosition: 'center'
						}}
					/>
				</Link>
			</div>
			<div className="card-body pt-0">
				<i className="font-md text-grey-500 position-absolute right-0 me-3">
					<VerifiedBadge without_text verified={data?.agent?.is_verified} />
				</i>
				<h4 className="fw-700 font-xs mt-0 lh-28 mb-1">
					<Link
						to={{
							pathname: formatPropertyURL(data),
							state: data,
						}}
						className="text-dark text-grey-900"
					>
						{data.name}
					</Link>
				</h4>
				<h6 className="font-xsss text-grey-500 fw-600 mt-0 mb-2">
					<i className="ti ti-location-pin"></i> {data.location}
				</h6>
				<div className="card w-100 border-0 mb-3 mt-3">
					<div className="dd-block pt-0">
						<ul className="memberlist mt-1 mb-2 ms-0 d-block">
							{data?.interested_parties?.map((val, i) => {
								if (i < 8) {
									return (
										<li className="w20" key={`party-${i}`}>
											<a href="#">
												<img
													src={val?.avatar_url}
													alt="user"
													className="w35 d-inline-block"
													style={{ opacity: '1', borderRadius: '20px' }}
												/>
											</a>
										</li>
									)
								}
							})}

							{data?.interested_parties?.length > 7 && (
								<li className="last-member mr-2">
									<a
										href="#"
										className="bg-greylight fw-600 text-grey-500 font-xssss w35 ls-3 text-center"
										style={{ height: '35px', lineHeight: '35px' }}
									>
										+{data?.interested_parties?.length - 8}
									</a>
								</li>
							)}
							<li className="ps-3 w-auto ms-1 ml-2">
								<a href="#" className="fw-600 text-grey-500 font-xssss">
									{data?.interested_parties?.length} Interested Users
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="star d-block w-100 text-left mt-0"></div>
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
				<div className="clearfix"></div>
				<span className="font-lg fw-700 mt-0 pe-3 ls-2 lh-32 d-inline-block text-success float-left">
					<span className="font-xs">{Global.currency}</span>{' '}
					{window.formatedPrice.format(data.price)}
					<span className="font-xssss text-grey-500">
						/ {data?.payment_type && data?.payment_type?.abbreviation}
					</span>{' '}
				</span>
				<span
					className={`badge ${
						data?.is_available ? 'bg-current' : 'bg-danger'
					} position-absolute bottom-15 mb-2 right-15`}
				>
					{data?.is_available ? 'Available' : 'Unavailable'}
				</span>
			</div>
		</article>
	)
}
