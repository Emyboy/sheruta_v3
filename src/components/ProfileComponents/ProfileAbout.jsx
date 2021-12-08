import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function ProfileAbout({ user }) {
	const auth = useSelector((state) => state.auth)
	const [isOwner, setIsOwner] = useState(auth.user ? auth.user.user.id === user.id: false);

	useEffect(() => {
		console.log('USER ---', user);
		if (auth.user && user.id === auth.user.user.id) {
			setIsOwner(true)
		} else {
			setIsOwner(false)
		}
	},[user])

	if(user && user.deactivated){
		return null
	}

	return (
		<div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
			<div className="card-body d-block p-4">
				<h4 className="fw-700 mb-3 font-xsss text-grey-900">About</h4>
				<p className="fw-500 text-grey-500 lh-24 font-xssss mb-0">
					{user.bio || `Hi my name is ${user.first_name}`}
				</p>
			</div>
			{isOwner && (
				<>
					<div className="card-body border-top-xs d-flex">
						<i className="feather-lock text-grey-500 me-3 font-lg"></i>
						<h4 className="fw-700 text-grey-900 font-xssss mt-0">
							Private{' '}
							<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
								All accounts are set to private
							</span>
						</h4>
					</div>

					<Link className="card-body d-flex pt-0" to={`/settings/account-settings`}>
						<i className="feather-edit text-grey-500 me-3 font-lg"></i>
						<h4 className="fw-700 text-grey-900 font-xssss mt-0">
							Edit Profile{' '}
							<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
								Change first name, last name & phone
							</span>
						</h4>
					</Link>
					<Link className="card-body d-flex pt-0" to={`/settings/configure-view`}>
						<i className="feather-layout text-grey-500 me-3 font-lg"></i>
						<h4 className="fw-700 text-grey-900 font-xssss mt-0">
							Configure View
							<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
								Those that have or those who are looking.
							</span>
						</h4>
					</Link>

					<Link className="card-body d-flex pt-0" to={`/settings/deactivate-account`}>
						<i className="feather-alert-triangle text-grey-500 me-3 font-lg"></i>
						<h4 className="fw-700 text-grey-900 font-xssss mt-1">
							Deactivate Account
							<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
								Found a flat mate?
							</span>
						</h4>
					</Link>
				</>
			)}
		</div>
	)
}
