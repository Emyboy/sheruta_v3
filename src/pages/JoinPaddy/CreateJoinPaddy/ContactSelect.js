import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
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
		}else {
			selected(false)
		}
	}, [selectedContacts])

	return (
		<div>
			<div className="text-center mb-4">
				<h1 className="fw-700">{heading}</h1>
				<h6>{subHeading}</h6>
			</div>
			<div className="row">
				{accepted_suggestions
					.filter((x) => !x.users_permissions_user.deactivated)
					.map((val) => {
						let user = val.users_permissions_user
						return (
							<div className="col-sm-12 col-md-6">
								<EachPaddyUser
									user={user}
									selected={selectedContacts.includes(user)}
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
