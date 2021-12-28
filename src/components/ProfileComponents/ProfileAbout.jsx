import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import PersonalInfo from '../../pages/Profile/PersonalInfo';

export default function ProfileAbout({ user }) {
	const auth = useSelector((state) => state.auth)
	const [isOwner, setIsOwner] = useState(auth.user ? auth.user.user.id === user.id: false);
	const [showInfo, setShowInfo] = useState(false);

	useEffect(() => {
		if (auth.user && user.id === auth.user.user.id) {
			setIsOwner(true)
		} else {
			setIsOwner(false)
		}
	},[user])

	if(user && user.deactivated || auth.user && auth.user?.user?.deactivated){
		return null
	}

	return (
		<div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
			<Modal show={showInfo} size="lg" onHide={() => setShowInfo(false)}>
				{auth.user && auth.user?.user.is_verified ? (
					<PersonalInfo userData={user} />
				) : (
					<div className="text-center pt-5 pb-5">
						<h1 className="font-xxl">😢</h1>
						<h2 className="fw-bold">Only verified users can view this</h2>
						<Link to={`/start`}>
							<button className="btn bg-theme text-white mt-3">
								Verify Your Account
							</button>
						</Link>
					</div>
				)}
				<button className="btn btn-danger" onClick={() => setShowInfo(false)}>
					close
				</button>
			</Modal>
			<div className="card-body d-block p-4">
				<h4 className="fw-700 mb-3 font-xsss text-grey-900">About</h4>
				<p className="fw-500 text-grey-500 lh-24 font-xssss mb-0">
					{user.bio || `Hi my name is ${user.first_name} and I use Sheruta NG`}
				</p>
				<button
					className="text-center mt-3 btn fw-bold"
					onClick={() => setShowInfo(true)}
				>
					<i className="ti-lock font-xss mr-2"></i>
					<small>Show More Info</small>
				</button>
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

					<Link
						className="card-body d-flex pt-0"
						to={`/settings/account-settings`}
					>
						<i className="feather-edit text-grey-500 me-3 font-lg"></i>
						<h4 className="fw-700 text-grey-900 font-xssss mt-0">
							Edit Profile{' '}
							<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
								Change first name, last name & phone
							</span>
						</h4>
					</Link>
					<Link
						className="card-body d-flex pt-0"
						to={`/settings/configure-view`}
					>
						<i className="feather-layout text-grey-500 me-3 font-lg"></i>
						<h4 className="fw-700 text-grey-900 font-xssss mt-0">
							Configure View
							<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
								Those that have or those who are looking.
							</span>
						</h4>
					</Link>

					<Link
						className="card-body d-flex pt-0"
						to={`/settings/deactivate-account`}
					>
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
