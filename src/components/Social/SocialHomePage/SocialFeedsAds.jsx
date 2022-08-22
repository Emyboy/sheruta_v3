import React from 'react'
import PostRequestAds from '../../Ads/RequestAds/PostRequestAds'
import match from '../../../assets/img/match.jpeg'
import { useSelector } from 'react-redux'
import RecentGroupMsgAds from '../../Ads/GroupAds/RecentGroupMsgAds'
import PropertyAds from '../../Ads/PropertyAds/PropertyAds'
import Poll from '../../Poll/Poll'

export default function SocialFeedsAds({ index }) {
	const { personal_info } = useSelector((state) => state.view)
	return (
		<>
			{index === 0 && <Poll />}
			{index === 1 && <PropertyAds />}
			{index === 4 && <RecentGroupMsgAds />}
			{index === 6 && <PostRequestAds />}
			
			{index === 8 && (
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
