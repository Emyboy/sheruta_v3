import React from 'react'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'

export default function DiscussionInfo() {
	const { user } = useSelector((state) => state.auth)
	const _user = user?.user
	return (
		<div>
			<div style={{ height: '170px' }}>
				<div
					className="bg-theme-light text-center pt-5 pb-3 pl-3"
					style={{
						// backgroundImage: `url(https://picsum.photos/300/200/?blur=6)`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
					}}
				>
					<div className="d-flex">
						<div
							className="bg-white shadow-md p-1"
							style={{ borderRadius: '70px', zIndex: 10 }}
						>
							<Avatar src={_user.avatar_url} size={80} style={{ zIndex: 10 }} />
						</div>
						<div style={{ zIndex: 10 }} className="mt-3 ml-2">
							<h3>Lekki Room</h3>
							<h6>34 Group Members</h6>
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
