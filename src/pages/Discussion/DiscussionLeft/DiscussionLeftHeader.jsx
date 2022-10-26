import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiArrowLeft } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function DiscussionLeftHeader({ heading, widthOutSearch }) {
	return (
		<div className="p-3 border-right bg-white">
			<header className="d-flex justify-content-between align-items-center mb-3">
				<h1 className="m-0">{heading}</h1>
				<Link to="/feeds">
					<h5 className="fw-500 text-theme">
						<HiArrowLeft /> Back Home
					</h5>
				</Link>
			</header>
			{widthOutSearch ? null : (
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
			)}
		</div>
	)
}
