import React, { useState } from 'react'
import { FaReply } from 'react-icons/fa'
import axios from 'axios'
import Cookies from 'js-cookie'
import { notification } from 'antd'
import { useSelector } from 'react-redux'
import ReviewForm from '../../components/ReviewForm/ReviewForm'
import Global from '../../Global'
import VerifiedBadge from '../../components/VerifiedBadge/VerifiedBadge'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import renderHTML from 'react-render-html'

export default function EachRequestReview({ data, replies }) {
	const [review, setReview] = useState(data)
	const [showOptions, setShowOptions] = useState(false)
	const [deleted, setDeleted] = useState(false)
	const [edit, setEdit] = useState(false)
	const [showReplyInput, setShowReplyInput] = useState(false);
	const [replyList, setReplyList] = useState([])

	const { user } = useSelector((state) => state?.auth)

	const owner = review?.user?.id === user?.user?.id

	const handleDelete = async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL + `/reviews/${review?.id}`,
				{
					method: 'DELETE',
					data: {
						review
					},
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

	useEffect(() => {
		if(replies?.length){
			setReplyList(replies)
		}
	},[replies])

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
		<>
			<article className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
				<div className="card-body p-0 d-flex align-items-center">
					<figure className="avatar me-3 m-0">
						<Link to={`/user/${review?.user?.username}`}>
							<img
								src={review?.user?.avatar_url}
								alt="image"
								className="shadow-sm rounded-circle w45"
							/>
						</Link>
					</figure>
					<h4 className="fw-700 text-grey-900 font-xssss mt-1">
						<div className="d-flex align-items-center">
							{review?.user?.first_name}
							<VerifiedBadge
								user={review?.user}
								without_text
								className={'ml-1'}
							/>
						</div>
						<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
							{Global.currency}
							{window.formattedPrice.format(review?.user?.budget)} - Budget
						</span>
					</h4>
					{user && user?.user?.id === review?.user?.id && (
						<a
							href="#"
							className="ms-auto"
							id="dropdownMenu6"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
						</a>
					)}
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
					<p className="fw-500 text-grey-500 lh-26 font-xss w-100">
						{review?.review}
					</p>
				</div>

				{replyList?.length > 0 && (
					<>
						<hr className='text-grey-400' />
						<div>
							{replyList?.map((val) => {
								return (
									<EachReply key={`reply-${Date.now()}`} val={val} />
								)
							})}
						</div>
					</>
				)}
				{user?.user?.id == review?.request?.users_permissions_user && (
					<>
						{showReplyInput ? (
							<ReviewForm
								heading={`Reply ${review?.user?.first_name}`}
								done={(e) => {
									setReplyList([...replyList, e])
									setShowReplyInput(false)
								}}
								request={review?.request?.id}
								reviewData={review}
								isReply
								replyTo={review?.user}
							/>
						) : (
							<div className="d-flex align-items-center  mt-4 ml-5">
								<button
									className="btn bg-grey fw-600 text-grey-600 font-xssss"
									onClick={() => setShowReplyInput(true)}
								>
									Reply Question <FaReply />
								</button>
							</div>
						)}
					</>
				)}
			</article>
		</>
	)
}


const EachReply = ({ val }) => {
	return (
		<div className="card-body d-flex pt-0 ps-5 pe-4 pb-0 align-items-center mb-3">
			{/* <figure className="avatar me-3"> */}
			<img
				src={val?.user?.avatar_url}
				alt={val?.user?.first_name}
				className="shadow-sm rounded-circle w45 avatar me-3 align-self-start"
				width={'100'}
				height="100"
			/>
			{/* </figure> */}
			<h4 className="fw-700 text-grey-900 font-xssss mt-1">
				{val?.user?.first_name}{' '}
				<small className="text-grey-500 ml-1">Replied</small>
				<span className="d-block font-xsss fw-500 mt-1 lh-3 text-grey-500">
					{renderHTML(val?.review)}
				</span>
			</h4>
		</div>
	)
}