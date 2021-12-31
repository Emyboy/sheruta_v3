import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Btn from '../../components/Btn/Btn'
import VerifiedBadge from '../../components/VerifiedBadge/VerifiedBadge'
import { FiCheck } from 'react-icons/fi'
import { MdClose, MdWork } from 'react-icons/md'
import { FaIndustry } from 'react-icons/fa'
import { Modal } from 'react-bootstrap'
import PersonalInfo from '../Profile/PersonalInfo'
import NotificationService from '../../services/Notifications'
import Analytics, { AnalyticsTypes } from '../../services/Analytics'
import moment from 'moment'

const Wrapper = styled.div`
	.actions > div > button {
		border: none;
		/* background-color: pink; */
		height: 4em;
		width: 4em;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.actions > div {
		display: flex;
		flex-direction: column;
		text-align: center;
	}
`

export default function EachMatchCard({ data, handleStatusUpdate }) {
	const { users_permissions_user, personal_info } = data
	const { user } = useSelector((state) => state.auth)
	const { work_industries } = useSelector((state) => state.view)
	const [showInfo, setShowInfo] = useState(false)

	useEffect(() => {
		if (showInfo) {
			Analytics.create({
				user_id: users_permissions_user.id,
				type: AnalyticsTypes.personalInfoView,
			})
			if (user && user?.user?.is_verified) {
				NotificationService.notifyUser({
					owner: users_permissions_user.id,
					type: 'personal_info_view',
				})
			} else if (user && !user?.user?.is_verified) {
				NotificationService.notifyUser({
					owner: users_permissions_user.id,
					type: 'personal_info_view_attempt',
					sub_title: "This user wasn't verified",
				})
			}
		}
	}, [showInfo])

	return (
		<>
			<Modal show={showInfo} onHide={() => setShowInfo(false)}>
				<Modal.Body>
					<div className="card-header d-flex justify-content-between align-items-center">
						<span className="h1 font-xl fw-bold text-center">More Info</span>
						<button className="btn fw-700" onClick={() => setShowInfo(false)}>
							x
						</button>
					</div>
					{user && user.user.is_verified ? (
						<PersonalInfo userData={users_permissions_user} />
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
				</Modal.Body>
			</Modal>
			<Wrapper className="card d-block border  rounded-xxl overflow-hidden mb-3">
				{users_permissions_user?.deactivated ? (
					<div
						className="card-body text-center align-items-center d-flex justify-content-center "
						style={{ height: '500px' }}
					>
						<div className="mt-5 mb-5">
							<h5 className="fw-bold">This account has been deactivated</h5>
							<h6>Press the remove button</h6>
							<div>
								<button
									className="btn-danger btn mt-5 mb-2"
									onClick={() => handleStatusUpdate(data.id, 'rejected')}
								>
									<MdClose size={40} />
								</button><br />
								<small className='fw-bold'>Remove</small>
							</div>
						</div>
					</div>
				) : (
					<>
						<div className="card-body d-block w-100 p-4 text-center">
							<figure className="avatar ms-auto me-auto mb-0 position-relative w90 z-index-1">
								<img
									src={users_permissions_user.avatar_url}
									alt="image"
									className="float-right p-1 bg-white rounded-circle w-100"
								/>
							</figure>
							<div className="clearfix"></div>
							<div className="d-flex justify-content-center">
								<Link to={`/user/${users_permissions_user.username}`}>
									<h4 className="fw-700 font-xss mt-3 mb-0">
										{users_permissions_user.first_name}{' '}
									</h4>
								</Link>
								<VerifiedBadge
									user={users_permissions_user}
									without_text
									className="ml-2 mt-2"
								/>
							</div>

							<p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">
								@{users_permissions_user.username}
							</p>
							<ul className="product-feature-list mt-1">
								<li className="lh-32 font-xsss text-grey-500 fw-500 d-flex">
									<b className="text-grey-900 mr-2"> Gender: </b>
									{personal_info.gender === 'm' ? 'Male' : 'Female'}
								</li>
								<li className="lh-32 font-xsss text-grey-500 fw-500 d-flex">
									<b className="text-grey-900 mr-2">Occupation: </b>
									{personal_info.occupation}
								</li>
								<li className="lh-32 font-xsss text-grey-500 fw-500 d-flex">
									<b className="text-grey-900 mr-2"> Industry: </b>
									{work_industries.length > 0 &&
										work_industries.filter(
											(x) => x.id === personal_info.work_industry
										)[0].name}
								</li>
								<li className="lh-32 font-xsss text-grey-500 fw-500 d-flex">
									<b className="text-grey-900 mr-2"> Joined: </b>
									{moment(users_permissions_user.created_at).fromNow()}
								</li>
							</ul>
							<button
								className="text-center mt-3 btn fw-bold"
								onClick={() => setShowInfo(true)}
							>
								<i className="ti-lock font-xs mr-2"></i>
								<span>Show More Info</span>
							</button>
						</div>

						<hr />
						<div className="p-3 actions d-flex justify-content-around">
							<div>
								<button
									className="btn-danger"
									onClick={() => handleStatusUpdate(data.id, 'rejected')}
								>
									<MdClose size={40} />
								</button>
								<small>Reject</small>
							</div>
							<div>
								<button
									className="bg-theme text-white"
									onClick={() => handleStatusUpdate(data.id, 'accepted')}
								>
									<FiCheck size={40} />
								</button>
								<small>Accept</small>
							</div>
						</div>
					</>
				)}
			</Wrapper>
		</>
	)
}
