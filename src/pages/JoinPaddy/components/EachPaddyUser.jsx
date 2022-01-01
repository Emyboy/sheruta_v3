import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ProfileAbout from '../../../components/ProfileComponents/ProfileAbout'
import ProfileJumb from '../../../components/ProfileComponents/ProfileJumb'
import VerifiedBadge from '../../../components/VerifiedBadge/VerifiedBadge'

export default function EachPaddyUser({ user, onSelect, selected, unSelect }) {
	const [showProfile, setShowProfile] = useState(false);

	return (
		<div
			className={`card-body bg-transparent-card d-flex p-3 bg-greylight ms-3 me-3 rounded-3 mb-1 align-items-center ${
				selected && 'border border-success shadow'
			}`}
		>
			<Modal show={showProfile} onHide={() => setShowProfile(false)} size="lg">
				<Modal.Header>
					<button
						className="btn btn-sm btn-danger"
						onClick={() => setShowProfile(false)}
					>
						Close
					</button>
				</Modal.Header>
				<Modal.Body className="p-0">
					<ProfileJumb user={user} />
					<ProfileAbout user={user} />
				</Modal.Body>
			</Modal>
			<figure className="avatar me-2 mb-0">
				<img
					src={user.avatar_url}
					alt="image"
					className="shadow-sm rounded-circle w45"
				/>
			</figure>
			<h4
				className="fw-700 text-grey-900 font-xssss mt-2 link"
				onClick={() => setShowProfile(true)}
			>
				<div className="d-flex">
					{user.first_name}
					<VerifiedBadge user={user} size={10} className={'ml-1'} />
				</div>
				{/* <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-700">
											@{user.username}
										</span> */}
				<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-700">
					Budget: ₦{window.formatedPrice.format(user.budget)}
				</span>
			</h4>
			<a
				onClick={() => {
					if(selected){
						unSelect(user);
					}else {
						onSelect(user)
					}
				}}
				href="#add"
				className={`btn-round-sm ${
					selected
						? 'bg-danger text-white ti-close'
						: 'bg-white text-grey-900 feather-plus'
				}   font-xss ms-auto mt-2`}
			></a>
		</div>
	)
}
