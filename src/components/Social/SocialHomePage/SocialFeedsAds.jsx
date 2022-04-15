import React from 'react'
import PostRequestAds from '../../Ads/RequestAds/PostRequestAds'
import match from '../../../assets/img/match.jpeg'
import sub from '../../../assets/img/sub.jpeg'
import { Link } from 'react-router-dom'
import LocationKeywordAds from '../../Ads/RequestAds/LocationKeywordAds'
import { useSelector } from 'react-redux'

export default function SocialFeedsAds({ index }) {
	const { personal_info } = useSelector(state => state.view)
	return (
		<>
			{index === 2 && <PostRequestAds />}
			{index === 4 && personal_info && personal_info?.looking_for && <LocationKeywordAds />}
			{index === 6 && (
				<img src={match} className="rounded-xxl pl-0 pr-0 mb-3 col-12" />
			)}
			{/* {index === 8 && (
				<Link to="/pricing">
					<img src={sub} className="rounded-xxl pl-0 pr-0 mb-3 col-12" />
				</Link>
			)} */}
		</>
	)
}
