import React, { useState } from 'react'
import moment from 'moment'
import ReactStars from 'react-rating-stars-component'
import axios from 'axios'
import Cookies from 'js-cookie'
import { notification } from 'antd'
import { useSelector } from 'react-redux'
import ReviewForm from '../../components/ReviewForm/ReviewForm'

export default function EachRequestReview({ data, withRating }) {
	const [review, setReview] = useState(data)
	const [showOptions, setShowOptions] = useState(false)
	const [deleted, setDeleted] = useState(false)
	const [edit, setEdit] = useState(false)

	const { user } = useSelector((state) => state?.auth)

	const owner = review?.user?.id === user?.user?.id

	const handleDelete = async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL + `/reviews/${review?.id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			if (res.data) {
				setDeleted(true)
				notification.error({ message: 'Deleted' })
			}
		} catch (error) {
			notification.error({ message: 'Error, please try again' })
			return Promise.reject(error)
		}
	}

	if (deleted) {
		return null
	}

	if (edit) {
		return (
			<ReviewForm
				heading={'Edit your review'}
				request={review?.request}
				reviewData={review}
				edit={true}
				done={(e) => {
					if (e) {
						setReview(e)
					}
					setEdit(false)
				}}
			/>
		)
	}

	return (
		<article className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
			<div className="card-body p-0 d-flex">
				<figure className="avatar me-3 m-0">
					<img
						src={review?.user?.avatar_url}
						alt="image"
						className="shadow-sm rounded-circle w45"
					/>
				</figure>
				<h4 className="fw-700 text-grey-900 font-xssss mt-1">
					{review?.user?.first_name}
					<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
						@{review?.user?.username}
					</span>
				</h4>
				<a
					href="#"
					className="ms-auto"
					id="dropdownMenu6"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
				</a>
				<div
					className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
					aria-labelledby="dropdownMenu6"
				>
					<div className="card-body p-0 d-flex" onClick={() => setEdit(true)}>
						<i className="feather-edit text-grey-500 me-3 font-lg"></i>
						<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
							Edit
							<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
								Typo? Edit your review
							</span>
						</h4>
					</div>
					{/* <div className="card-body p-0 d-flex mt-2">
						<i className="feather-flag text-grey-500 me-3 font-lg"></i>
						<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
							Report
							<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
								Broke a rule? Please report
							</span>
						</h4>
					</div> */}
					<hr />
					<div className="card-body p-0 d-flex mt-2" onClick={handleDelete}>
						<i className="feather-trash text-grey-500 me-3 font-lg"></i>
						<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
							Delete
							<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
								Delete your review
							</span>
						</h4>
					</div>
					
				</div>
			</div>
			<div className="card-body p-0 me-lg-5 ml-5">
				<p className="fw-500 text-grey-500 lh-26 font-xssss w-100">
					{review?.review}
				</p>
			</div>
			
		</article>
	)
}
