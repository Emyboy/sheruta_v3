import React from 'react'
import { Modal } from 'antd'
import MessageService from '../../../services/MessageService'
import { useState } from 'react'

export default function DiscussionDeleteAction({ done, onCancel, message }) {
	const [loading, setLoading] = useState(false)
	const handleDelete = async () => {
		try {
			setLoading(true)
			const res = await MessageService.deleteMessage(message?.id)
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
		<Modal visible footer={null} onCancel={onCancel}>
			<div className="pt-5 pb-4 text-center">
				<h3 className="fw-500">
					Are you sure you want to
					<br /> delete?
				</h3>
				<div className="btn-group mt-3" role="group" aria-label="Basic example">
					<button
						disabled={loading}
						type="button"
						className="btn btn-success btn-lg"
						onClick={handleDelete}
					>
						Yes
					</button>
					<button
						disabled={loading}
						type="button"
						className="btn btn-danger btn-lg"
						onClick={onCancel}
					>
						No
					</button>
				</div>
			</div>
		</Modal>
	)
}
