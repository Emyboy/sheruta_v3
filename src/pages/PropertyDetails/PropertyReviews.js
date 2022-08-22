import { Avatar } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import PropertyReviewForm from './PropertyReviewForm'

export default function PropertyReviews() {
	return (
		<>
			<div className="card rounded-xxl p-3 article-comments mb-4">
				<h4>03 Questions</h4>

				<div className="pt-4">
					<EachQuestion />
					<EachQuestion />
					<EachQuestion />
					<EachQuestion />

					<div className="comments-list children">
						<img src="assets/images/agents/agents-3.jpg" alt="image" />
						<h5>Thomas Equito</h5>
						<span>26th February 2022</span>
						<p>
							Aenean sollicitudin, lorem quis bibendum auctor, nisi elit
							consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit
							amet nibh vulputate.
						</p>
						<a href="#" className="reply-btn">
							<i className="bx bx-reply"></i>Reply
						</a>
					</div>
				</div>
			</div>
			<PropertyReviewForm />
		</>
	)
}

const EachQuestion = ({ data }) => {
	const { user } = useSelector((state) => state.auth)
	const _user = user?.user
	return (
		<div className="comments-list pt-4 pb-4 border-bottom">
			<div className="d-flex align-items-center">
				<img
					style={{ borderRadius: '50%' }}
					width="60"
					src={_user?.avatar_url}
					alt="image"
					className="mr-3 align-self-start"
				/>
				<div>
					<h5>{_user?.first_name}</h5>
					<span>26th February 2022</span>
					<p>
						Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat
						ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh
						vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit Nam
						nec.
					</p>
					<a href="#" className="reply-btn">
						<i className="bx bx-reply"></i>Reply
					</a>
				</div>
			</div>
		</div>
	)
}
