import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import { FaStar } from 'react-icons/fa'
import { AiOutlineStar } from 'react-icons/ai'
import axios from 'axios'
import Cookies from 'js-cookie'
import { notification } from 'antd'

export default function ReviewForm({
	heading,
	done,
	request,
	edit,
	reviewData,
}) {
	const { user } = useSelector((state) => state.auth)
	const [review, setReview] = useState(reviewData ? reviewData?.review : null)
	const [rating, setRating] = useState(reviewData ? reviewData?.rating : 1)
	const [loading, setLoading] = useState(false);

	const updateReviews = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await axios(
				process.env.REACT_APP_API_URL + `/reviews/${reviewData?.id}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
					},
					data: {
						review,
						rating,
					},
				}
			)
			if (res?.data) {
				if(done){
					done(res.data)
				}
				setLoading(false)
				notification.success({ message: 'Saved' })
			}
		} catch (error) {
			notification.error({ message: 'Error, please try again' })
			setLoading(false)
			return Promise.reject(error)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await axios(process.env.REACT_APP_API_URL + `/reviews`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
				data: {
					review,
					user: user?.user?.id,
					rating,
					request,
				},
			})
			if (res?.data) {
				if(done){
					done(res.data)
				}
				setLoading(false)
				setReview('')
				setRating(1)
			}
		} catch (error) {
			setLoading(false)
			return Promise.reject(error)
		}
	}

	if (!user) {
		return null
	}
	return (
		<form onSubmit={edit ? updateReviews : handleSubmit}>
			<div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3 mt-3">
				<div className="card-body p-0">
					<a className=" font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center">
						<i className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight"></i>
						{heading || 'Leave your review'}
					</a>
				</div>
				<div className="d-flex p-0 mt-3 mb-2">
					<ReactStars
						count={5}
						onChange={(e) => {
							setRating(e)
						}}
						value={rating}
						emptyIcon={<AiOutlineStar />}
						fullIcon={<FaStar />}
						size={24}
						activeColor="#1da01d"
					/>
				</div>
				<div className="card-body p-0 position-relative">
					<figure className="avatar position-absolute ms-2 mt-1 top-5">
						<img
							src={user?.user?.avatar_url}
							alt="image"
							className="shadow-sm rounded-circle w30"
						/>
					</figure>
					<textarea
						name="message"
						className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xsss text-grey-700 fw-500 border-light-md theme-dark-bg"
						cols="30"
						rows="10"
						placeholder="What's on your mind?"
						value={review}
						onChange={(e) => setReview(e.target.value)}
						maxLength={'240'}
					></textarea>
				</div>
				<div className="d-flex">
					<button
						disabled={rating === 0 || loading}
						className="btn text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xssss fw-700 ls-lg text-white"
					>
						{edit ? 'Save' : 'Submit'}
					</button>
					{edit && (
						<button
							type={'button'}
							className="btn text-danger ml-3"
							onClick={() => done()}
						>
							Cancel
						</button>
					)}
				</div>
			</div>
		</form>
	)
}
