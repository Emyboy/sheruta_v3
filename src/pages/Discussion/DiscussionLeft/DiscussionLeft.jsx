import React from 'react'
import EachGroupConversation from './EachGroupConversation'
import DiscussionLeftHeader from './DiscussionLeftHeader'


export default function DiscussionLeft() {
	return (
		<div className="pl-2 bg-grey-300">
			<DiscussionLeftHeader />
			<div className="list-group scroll-bar" style={{ maxHeight: '81vh' }}>
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation active />
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation />
				<EachGroupConversation />
			</div>
		</div>
	)
}
