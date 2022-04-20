import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'

const Marker = ({ data }) => {
	console.log('MARKER --', data)
	return (
		<div className="card badge shadow p-4">
			<h2>{data?.price}</h2>
		</div>
	)
}

export default function SMap({ properties }) {
	const defaultProps = {
		center: {
			lat: 8.6753,
			lng: 9.082,
		},
		zoom: 5,
	}

	const getPlaceInfo = async () => {
		try {
			const _url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=EhlMYWtlIENoYWQgQ3Jlc2NlbnQsIEFidWphIi4qLAoUChIJi2R6PkAKThARGWMAddriFV8SFAoSCdkv1kxfdE4QESuhDqK0F71T&key=AIzaSyDPMzBMle72eFfooxUVD2wmLVFhzynQeeQ`
			console.log(_url)
			const geo = await axios(_url)
			console.log('the place ---', geo.data)
		} catch (error) {
			console.log('THE PLACE ERROR ---', error)
			return Promise.reject(error)
		}
	}

	useEffect(() => {
		getPlaceInfo()
	}, [getPlaceInfo])
	return (
		<GoogleMapReact
			bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_PLACES_API_KEY }}
			defaultCenter={defaultProps.center}
			defaultZoom={defaultProps.zoom}
		>
			{properties?.map((val, i) => {
				return (
					<Marker
						data={val}
						lat={defaultProps.center.lat}
						lng={defaultProps.center.lng}
						text="My Marker"
					/>
				)
			})}
		</GoogleMapReact>
	)
}
