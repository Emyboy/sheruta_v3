import { Avatar } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { IoWallet } from 'react-icons/io5'
import { getWalletHistory } from '../../redux/strapi_actions/wallet.actions'
import { useLayoutEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

export default function TransactionHistory() {
	const dispatch = useDispatch()
	const { wallet_history, wallet } = useSelector((state) => state?.wallet)

	useLayoutEffect(() => {
		;(async () => {
			await dispatch(getWalletHistory())
		})()
	}, [wallet])

	return (
		<div className="my-5 ">
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h1 className="font-xl mb-0">History</h1>
				<button
					onClick={() =>
						dispatch({
							type: 'SET_WALLET_STATE',
							payload: {
								show_fund_wallet: true,
							},
						})
					}
					className="btn bg-accent text-white fw-100"
				>
					Fund Wallet
				</button>
			</div>
			<div className="card rounded-xxl" style={{ minHeight: '40vh' }}>
				<div className="card-body scroll-bar">
					{wallet_history?.length > 0 ? (
						<table className="table table-striped table-hover">
							<table className="table">
								{/* <thead>
								<tr>
									<th scope="col" className="fw-100">yarn start
										Sender
									</th>
									<th scope="col" className="fw-100">
										Date
									</th>
									<th scope="col" className="fw-100">
										Amount
									</th>
									<th scope="col" className="fw-100">
										Status
									</th>
									<th scope="col" className="fw-100">
										Trans ID
									</th>
								</tr>
							</thead> */}
								<tbody>
									{wallet_history
										?.sort(
											(a, b) => new Date(b.created_at) - new Date(a.created_at)
										)
										?.map((val, i) => {
											return (
												<EachWalletTransaction val={val} key={`history-${i}`} />
											)
										})}
								</tbody>
							</table>
						</table>
					) : (
						<div
							style={{ minHeight: `40vh` }}
							className="d-flex align-items-center justify-content-center"
						>
							<div className="text-center">
								<IoWallet className="text-warning" size={50} />
								<h5 className="mt-4">
									There are no transactions yet, <br />{' '}
									<span className="fw-bold text-theme">Fund your Wallet</span>{' '}
									to get started.
								</h5>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

const EachWalletTransaction = ({ val }) => {
	// console.log(val)
	const { user } = useSelector((state) => state.auth)
	const _user = user?.user

	const renderStatus = (status) => {
		switch (status) {
			case 'success':
				return 'theme'
			case 'canceled':
				return 'danger fw-600'
			case 'pending':
				return 'warning'
			case 'invalid':
				return 'danger'
			default:
				return 'danger'
		}
	}

	return (
		<tr>
			<th scope="d-flex" style={{ minWidth: '220px' }}>
				<Link to={`/user/${val?.from?.username}`} className="d-flex">
					<img
						src={val?.from?.avatar_url}
						style={{ width: '46px', borderRadius: '50px' }}
					/>{' '}
					<h4 className="ml-2 mt-1 fw-500">
						From {val?.from?.id == _user?.id ? 'You' : val?.from?.first_name}
					</h4>
				</Link>
			</th>
			<td colspan="2" className="fw-500" style={{ minWidth: '160px' }}>
				{moment(val?.created_at).fromNow().slice(0, 14) + '..'}
			</td>
			<td colspan="2" className="fw-500" style={{ minWidth: '140px' }}>
				₦{window.formattedPrice.format(val?.amount)}
			</td>
			<td
				className={`text-${renderStatus(
					val?.status
				)} fw-500 d-flex align-items-center`}
				style={{ minWidth: '130px' }}
			>
				<span
					class={`bg-${renderStatus(val?.status)} m-0 btn-round-xss`}
				></span>{' '}
				<span className={`px-2 text-capitalize`}>{val?.status}</span>
			</td>
			<td className="fw-500" style={{ minWidth: '100px' }}>
				ID #{val?.id}
			</td>
		</tr>
	)
}
