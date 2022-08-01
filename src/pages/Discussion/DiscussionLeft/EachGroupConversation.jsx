import React, { useState } from 'react'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useCallback } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'

export default React.memo(function EachGroupConversation({
	active,
	clickURL,
	name,
	image_url,
	last_seen,
	id,
}) {
	const { user } = useSelector((state) => state.auth)
	const [preview, setPreview] = useState('')
	const [lastSeen, setLastSeen] = useState(last_seen)
	const _user = user?.user

	const chatPreview = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/messages/?location_keyword=${id}&_limit=1&_sort=created_at:DESC`,
				{
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			if (res.data[0]?.created_at) setLastSeen(moment(res.data[0].created_at).fromNow())
			setPreview(res.data[0]?.message_text || '....')
		} catch (error) {
			console.log(error)
			return '....'
		}
	}, [])

	useEffect(() => {
		chatPreview()
	}, [chatPreview])

	return (
		<Link
			to={clickURL}
			className={`p-2 border-bottom w-100 list-group-item list-group-item-action ${
				active ? 'bg-theme-light border-1 border-success' : 'bg-white'
			}`}
		>
			<div className="d-flex align-items-center">
				<div>
					<div
						className={_user?.is_online ? 'bg-danger' : 'bg-success'}
						style={{ borderRadius: '50px', padding: 3 }}
					>
						<Avatar src={image_url} size={60} className="m-0" />
					</div>
				</div>
				<div className="pl-2 w-100">
					<div
						className="d-flex justify-content-between align-items-center"
					>
						<h4 className='m-0'>{name}</h4>
						<small>
							<i>{lastSeen}</i>
						</small>
					</div>
					<small className="text-muted">
						<i>{`${preview}`.slice(0, 25)}...</i>
					</small>
				</div>
			</div>
		</Link>
	)
})
