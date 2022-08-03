import React, { useState } from 'react'
import EachGroupConversation from './EachGroupConversation'
import DiscussionLeftHeader from './DiscussionLeftHeader'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Redirect, useParams } from 'react-router'
import axios from 'axios'

export default function DiscussionLeft() {
	const { location_keywords } = useSelector((state) => state.view)
	const { room_id } = useParams()
	const { user } = useSelector((state) => state.auth)

	const [list] = useState(location_keywords.filter((x) => x.has_group))

	

	if (!user) {
		return <Redirect to={'/login'} />
	}

	return (
		<div className="bg-grey-300">
			<DiscussionLeftHeader />
			<div className="list-group scroll-bar" style={{ maxHeight: '81vh' }}>
				{list?.map((val) => {
					return (
						<EachGroupConversation
							active={room_id == val.id}
							key={`location-group-${val?.id}`}
							name={val?.name}
							image_url={val?.background_img}
							clickURL={`/discussion/room/${val?.id}`}
							last_seen={
								moment(val.created_at).fromNow().includes('seconds')
									? 'just now'
									: moment(val.created_at).fromNow()
							}
							id={val.id}
						/>
					)
				})}
			</div>
		</div>
	)
}
