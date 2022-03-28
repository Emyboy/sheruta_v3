import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import ReviewForm from '../../components/ReviewForm/ReviewForm'
import EachRequestReview from './EachRequestReview'

export default function RequestReview({ request }) {
	const [reviews, setReviews] = useState([])

	const getAllReviews = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL + `/reviews/?request=${request?.id}`
			)
			setReviews(res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getAllReviews()
	}, [getAllReviews])

	return (
		<section>
			{reviews.length === 0 && (
				<div className="text-center card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
					<h3 className="fw-bold">No Reviews</h3>
					<h6>Be the first to add a review</h6>
					<h6>or simply ask questions</h6>
				</div>
			)}
			{reviews.map((val, i) => {
				return <EachRequestReview data={val} key={`review-${i}`} />
			})}

			<ReviewForm
				heading={'Leave a review or a question'}
				done={(e) => setReviews([...reviews, e])}
                request={request?.id}
			/>
		</section>
	)
}
