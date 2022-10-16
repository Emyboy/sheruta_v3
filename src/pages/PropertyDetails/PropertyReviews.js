import { Avatar } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { API_URL } from '../../redux/strapi_actions/contact.actions'
import PropertyReviewForm from './PropertyReviewForm'

export default function PropertyReviews() {
	const [list, setList] = useState([])
	const { property_id } = useParams()

	const getPropertyReviews = useCallback(async () => {
		try {
			const res = await axios(API_URL + `/reviews/?property=${property_id}`)
			setList(res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getPropertyReviews()
	}, [getPropertyReviews])

	if (list.length === 0) {
		return null
	}

	return (
		<>
			<div className="card rounded-xxl p-3 article-comments mb-4">
				<h1 className="fw-500">{list.length} Questions</h1>

				<div className="pt-4">
					{list?.map((val) => {
						return <EachQuestion key={`question-${val?.id}`} val={val} />
					})}
				</div>
			</div>
			<PropertyReviewForm done={data => setList([data, ...list])} />
		</>
	)
}

const EachQuestion = ({ val }) => {
	const { user } = useSelector((state) => state.auth)
	const _user = user?.user
	
	return (
		<div className="comments-list pt-4 pb-4 border-bottom">
			<div className="d-flex align-items-center">
				<img
					style={{ borderRadius: '50%' }}
					width="60"
					src={val?.user?.avatar_url}
					alt="image"
					className="mr-3 align-self-start"
				/>
				<div>
					<h5 className="fw-bold">{val?.user?.first_name}</h5>
					<span>{moment(val?.created_at).fromNow()}</span>
					<p>{val?.review}</p>
					{val?.reply ? (
						<div className="card p-3 rounded-xxl shadow-sm bg-theme-light">
							<strong>Partner Replied</strong>
							<p>{val?.reply?.review}</p>
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
}
