import React from 'react'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'

export default function DiscussionInfo() {
	const { user } = useSelector((state) => state.auth)
	const _user = user?.user
	return (
		<div>
			<div className="text-center pb-5">
				<div
					className="jumbotron"
					style={{
						backgroundImage: `url(https://picsum.photos/300/200)`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
					}}
				/>
				<div
					className="bg-white shadow-md rounded-xl"
					style={{ padding: 2, position: 'absolute', top: '80px', left: '36%' }}
				>
					<Avatar src={_user.avatar_url} size={100} />
				</div>
			</div>
			<div className='text-center'>
				<h2>Lekki Room</h2>
			</div>
		</div>
	)
}
