import React from 'react'
import { IoMail, IoCallSharp } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import store from '../../redux/store/store'

export default function UserAction({ user, disable, alignment }) {
	const auth = useSelector((state) => state.auth)
	const { payment_plan } = useSelector((state) => state.view)
	const deactivated = user.deactivated

	const handleButtonClicks = () => {
		if (!payment_plan) {
			store.dispatch({
				type: 'SET_VIEW_STATE',
				payload: {
					showPaymentPopup: true,
				},
			})
		}
	}

	if (deactivated) {
		return null
	}

	return (
		<>
			{auth.user && auth.user.user.id === user.id ? null : (
				<div className={`d-flex justify-content-${alignment || 'center'}`}>
					<Link
						to={payment_plan ? `/messages/new/${user.id}` : '#'}
						onClick={handleButtonClicks}
						className='mr-3'
					>
						<button
							disable={disable}
							className="btn shadow bg-theme text-white rounded ml-2 mr-2"
						>
							<IoMail className="mr-2" />
							Message
						</button>
					</Link>{' '}
					<a href={payment_plan ? `tel:${user?.phone_number}`: `#call-error`} className='ml-3'>
						<button
							disabled={disable}
                            onClick={handleButtonClicks}
							className="btn shadow bg-theme text-white rounded mr-2"
						>
							<IoCallSharp className="mr-2" />
							Call Me
						</button>
					</a>
				</div>
			)}
		</>
	)
}
