import React from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { setGroupState } from '../../../redux/strapi_actions/group.action'

export default function DiscussionReplyPreview() {
	const dispatch = useDispatch()
	const { reply } = useSelector((state) => state?.group)

	return (
		<div className="card card-success bg-theme-light p-2 rounded-xxl mb-2 pt-4 animate__animated animate__flipInX w-100">
			<button
				className="btn btn-sm rounded-xxl bg-theme-light shadow-sm"
				style={{ position: 'absolute', right: 0, top: 10 }}
				onClick={() => dispatch(setGroupState({ reply: null }))}
			>
				<MdClose size={30} />
			</button>
			<p>{reply?.message_text}</p>
		</div>
	)
}
