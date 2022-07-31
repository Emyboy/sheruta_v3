import React from 'react'
import { Avatar } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { MdClose } from 'react-icons/md'
import { useParams } from 'react-router'
import { setGroupState } from '../../../redux/strapi_actions/group.action'

const iconSize = 24

export default function DiscussionInfo() {
	const { room_id } = useParams()
	const { location_keywords } = useSelector((state) => state.view)
	const { user } = useSelector((state) => state.auth)
	const _user = user?.user
	const dispatch = useDispatch()

	const data = location_keywords.filter((x) => x.id == room_id)[0]

	return (
		<div>
			<div style={{ height: '170px' }}>
				<div
					className="bg-accent text-center pt-5 pb-3 pl-3"
					style={{
						// backgroundImage: `url(https://picsum.photos/300/200/?blur=6)`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
					}}
				>
					<button
						className="btn btn-sm text-white"
						style={{ position: 'absolute', right: 10, top: 10 }}
						onClick={() => dispatch(setGroupState({ showDetails: false }))}
					>
						<MdClose size={iconSize} />
					</button>
					<div className="d-flex">
						<div
							className="bg-white shadow-md p-1"
							style={{ borderRadius: '70px', zIndex: 10 }}
						>
							<Avatar
								src={data?.background_img}
								size={80}
								style={{ zIndex: 10 }}
							/>
						</div>
						<div style={{ zIndex: 10 }} className="mt-3 ml-2">
							<h3 className="text-white">{data?.name} Room</h3>
							<h6 className="text-white">34 Group Members</h6>
						</div>
					</div>
				</div>
				{/* <div
				style={{
					background: '#0b0b0ba8',
					width: '99%',
					height: '153px',
					position: 'absolute',
					zIndex: '2',
					top: 0,
				}}
			/> */}
			</div>
		</div>
	)
}
