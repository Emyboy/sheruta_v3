import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Global from '../../Global'
import DiscussionCenter from './DiscussionCenter/DiscoussionCenter'
import DiscussionLeft from './DiscussionLeft/DiscussionLeft'
import DiscussionRight from './DiscussionRight/DiscussionRight'
import { useParams } from 'react-router-dom'
import { HiChatAlt2 } from 'react-icons/hi'
import { notifyEmy } from '../../services/Sheruta'
import { getLocationKeyWordsByState } from '../../redux/strapi_actions/view.action'

export default function Discussion() {
	const { location_keywords, personal_info } = useSelector((state) => state.view)
	const { room_id } = useParams()
	const dispatch = useDispatch()

	useEffect(() => {
		notifyEmy({
			heading: 'viewed the discussion page',
		});
		if(location_keywords?.length === 0){
			dispatch(getLocationKeyWordsByState(personal_info?.state?.id))
		}
	},[])

	return (
		<div
			style={{
				position: 'absolute',
				top: '0',
				bottom: '0',
				left: '0',
				right: '0',
			}}
		>
			{location_keywords?.length > 0 ? (
				<div className="container-fluid">
					<div className="row">
						{!Global.isMobile && (
							<div className="col-xl-3 col-md-5 p-0">
								<DiscussionLeft />
							</div>
						)}
						<div className="col-xl-6 col-md-7 p-0 border-left">
							{room_id  ? (
								<DiscussionCenter />
							) : Global.isMobile && !room_id ? (
								<DiscussionLeft />
							) : (
								<div className="h-100 d-flex flex-column justify-content-center align-items-center">
									<HiChatAlt2 size={140} className="text-grey-300" />
									<h3 className="text-grey-300">No Chat Selected</h3>
								</div>
							)}
						</div>
						<div className="col-lg-3 p-0">
							<DiscussionRight />
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}
