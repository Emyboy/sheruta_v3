import React, { useState } from 'react'
import { Input } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const { TextArea } = Input

export default function PropertyReviewForm({ done }) {
	const { user } = useSelector((state) => state.auth)
	const [review, setReview] = useState('')
	const [loading, setLoading] = useState(false)
	const { property_id } = useParams()

	const handleSubmit = async (e) => {
		try {
			e.preventDefault()
			setLoading(true)
			const res = await axios(process.env.REACT_APP_API_URL + `/reviews/property`, {
				method: 'POST',
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
				data: {
					user: user?.user?.id,
					review,
					property: parseInt(property_id),
				},
			})
            if(res){
				console.log(res.data)
				setLoading(false)
				if(done){
					done(res.data)
				}
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
			return Promise.reject(error)
		}
	}

	return (
		<div className="article-leave-comment card p-3 rounded-xxl">
			<h2 className='fw-400'>Leave A Question</h2>

			<form className="pt-4" onSubmit={handleSubmit}>
				<div className="row justify-content-center">
					<div className="col-lg-12 col-md-12">
						<div className="form-group">
							<TextArea
								name="message"
								className="form-control"
								rows={'6'}
								placeholder="Ex. How secure is the environment?"
								onChange={(e) => setReview(e.target.value)}
							/>
						</div>
					</div>

					<div className="col-lg-12 col-md-12">
						<button
							type="submit"
							className="default-btn bg-accent"
							disabled={!review || loading}
						>
							{loading ? 'Loading...' : 'Post A Comment'} <span></span>
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
