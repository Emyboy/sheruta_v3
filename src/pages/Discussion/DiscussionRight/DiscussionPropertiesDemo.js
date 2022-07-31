import React from 'react'
import { Link } from 'react-router-dom'

export default function DiscussionPropertiesDemo() {
	return (
		<div className='bg-white pb-3'>
			<div className="d-flex justify-content-between align-items-center p-2 mb-1">
				<h4 className="fw-500 text-grey-600 mb-0">Properties in Lekki</h4>
				<Link to={`/flats`}>
					<small>View More </small>
				</Link>
			</div>
			<div className="container scroll-bar pl-1">
				<div className="d-flex pb-3">
					<div className="col-6 pl-0">
						<div
							className="rounded-xxl shadow-sm"
							style={{
								backgroundImage: 'url(https://picsum.photos/200/300/)',
								height: '190px',
							}}
						/>
					</div>
					<div className="col-6 pl-0">
						<div
							className="rounded-xxl shadow-sm"
							style={{
								backgroundImage: 'url(https://picsum.photos/200/300/)',
								height: '190px',
							}}
						/>
					</div>
					<div className="col-6 pl-0">
						<div
							className="rounded-xxl shadow-sm"
							style={{
								backgroundImage: 'url(https://picsum.photos/200/300/)',
								height: '190px',
							}}
						/>
					</div>
					<div className="col-6 pl-0">
						<div
							className="rounded-xxl shadow-sm"
							style={{
								backgroundImage: 'url(https://picsum.photos/200/300/)',
								height: '190px',
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
