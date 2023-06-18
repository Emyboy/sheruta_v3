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
import { BiLeftArrowAlt, BiUser } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { Dots } from 'react-activity'

const EachBookingUser = ({ val, added, onInvite, unInvite, personal_info }) => {
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
							{Global.currency} {window.formattedPrice.format(val?.budget)} -
							{personal_info && personal_info?.looking_for ? "Budget" : "Rent"}
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
	const { contacts } = useSelector((state) => state?.contact)
	const { personal_info } = useSelector((state) => state.view)
	const [showInvite, setShowInvite] = useState(false)
	const [loading, setLoading] = useState(false)
	const { user } = useSelector((state) => state.auth)
	const [is_alone, setIsAlone] = useState(undefined)
	const [section, setSection] = useState(0)

	const router = useHistory()

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
						agent_profile: property?.agent_profile?.id,
						is_alone,
					},
					method: 'POST',
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			if (res.data) {
				setTimeout(() => {
					router.push(`/inspection/${res?.data?.id}`)
					setLoading(false)
				}, 2000)
			}
		} catch (error) {
			setLoading(false)
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
				></Modal>
				<div className="row justify-content-center mb-5">
					<div className="col-md-7 col-sm-12">
						{property ? (
							<div>
								{section === 0 ? (
									<div className="card rounded-xxl mb-4 border-0 shadow-sm animate__fadeIn animate__animated ">
										<div className="card-body pt-5 pb-5 text-center">
											<h1 className="mb-5">Select Booking Option</h1>
											<div className="d-flex align-items-center flex-column">
												<EachBookingOption
													heading={'Book Alone'}
													Icon={(p) => <BiUser {...p} />}
													isSelected={is_alone === true}
													sub_heading="Book and rent alone"
													onClick={() => setIsAlone(true)}
												/>
												<EachBookingOption
													heading={'Book With Someone'}
													Icon={(p) => <FiUsers {...p} />}
													isSelected={is_alone === false}
													sub_heading="Team up with others on the platform"
													onClick={() => setIsAlone(false)}
												/>
												<hr />
												<button
													disabled={is_alone === undefined || loading}
													className="btn bg-theme text-white w-50 "
													onClick={() =>
														is_alone
															? createInspection()
															: setSection(section + 1)
													}
												>
													Next
												</button>
											</div>
										</div>
									</div>
								) : null}
								{section === 1 ? (
									<div className="card rounded-xxl border-0 shadow-sm animate__fadeIn animate__animated">
										<div className="card-body d-block w-100 shadow-none mb-0 pt-4 pb-4">
											<div className="d-flex mb-4 align-items-center">
												<button
													className="btn-sm btn"
													onClick={() => setSection(0)}
												>
													<BiLeftArrowAlt size={40} />
												</button>{' '}
												<h3 className="fw-700 text-dark ">Add People</h3>
											</div>
											<Alert variant="success">
												<Alert.Heading className="text-grey-700" as={'p'}>
													Select the persons you'd like to share with.
												</Alert.Heading>
											</Alert>
											<hr />
											{property?.bedroom - Number(invitedUser.length + 1) >
												0 && (
												<Alert variant="danger">
													<Alert.Heading className="text-grey-700" as={'p'}>
														Remaining{' '}
														{property?.bedroom - Number(invitedUser.length + 1)}{' '}
														people
													</Alert.Heading>
												</Alert>
											)}
											<ul
												className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0"
												id="pills-tab"
												role="tablist"
											>
												{tabs?.map((val, i) => {
													return (
														<li
															class={`${
																tab === val && 'active'
															} list-inline-item me-5`}
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
												contacts
													?.map((val, i) => {
														return (
															<EachBookingUser
																val={val?.user}
																key={`booker-${i}`}
																added={invitedUser.includes(val?.user?.id)}
																onInvite={(e) =>
																	setInvitedUser([
																		...invitedUser,
																		val?.user?.id,
																	])
																}
																unInvite={() =>
																	setInvitedUser(
																		invitedUser.filter(
																			(x) => x !== val?.user.id
																		)
																	)
																}
																personal_info={val?.personal_info}
															/>
														)
													})}
											<hr />

											<div className="text-center">
												<button
													className="btn w-50 bg-theme text-white"
													disabled={
														property?.bedroom - Number(invitedUser.length + 1) >
															0 || loading
													}
													onClick={createInspection}
												>
													Finish
												</button>
											</div>
										</div>
									</div>
								) : null}
							</div>
						) : (
							<div className="card mt-5">
								<div className="card-body pt-5 pb-5 d-flex flex-column align-items-center justify-content-center">
									<Dots />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	)
}

const EachBookingOption = ({
	heading,
	Icon,
	isSelected,
	sub_heading,
	onClick,
}) => {
	return (
		<div className="col-xl-8 col-sm-10" onClick={onClick}>
			<div
				className={`card rounded-xxl mb-4 ${
					isSelected && 'border-success border-2 shadow'
				}`}
			>
				<div className="card-body text-center">
					<Icon
						size={50}
						className={`${isSelected ? 'text-theme' : 'text-grey-600'} `}
					/>
					<h3 className={`mt-3 ${isSelected ? 'text-theme' : 'text-grey-600'}`}>
						{heading}
					</h3>
					<small className={isSelected && 'text-theme'}>{sub_heading}</small>
				</div>
			</div>
		</div>
	)
}
