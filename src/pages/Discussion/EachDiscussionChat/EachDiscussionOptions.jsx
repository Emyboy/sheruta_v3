import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { MdEdit, MdOutlineReply, MdDelete } from 'react-icons/md'

const iconSize = 24

export default function EachDiscussionOptions() {
	return (
		<Dropdown>
			<Dropdown.Toggle
				variant="success"
				style={{ background: 'none' }}
				id={String(Math.random())}
				className="border-0 btn-sm text-grey-700"
				// role={'figure'}
			>
				{/* <HiDotsVertical /> */}
			</Dropdown.Toggle>

			<Dropdown.Menu className="rounded-xxxl shadow p-0">
				<Dropdown.Item className="text-grey-700 fw-500 pb-3 pt-3">
					<MdEdit size={iconSize} /> Edit
				</Dropdown.Item>
				<hr className='m-0' />
				<Dropdown.Item className="text-grey-700 fw-500 pb-3 pt-3">
					<MdOutlineReply size={iconSize} /> Reply
				</Dropdown.Item>
				<hr className='m-0' />
				<Dropdown.Item className="text-grey-700 fw-500 pb-3 pt-3">
					<MdDelete size={iconSize} /> Delete
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}
