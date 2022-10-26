import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import DiscussionLeftHeader from '../Discussion/DiscussionLeft/DiscussionLeftHeader'
import EachConversation from '../Messages/EachConversation'

export default function ChatList() {
	const { conversations } = useSelector((state) => state.view)
	const { user } = useSelector((state) => state.auth)
	const auth_user = user?.user
	const params = useParams()

	const { conversation_id } = params

	return (
		<div>
			<DiscussionLeftHeader heading={'Messages'} widthOutSearch />
			<div className="scroll-bar" style={{ maxHeight: '85vh' }}>
				{conversations?.map((val) => {
					// console.log('EACH CONV --', val)
					const _user =
						auth_user?.id === val?.guest?.id ? val?.owner : val?.guest
					return (
						<EachConversation
							isActive={val?.uuid == conversation_id}
							conv={val}
							standalone
						/>
					)
				})}

				<br />
			</div>
		</div>
	)
}
