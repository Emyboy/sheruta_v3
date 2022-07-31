import React from 'react'
import { Link } from 'react-router-dom'
import EachDiscussionGuest from './EachDiscussionGuests'

export default function DiscussionRightUsers() {
  return (
		<div className='bg-white border-top' >
			<div className="d-flex justify-content-between align-items-center p-2 mb-1">
				<h4 className="fw-500 text-grey-600 mb-0">Room Guests</h4>
				<Link to={`/flats`}>
					<small></small>
				</Link>
			</div>
            <div>
                <EachDiscussionGuest />
                <EachDiscussionGuest />
                <EachDiscussionGuest />
                <EachDiscussionGuest />
            </div>
		</div>
	)
}
