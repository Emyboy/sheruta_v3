import React from 'react'
import { Modal } from 'antd'

export default function DiscussionDeleteAction({ show }) {
	return (
		<Modal visible>
			<div className="card">
				<h4>Are you sure you want to delete?</h4>
				<div className="btn-group" role="group" aria-label="Basic example">
					<button type="button" className="btn btn-secondary">
						Middle
					</button>
					<button type="button" className="btn btn-secondary">
						Right
					</button>
				</div>
			</div>
		</Modal>
	)
}
