import React from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { setGroupState } from '../../../redux/strapi_actions/group.action'

export default function DiscussionReplyPreview() {
	const dispatch = useDispatch()
	const { reply } = useSelector((state) => state?.group)

	return (
		<div className="card card-success bg-theme-light p-2 rounded-xxl mb-2 pt-3 animate__animated animate__flipInX w-100">
			<button
				className="btn btn-sm rounded-xl bg-accent shadow-sm border"
				style={{ position: 'absolute', right: "-10px", top: "-15px" }}
				onClick={() => dispatch(setGroupState({ reply: null }))}
			>
				<MdClose size={25} color="white" />
			</button>
			<p>
				<i>
					{reply?.message_text.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 100)}...
				</i>
			</p>
		</div>
	)
}
