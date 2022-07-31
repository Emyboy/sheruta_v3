import React from 'react'
import { useSelector } from 'react-redux'
import Global from '../../Global'
import DiscussionCenter from './DiscussionCenter/DiscoussionCenter'
import DiscussionLeft from './DiscussionLeft/DiscussionLeft'
import DiscussionRight from './DiscussionRight/DiscussionRight'
import { useParams } from 'react-router-dom'
import { HiChatAlt2 } from 'react-icons/hi'

export default function Discussion() {
	const { location_keywords } = useSelector((state) => state.view)
	const { room_id } = useParams()

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
							<div className="col-lg-3 p-0">
								<DiscussionLeft />
							</div>
						)}
						<div className="col-lg-6 p-0">
							{room_id ? (
								<DiscussionCenter />
							) : (
								<div className="h-100 d-flex flex-column justify-content-center align-items-center">
									<HiChatAlt2 size={140} className="text-grey-300" />
									<h3 className="text-grey-300">No Chat Selected</h3>
								</div>
							)}
						</div>
						{!Global.isMobile && (
							<div className="col-lg-3 p-0">
								<DiscussionRight />
							</div>
						)}
					</div>
				</div>
			) : null}
		</div>
	)
}
