import React from 'react'
import { Modal, Input } from 'antd'
import MessageService from '../../../services/MessageService'
import { useState } from 'react'

const { TextArea } = Input

export default function EachDiscussionEdit({ onCancel, message, done }) {
	const [messageText, setMessageText] = useState(message?.message_text)
	const [loading, setLoading] = useState(false)

	const saveChanges = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await MessageService.updateMessage(
				{
					message_text: messageText,
				},
				message?.id
			)
			if (res && done) {
				done(res.data)
				setLoading(false)
			}
		} catch (error) {
			setLoading(false)
			return Promise.reject(error)
		}
	}

	return (
		<Modal visible onCancel={onCancel} footer={null}>
			<h4 className="fw-600">Edit Message</h4>
			<from className="mt-4" onSubmit={saveChanges}>
				<TextArea
					className="form-control"
					rows={'4'}
					defaultValue={messageText}
					style={{ height: '88px' }}
					onChange={(e) => setMessageText(e.target.value)}
				/>
				<button
					className="btn bg-theme text-white mt-3"
					onClick={saveChanges}
					disabled={loading}
				>
					Save
				</button>
			</from>
		</Modal>
	)
}
