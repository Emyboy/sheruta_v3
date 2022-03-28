import React, { useState } from 'react'
import moment from 'moment'
import ReactStars from 'react-rating-stars-component'
import axios from 'axios'
import Cookies from 'js-cookie'
import { notification } from 'antd'
import { useSelector } from 'react-redux'
import ReviewForm from '../../components/ReviewForm/ReviewForm'

export default function EachRequestReview({ data }) {
	const [review, setReview] = useState(data);
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
				done={e => {
					if(e){
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
				<figure className="avatar me-3">
					<img
						src={review?.user?.avatar_url}
						alt="image"
						className="shadow-sm rounded-circle w45"
					/>
				</figure>
				<h4 className="fw-700 text-grey-900 font-xssss mt-1 w-100">
					<div className="d-flex justify-content-between">
						<div>
							<span>{review?.user?.first_name}</span>
							<ReactStars
								value={review?.rating}
								edit={false}
								count={5}
								size={!review?.review ? 30 : 17}
								activeColor="#1da01d"
								color={'#8e928e'}
							/>
						</div>
						<div>
							{user && (
								<a
									onClick={() => setShowOptions(!showOptions)}
									// className="ms-auto"
									id="dropdownMenu7"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
								</a>
							)}
						</div>
					</div>

					<p
						className={`${
							!review?.review ? 'mt-0' : 'mt-3'
						} text-grey-700 fw-500`}
						style={{ fontSize: '15px' }}
					>
						<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
							{moment(review?.created_at).fromNow()}
						</span>
						{review?.review}
					</p>
				</h4>

				{user && (
					<div
						className={`dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg ${
							showOptions && 'show'
						}`}
						aria-labelledby="dropdownMenu6"
						data-popper-placement="bottom-end"
						style={{
							position: 'absolute',
							inset: '0px auto auto 0px',
							margin: '0px',
							transform: 'translate(349px, 73px)',
							left: '70px',
						}}
					>
						{owner && (
							<div
								className="link card-body p-0 d-flex mb-3"
								onClick={() => {
									setShowOptions(false)
									setEdit(true);
								}}
							>
								<i className="feather-edit text-grey-500 me-3 font-lg"></i>
								<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
									Edit
									<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
										Typo? Edit your review
									</span>
								</h4>
							</div>
						)}
						<div className="link card-body p-0 d-flex">
							<i className="feather-flag text-grey-500 me-3 font-lg"></i>
							<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
								Report
								<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
									Broke a rule? Please report this.
								</span>
							</h4>
						</div>
						{owner && (
							<>
								<hr />
								<div
									className="link card-body p-0 d-flex mt-2"
									onClick={handleDelete}
								>
									<i className="feather-trash text-grey-500 me-3 font-lg"></i>
									<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
										Delete
										<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
											Delete your review.
										</span>
									</h4>
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</article>
	)
}
