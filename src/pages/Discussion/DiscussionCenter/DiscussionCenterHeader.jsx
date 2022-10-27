import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from 'antd'
import { FiInfo, FiPhoneCall } from 'react-icons/fi'
import { useParams } from 'react-router'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Global from '../../../Global'
import { setGroupState } from '../../../redux/strapi_actions/group.action'
import { Link } from 'react-router-dom'
import moment from 'moment'

const iconSize = 24

export default function DiscussionCenterHeader({ backURL, userData }) {
	const { room_id } = useParams()
	const { location_keywords, conversations } = useSelector((state) => state.view)
	// const { user } = useSelector((state) => state.auth)
	const { group_guests } = useSelector((state) => state?.group)
	const dispatch = useDispatch()

	// const params = useParams()

	// const { conversation_id } = params

	// const active_conversation = conversations?.filter(x => x.uuid == conversation_id);

	// const _user = active_conversation[0]?.guest;

	const data = location_keywords.filter((x) => x.id == room_id)

	return (
		<header className="bg-white border-bottom p-2 d-flex justify-content-between animate__fadeInDown animate__animated shadow-sm">
			<Link
				to={userData ? `/user/${userData?.username}` : window.location.pathname}
				className="d-flex align-items-center"
			>
				{Global.isMobile && (
					<Link to={backURL} className="btn btn-sm mr-3 mobile-only">
						<AiOutlineArrowLeft size={iconSize} className="text-grey-600" />
					</Link>
				)}
				<Avatar
					src={userData ? userData?.avatar_url : data[0]?.background_img}
					size={50}
				/>
				<div className="pl-2">
					<h3>
						{!userData ? (
							<>{`${data[0]?.name} Room`.slice(0, Global.isMobile ? 17 : 70)}</>
						) : (
							<>{`${userData?.first_name}`}</>
						)}
					</h3>
					<small>
						{userData ? (
							<p className="text-grey-500">
								{moment(userData?.last_seen).fromNow()}
							</p>
						) : (
							<i className="text-grey-500" style={{ width: '20px' }}>
								{`${group_guests?.map((val, i) => {
									if (i < 9) {
										return val?.users_permissions_user?.first_name + ' '
									}
								})} and others`.slice(0, Global.isMobile ? 20 : 70)}
							</i>
						)}
					</small>
				</div>
			</Link>
			{userData ? (
				<a href={`tel:${userData?.phone_number}`} className="btn btn-sm">
					<FiPhoneCall
						size={iconSize}
						className="align-self-center text-grey-600"
						onClick={() => dispatch(setGroupState({ showDetails: true }))}
					/>
				</a>
			) : (
				<button className="btn btn-sm mobile-only">
					<FiInfo
						size={iconSize}
						className="align-self-center text-grey-600"
						onClick={() => dispatch(setGroupState({ showDetails: true }))}
					/>
				</button>
			)}
		</header>
	)
}
