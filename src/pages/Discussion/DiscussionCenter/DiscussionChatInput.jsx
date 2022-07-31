import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { IoSend } from 'react-icons/io5'
import MessageService from '../../../services/MessageService'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

export default function DiscussionChatInput({ onSend }) {
    const { room_id } = useParams();
    const { user } = useSelector(state => state.auth);
	const [newMessage, setNewMessage] = useState('')
	const handleSubmit = async (e) => {
        e.preventDefault()
		try {
			const res = await MessageService.sendMessage({
                message_text: newMessage,
                location_keyword: room_id,
                from: user?.user?.id
            })
			onSend({
				...res.data,
				new: true,
			})
            setNewMessage('')
		} catch (error) {
			return Promise.reject(error)
		}
	}

	return (
		<form
			className="bg-grey p-2 rounded-xl d-flex w-100"
			onSubmit={handleSubmit}
		>
			<input
				className="form-control border-0 bg-grey rounded-xl font-xs"
				placeholder="Start typing..."
				onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
			/>
			<button
				className="btn bg-accent text-white align-self-start"
				style={{ borderRadius: '50px', height: '50px', width: '50px' }}
                disabled={newMessage.length === 0}
			>
				<IoSend size={24} />
			</button>
		</form>
	)
}
