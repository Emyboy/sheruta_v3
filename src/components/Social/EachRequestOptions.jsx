import { notification } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteFirebaseImage } from '../../services/Firebase.utils'
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup'

export default function EachRequestOptions({ data, deleted, setDeleted }) {
	const auth = useSelector((state) => state.auth)
	const user = data?.users_permissions_user
	const [showDelete, setShowDelete] = useState(false)
	const [deleteLoading, setDeleteLoading] = useState(false)
	const [isOwner, setIsOwner] = useState(false)

	const handleDelete = () => {
		setDeleteLoading(true)
		axios(process.env.REACT_APP_API_URL + `/property-requests/${data.id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
		})
			.then((res) => {
				setDeleteLoading(false)
				if (data.image_url) {
					data.image_url.map((val, i) => {
						DeleteFirebaseImage(
							`images/requests/${data.users_permissions_user.id}/${data.uuid}/image_${i}`
						)
					})
				}
				setDeleted(true)
				notification.success({ message: 'Deleted' })
			})
			.catch((err) => {
				setDeleteLoading(false)
				notification.error({ message: 'Error deleting post' })
			})
	}

	useEffect(() => {
		if (auth.user && auth.user.user.id === user.id) {
			setIsOwner(true)
		} else {
			setIsOwner(false)
		}
	}, [])

	return (
		<div
			className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
			aria-labelledby="dropdownMenu2"
		>
			<ConfirmPopup
				heading="Are you sure you want to delete"
				show={showDelete}
				handleAccept={handleDelete}
				handleClose={() => setShowDelete(false)}
				loading={deleteLoading}
			/>
			{isOwner && (
				<Link
					to={`/requests/edit/${data.id}`}
					className="card-body p-0 d-flex link"
				>
					<i className="feather-edit text-grey-500 me-3 font-lg"></i>
					<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
						Edit{' '}
						<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
							Now you can edit your posts
						</span>
					</h4>
				</Link>
			)}
			<div
				className="card-body p-0 d-flex mt-2 link"
				onClick={() => {
					if (navigator.share) {
						navigator
							.share({
								title: data.heading,
								url:
									window?.location?.host + `/request/${data.uuid}/${user?.id}`,
								text: data.body,
							})
							.catch((err) => Promise.reject(err))
					}
				}}
			>
				<i className="feather-share text-grey-500 me-3 font-lg"></i>
				<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
					Share{' '}
					<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
						Share this post with your friends
					</span>
				</h4>
			</div>
			{isOwner && (
				<>
					<hr />
					<div
						className="card-body p-0 d-flex mt-2 link"
						onClick={() => setShowDelete(true)}
					>
						<i className="feather-trash text-grey-500 me-3 font-lg"></i>
						<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
							Delete Post{' '}
							<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
								Delete your post from sheruta
							</span>
						</h4>
					</div>
				</>
			)}
		</div>
	)
}
