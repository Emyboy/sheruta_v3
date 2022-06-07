import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import Global from '../../Global'
import { Popover } from 'antd'
import EachProperty, {
	formatPropertyURL,
} from '../../pages/Properties/EachProperty'
import { Link } from 'react-router-dom'
import VerifiedBadge from '../VerifiedBadge/VerifiedBadge'
import { FaBath, FaBed, FaToilet } from 'react-icons/fa'

const iconSize = 19

export const HoverDetails = ({ data }) => {
	return (
		<div className="card border-0" style={{ width: '400px' }}>
			<div
				className="card"
				style={{
					backgroundImage: `url(${data?.image_urls[0]})`,
					height: '200px',
					width: '400px',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
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
		</div>
	)
}

const Marker = (props) => {
	const { data } = props
	return (
		<Popover
			placement="top"
			content={<HoverDetails data={data} />}
			style={{ width: '300px', minWidth: '300px', background: 'none' }}
		>
			<div
				className="card badge shadow p-2 m-3 rounded-xxxl"
				style={{ zIndex: '60px' }}
			>
				<h3 className="m-0 fw-bold">
					{Global?.currency}
					{window.formatedPrice.format(data.price)}
				</h3>
			</div>
		</Popover>
	)
}

export default function SMap({ properties }) {
	const defaultProps = {
		center: {
			lat: 8.6753,
			lng: 9.082,
		},
		zoom: 12,
	}

	return (
		<GoogleMapReact
			bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_PLACES_API_KEY }}
			defaultCenter={{
				lat: properties[0]?.google_location?.geometry?.location?.lat || 8.6753,
				lng: properties[0]?.google_location?.geometry?.location?.lng || 9.082,
			}}
			defaultZoom={properties?.length == 0 ? 6 : defaultProps.zoom}
		>
			{properties?.map((val, i) => {
				return (
					<Marker
						key={`marker-${i}`}
						data={val}
						lat={val?.google_location?.geometry?.location?.lat}
						lng={val?.google_location?.geometry?.location?.lng}
					/>
				)
			})}
		</GoogleMapReact>
	)
}
