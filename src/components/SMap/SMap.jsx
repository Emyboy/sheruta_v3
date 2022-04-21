import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import Global from '../../Global'

const Marker = (props) => {
	console.log("MARKER PROPS ---", props)
	const { data } = props;
	return (
		<div className="card badge shadow p-1 m-3">
			<h6 className="mb-0">
				{Global?.currency}
				{window.formatedPrice.format(data.price)}
			</h6>
		</div>
	)
}

export default function SMap({ properties }) {
	const defaultProps = {
		center: {
			lat: 8.6753,
			lng: 9.082,
		},
		zoom: 10,
	}

	return (
		<GoogleMapReact
			bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_PLACES_API_KEY }}
			defaultCenter={{
				lat: properties[0]?.google_location?.geometry?.location?.lat,
				lng: properties[0]?.google_location?.geometry?.location?.lng,
			}}
			defaultZoom={defaultProps.zoom}
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
