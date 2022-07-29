import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiDotsVertical } from 'react-icons/hi'

export default function DiscussionLeftHeader() {
  return (
		<div className="p-3">
			<header className="d-flex justify-content-between align-items-center mb-3">
				<h1>Message</h1>
				<HiDotsVertical />
			</header>
			<div className="d-flex border align-items-center bg-white rounded-xxl mb-3">
				<div className="p-2">
					<BiSearch size={22} className="text-grey-500" />
				</div>
				<input
					type="search"
					className="form-control border-0 rounded-xxl"
					placeholder="Search for a group"
				/>
			</div>
		</div>
	)
}
