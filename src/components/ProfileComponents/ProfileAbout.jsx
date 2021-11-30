import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function ProfileAbout({ user }) {
	const auth = useSelector((state) => state.auth)
	const [isOwner, setIsOwner] = useState(auth.user.user.id === user.id);

	useEffect(() => {
		if(user.id === auth.user.user.id){
			setIsOwner(true)
		}else {
			setIsOwner(false);
		}
	},[user])

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
								What's up, how are you?
							</span>
						</h4>
					</div>

					<div className="card-body d-flex pt-0">
						<i className="feather-eye text-grey-500 me-3 font-lg"></i>
						<h4 className="fw-700 text-grey-900 font-xssss mt-0">
							Visble{' '}
							<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
								Anyone can find you
							</span>
						</h4>
					</div>
					<div className="card-body d-flex pt-0">
						<i className="feather-map-pin text-grey-500 me-3 font-lg"></i>
						<h4 className="fw-700 text-grey-900 font-xssss mt-1">
							Flodia, Austia{' '}
						</h4>
					</div>
					<div className="card-body d-flex pt-0">
						<i className="feather-users text-grey-500 me-3 font-lg"></i>
						<h4 className="fw-700 text-grey-900 font-xssss mt-1">
							Genarel Group
						</h4>
					</div>
				</>
			)}
		</div>
	)
}
