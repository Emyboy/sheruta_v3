import { Modal, notification } from 'antd'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Layout from '../../components/Layout/Layout'
import Global from '../../Global'
import { FaUndo } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { BsFillBookmarkFill } from 'react-icons/bs'
import Cookies from 'js-cookie'

const EachBookingUser = ({ val, added, onInvite, unInvite }) => {
	return (
		<div className="card mt-3 rounded-xxl">
			<div className="d-flex justify-content-between">
				<div className="p-1 d-flex">
					<img
						src={val?.avatar_url}
						alt="user"
						className="m-2 rounded-xxxl"
						width={'70px'}
						height={'70px'}
					/>
					<div className="mt-3">
						<h4 className="fw-bold text-grey-700">{val?.first_name}</h4>
						<h5 className="text-grey-600">
							{Global.currency}{' '}
							{window.formattedPrice.format(val?.budget)} - Budget
						</h5>
					</div>
				</div>
				{added ? (
					<button
						className="rounded-xxxl btn align-self-center border fw-bold btn-sm"
						onClick={unInvite}
					>
						<FaUndo /> Undo
					</button>
				) : (
					<button
						className="rounded-xxxl btn align-self-center bg-accent text-white fw-bold btn-sm"
						onClick={onInvite}
					>
						+ Invite
					</button>
				)}
			</div>
		</div>
	)
}

export default function BookInspection({ match }) {
	const history = useHistory()
	const [property, setProperty] = useState(null)
	const tabs = ['Interested Users', 'Your Contacts']
	const [tab, setTab] = useState(tabs[0])
	const [invitedUser, setInvitedUser] = useState([])
	const { accepted_suggestions } = useSelector((state) => state?.alice)
	const { personal_info } = useSelector((state) => state.view)
	const [showInvite, setShowInvite] = useState(false)
	const [loading, setLoading] = useState(false)
	const { user } = useSelector((state) => state.auth);
	const router = useHistory();

	const createInspection = async () => {
		setLoading(true)
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL + `/property-inspections`,
				{
					data: {
						owner: user?.user?.id,
						pending_guests: invitedUser,
						property: property?.id,
						agent: property?.agent?.id,
						owner_personal_info: personal_info?.id,
						location_keyword: property?.location_keyword?.id,
						agent_profile: property?.agent_profile?.id
					},
					method: 'POST',
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			if(res.data){
				setLoading(false);
				console.log('--- INSPECTION CREATED ----', res.data)
				router.push(`/inspection/${res?.data?.id}`)
			}
		} catch (error) {
			setLoading(false);
			return Promise.reject(error)
		}
	}

	const getProperty = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/properties/?id=${match?.params?.property_id}`
			)
			if (res.data?.length > 0) {
				setProperty(res.data[0])
			} else {
				history.goBack()
				notification.error({ message: 'Error, please try again' })
			}
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getProperty()
	}, [getProperty])

	return (
		<Layout>
			<div className="container-fluid pt-5">
				<Modal
					visible={showInvite}
					footer={null}
					onCancel={() => setShowInvite(false)}
				>
					<div className="card-body d-block w-100 shadow-none mb-0 p-0 ">
						<h3 className="fw-700 text-dark">Add Users</h3>
						<Alert variant="success">
							<Alert.Heading className='text-grey-700'>
								Once your done inviting users, close the popup and create your
								inspection.
							</Alert.Heading>
						</Alert>
						<hr />
						<ul
							className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0"
							id="pills-tab"
							role="tablist"
						>
							{tabs?.map((val, i) => {
								return (
									<li
										class={`${tab === val && 'active'} list-inline-item me-5`}
										key={`tab-${i}`}
										onClick={() => setTab(val)}
									>
										<a
											className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
												tab === val && 'active'
											}`}
											data-toggle="tab"
										>
											{val}
										</a>
									</li>
								)
							})}
						</ul>
						{tab == tabs[0] && (
							<>
								{property?.interested_parties?.filter(
									(x) => x?.id !== user?.user?.id
								)?.length > 0 ? (
									property?.interested_parties
										?.filter((x) => x?.id !== user?.user?.id)
										.map((val, i) => {
											return (
												<EachBookingUser
													val={val}
													key={`booker-${i}`}
													added={invitedUser.includes(val?.id)}
													onInvite={(e) =>
														setInvitedUser([...invitedUser, val?.id])
													}
													unInvite={() =>
														setInvitedUser(
															invitedUser.filter((x) => x !== val?.id)
														)
													}
												/>
											)
										})
								) : (
									<div className="text-center pt-5 pb-5">
										<h3 className="fw-bold text-grey-600">
											No Interested Users yet.
										</h3>
										<small>Check Your Contacts</small>
									</div>
								)}
							</>
						)}
						{tab === tabs[1] &&
							accepted_suggestions?.map((val, i) => {
								return (
									<EachBookingUser
										val={val?.users_permissions_user}
										key={`booker-${i}`}
										added={invitedUser.includes(
											val?.users_permissions_user?.id
										)}
										onInvite={(e) =>
											setInvitedUser([
												...invitedUser,
												val?.users_permissions_user?.id,
											])
										}
										unInvite={() =>
											setInvitedUser(
												invitedUser.filter(
													(x) => x !== val?.users_permissions_user.id
												)
											)
										}
									/>
								)
							})}
					</div>
				</Modal>
				<div className="row justify-content-center">
					<div className="col-md-7 col-sm-12">
						{property && (
							<div className="card mb-3 rounded">
								<div className="card-header">
									<div className="text-center">
										<h1 className="fw-700 text-grey-600 mb-0">
											Open a new inspection.
										</h1>
									</div>
								</div>
								<div className="card-body d-flex p-1">
									<div
										className="m-2"
										style={{
											backgroundImage: `url(${property?.image_urls[0]})`,
											height: '100px',
											width: '100px',
											borderRadius: '7px',
											backgroundSize: 'cover',
											backgroundPosition: 'center',
										}}
									/>
									<div className="mt-2">
										<h4 className="fw-bold text-grey-700">{property?.name}</h4>
										<h3 className="fw-500">
											{Global.currency}
											{window.formattedPrice.format(property?.price)}
										</h3>
									</div>
								</div>
								<div className="card-footer p-1">
									<Alert variant="info" className="m-1">
										<Alert.Heading className="fw-bold">
											You need {property?.bedroom - 1} more people to join you
											to get this flat.
										</Alert.Heading>
										<p>
											Send an invitations to people on your contact list or
											people who are also interested in this flat.
										</p>
										<hr />
										<p className="mb-0">
											Once all <strong>{property?.bedroom - 1}</strong> people
											accepts, you'll be able to fix a date for the inspection.
										</p>
									</Alert>
									<div className="d-flex justify-content-center mt-4 mb-4">
										{invitedUser.length > 0 ? (
											<button
												disabled={loading}
												className="w-70 btn bg-current text-white fw-700"
												onClick={() => createInspection()}
											>
												<BsFillBookmarkFill /> Create Inspection
											</button>
										) : (
											<button
												className="w-50 btn bg-accent text-white fw-700"
												onClick={() => setShowInvite(true)}
											>
												Invite People
											</button>
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	)
}
