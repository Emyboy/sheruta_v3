import React from 'react'
import { connect, useSelector } from 'react-redux'
import { Modal } from 'antd'
import Btn from '../Btn/Btn'
import store from '../../redux/store/store'
import { Link } from 'react-router-dom'
import Global from '../../Global'

const PaymentPopup = (props) => {
	const { view } = props
	const { app_details, feed, personal_info } = useSelector(
		(state) => state.view
	)
	const { user } = useSelector((state) => state.auth)

	if (feed?.length === 0 && !app_details && !personal_info && !user) {
		return null
	}

	return (
		<Modal visible={view.showPaymentPopup} footer={null} closable={false}>
			<div className="pt-4">
				<div className="text-center">
					<i className="ti-crown display-3 text-warning"></i>
					<h1>
						<b className='font-xl'>Premium Access</b>
					</h1>
				</div>
				<hr className="text-muted" />
				<label className='font-xs'>
					<b>Why you should subscribe.</b>
				</label>
				<ul className="pricing-features">
					<li className={'font-xs'}>
						<i className="bx bx-check"></i> Share contact information
					</li>
					<li className={'font-xs'}>
						<i className="bx bx-check"></i> Call flatmates directly
					</li>
					{/* <li className={'font-xs'}>
						<i className="bx bx-check"></i> Post room request
					</li> */}

					<li className={'font-xs'}>
						<i className="bx bx-check"></i> View people's social media
					</li>

					<li className={'font-xs'}>
						<i className="bx bx-check"></i> Access to flatmate matching
					</li>
					<li className={'font-xs'}>
						<i className="bx bx-check"></i> Boost your room request to the top
					</li>

					{/* <li className={'font-xs'}>
						<i className="bx bx-check"></i> Message multiple users at once.
					</li> */}
					{/* <li className={'font-xs'}>
						<i className="bx bx-check"></i> And much more...
					</li> */}
				</ul>
				<br />
				<span className="text-danger">
					<b>NOTE: </b>
				</span>
				<span>
					If this is a mistake, don't fail to contact us or try refreshing this
					page.
				</span>
				<hr className="text-muted" />
				<div className="text-center">
					<Link to="/pricing">
						<Btn
							text="Subscribe Now"
							className="btn-sm"
							onClick={() => {
								localStorage.setItem('after_payment', window.location.pathname)
								store.dispatch({
									type: 'SET_VIEW_STATE',
									payload: {
										showPaymentPopup: false,
									},
								})
							}}
						/>
					</Link>
					<br />

					<button
						onClick={() => {
							store.dispatch({
								type: 'SET_VIEW_STATE',
								payload: {
									showPaymentPopup: false,
								},
							})
						}}
						className="btn text-danger mt-4"
					>
						Close
					</button>
				</div>
			</div>
		</Modal>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	view: state.view,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPopup)
