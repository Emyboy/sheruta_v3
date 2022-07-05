import { Modal, notification } from 'antd'
import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Global from '../../Global'
import { getOtherStuffs } from '../../redux/strapi_actions/view.action'
import Alice from '../../services/Alice'
import VerifiedBadge from '../VerifiedBadge/VerifiedBadge'
import PersonalInfo from '../../pages/Profile/PersonalInfo'

export default function EachUserListCard({ data }) {
	const { user } = useSelector((state) => state.auth)
	const { accepted_suggestions } = useSelector((state) => state.alice)
	const [loading, setLoading] = useState(false)
	const [showInfo, setShowInfo] = useState(false)
	const dispatch = useDispatch()

	const addToContact = async () => {
		setLoading(true)
		try {
			const res = await Alice.addUserToContact(data?.id)
			if (res.data) {
				dispatch(getOtherStuffs())
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
			notification.error({ message: 'Error added contact' })
			return Promise.reject(error)
		}
	}

	const removeContact = async () => {
		try {
			setLoading(true)
			const contact = accepted_suggestions?.filter(
				(x) => x?.users_permissions_user?.id === data?.id
			)
			const res = await Alice.removeUserFromContact(contact[0]?.id)
			if (res.data) {
				dispatch(getOtherStuffs())
				setLoading(false)
			}
		} catch (error) {
			notification.error({ message: 'Error removing contact' })
			setLoading(false)
			return Promise.reject(error)
		}
	}

	if (data?.deactivated || (user && data?.id === user?.user?.id)) {
		return null
	}

	return (
		<div className="item">
			<Modal
				visible={showInfo}
				footer={false}
				closable
				onCancel={() => setShowInfo(false)}
			>
				<PersonalInfo userData={data} />
			</Modal>
			<div className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-2 mt-3">
				<div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
					<figure
						className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1"
						style={{ height: '64px' }}
					>
						<VerifiedBadge
							without_text
							user={data}
							className="position-absolute"
						/>
						<LazyLoadImage
							src={data?.avatar_url}
							alt="image"
							className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
						/>
					</figure>
					<div className="clearfix"></div>
					<div onClick={() => setShowInfo(true)} className="link">
						<h4 className="fw-700 font-xssss mt-3 mb-1">
							{data?.first_name?.split(' ')[0]}{' '}
						</h4>
						<p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">
							{Global?.currency}
							{window.formattedPrice.format(data?.budget)}
						</p>
					</div>
					{user && (
						<>
							{accepted_suggestions.filter(
								(x) => x?.users_permissions_user?.id === data?.id
							).length > 0 ? (
								<a
									className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-danger font-xsssss fw-700 ls-lg text-white"
									onClick={removeContact}
								>
									{loading ? 'Loading...' : 'REMOVE'}
								</a>
							) : (
								<a
									className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
									onClick={addToContact}
								>
									{loading ? 'Loading...' : 'ADD'}
								</a>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}
