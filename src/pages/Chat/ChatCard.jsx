import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import { IoMdCheckmark } from 'react-icons/io'
import renderHTML from 'react-render-html'
import { useEffect } from 'react'
import MessageService from '../../services/MessageService'

export default function ChatCard({ outGoing, data }) {
	const { user } = useSelector((state) => state.auth)
	const _user = user?.user

	useEffect(() => {
		if (data && !data?.seen && data?.from?.id !== _user?.id) {
			MessageService.updateMessageSeen(data?.id)
		}
	}, [])

	return (
		<div className={`pl-0 ${outGoing ? 'mr-3 ml-5': 'mr-4'}`} style={{ minWidth: '200px'}}>
			<div
				className={`card shadow-xs ${
					outGoing ? ' bg-theme-light border-theme' : 'border-success'
				} rounded-xxl`}
				style={{ width: '100%' }}
			>
				<div className="card-body">
					<div className="mb-2 fw-500 text-black">
						{renderHTML(data?.message_text?.replace(/\n/g, '<br />'))}
					</div>
					<div className="d-flex justify-content-between">
						<i className="text-grey-500">
							{moment(data?.created_at).fromNow()}
						</i>
						{outGoing && (
							<>
								{data?.seen ? (
									<IoCheckmarkDoneSharp size={20} className="text-primary" />
								) : (
									<IoMdCheckmark size={20} className="text-grey-500" />
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
