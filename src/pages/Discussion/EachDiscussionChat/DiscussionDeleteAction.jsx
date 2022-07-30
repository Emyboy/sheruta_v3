import React from 'react'
import { Modal } from 'antd'

export default function DiscussionDeleteAction({ show, onCancel }) {
	return (
		<Modal visible footer={null} onCancel={onCancel}>
			<div className="pt-5 pb-4 text-center">
				<h3 className='fw-500'>Are you sure you want to<br /> delete?</h3>
				<div className="btn-group mt-3" role="group" aria-label="Basic example">
					<button type="button" className="btn btn-success btn-lg">
						Yes
					</button>
					<button type="button" className="btn btn-danger btn-lg">
						No
					</button>
				</div>
			</div>
		</Modal>
	)
}
