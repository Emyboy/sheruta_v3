import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { FaCrown } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { setGroupState } from '../../../redux/strapi_actions/group.action'
import EachDiscussionGuest from './EachDiscussionGuests'

export default function DiscussionRightUsers() {
	const { room_id } = useParams()
	const [list, setList] = useState([])
	const dispatch = useDispatch();
	const { payment_plan } = useSelector(state => state.view);

	const getRecentUser = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/personal-infos/?location_keyword=${room_id}`
			)
			setList(res.data)
			dispatch(setGroupState({ group_guests: res.data }))
		} catch (error) {
			return Promise.reject(error)
		}
	}, [room_id])

	useEffect(() => {
		getRecentUser()
	}, [getRecentUser])

	// if(!payment_plan){
	// 	return <div className='text-center py-5'>
	// 		<FaCrown className='text-warning mb-4' size={50} />
	// 		<h3>Go Premium Today</h3>
	// 		<h5>View all room members</h5>
	// 		<Link to='/pricing' className='text-theme mt-3 fw-bold'>Learn More</Link>
	// 	</div>
	// }

	return (
		<div className="bg-white border-top">
			<div className="d-flex justify-content-between align-items-center p-2 mb-1">
				<h4 className="fw-500 text-grey-600 mb-0">Room Guests</h4>
				<Link to={`/flats`}>
					<small></small>
				</Link>
			</div>
			<div>
				{list.map((val, i) => {
					return <EachDiscussionGuest key={`guest-${i}`} data={val} />
				})}
			</div>
		</div>
	)
}
