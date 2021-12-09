import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserPaymentPlan } from '../../redux/strapi_actions/view.action'
import { Dots } from 'react-activity'

export default function PaymentAlert({ message, className }) {
	const dispatch = useDispatch()
	const { payment_plan_loading } = useSelector((state) => state.view)
	return (
		<div
			className={`alert alert-danger text-center ${className ? className : ''}`}
		>
			{payment_plan_loading ? (
				<div className="mt-5 mb-5">
					<Dots />
				</div>
			) : (
				<>
					<j4>
						<b>No or invalid subscription</b>
					</j4>
					<p>{message}</p>
					<Link to="/pricing">
						<button className="btn btn-sm btn-danger">Subscribe</button>
					</Link>
					<br />
					<button
						className="mt-3 btn btn-sm text-danger"
						onClick={() => dispatch(getUserPaymentPlan())}
					>
						Reload
					</button>
				</>
			)}
		</div>
	)
}
