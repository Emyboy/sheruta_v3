import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EachPaddyUser from '../components/EachPaddyUser'

export default function ContactSelect({
	selectedContacts,
	onSelect,
	heading,
	subHeading,
	unSelect,
	selected,
}) {
	const { accepted_suggestions } = useSelector((state) => state.alice)

	useEffect(() => {
		if (selectedContacts.length > 0) {
			selected(true)
		} else {
			selected(false)
		}
	}, [selectedContacts])

	return (
		<div>
			<div className="text-center mb-4">
				<h1 className="fw-700">{heading}</h1>
				<h6>{subHeading}</h6>
			</div>
			<div className="row justify-content-center">
				{accepted_suggestions.length === 0 && (
					<div className="col-md-6 col-sm-12 text-center">
						<div className="badge badge-dark w-100 text-white">
							<h3 className="text-white mb-0">You have no contacts</h3>
						</div>
						<Link to='/match'>
							<button className="btn btn-success mt-4 text-black fw-700">
								View Suggestions
							</button>
						</Link>
					</div>
				)}
				{accepted_suggestions
					.filter((x) => !x.users_permissions_user.deactivated)
					.map((val) => {
						let user = val.users_permissions_user
						return (
							<div className="col-sm-12 col-md-6">
								<EachPaddyUser
									user={user}
									selected={selectedContacts.includes(user?.id)}
									onSelect={(user) => onSelect(user)}
									unSelect={(user) => unSelect(user)}
								/>
							</div>
						)
					})}
			</div>
		</div>
	)
}
