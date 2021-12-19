import React from 'react'
import { Link } from 'react-router-dom'
import Global from '../../Global'
import { FaBath, FaBed, FaToilet } from 'react-icons/fa'

export default function EachProperty({ data }) {
    console.log('DATA --', data)
    const iconSize = 19;
	return (
		<article className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1">
			{data.categorie && (
				<span className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-xl ls-2 bg-theme shadow d-inline-block text-white position-absolute mt-3 ms-3 z-index-1">
					{data.categorie.name}
				</span>
			)}
			<div className="card-image w-100 mb-3">
				<Link
					to={`/property/${data.uid}/${data.id}`}
					className="position-relative d-block"
				>
					<img
						src={data.image_urls[0]}
						alt={data.description}
						className="w-100"
					/>
				</Link>
			</div>
			<div className="card-body pt-0">
				<i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i>
				<h4 className="fw-700 font-xs mt-0 lh-28 mb-0">
					<Link
						to={`/property/${data.uid}/${data.id}`}
						className="text-dark text-grey-900"
					>
						{data.name}
					</Link>
				</h4>
				<h6 className="font-xsss text-grey-500 fw-600 mt-0 mb-2">
					<i className="ti ti-location-pin"></i> {data.location}
				</h6>
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
					<span className="font-xsssss text-grey-500">/ {data.payment_type && data.payment_type.abbreviation}</span>{' '}
				</span>
				<a href="#" className="position-absolute bottom-15 mb-2 right-15">
					<i className="btn-round-sm bg-primary-gradiant text-white font-sm feather-chevron-right"></i>
				</a>
			</div>
		</article>
	)
}
