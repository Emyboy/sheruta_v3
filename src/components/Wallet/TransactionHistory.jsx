import { Avatar } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function TransactionHistory() {
	const dispatch = useDispatch()
	return (
		<div className="my-5 ">
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h1 className="font-xl mb-0">Wallet history</h1>
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
			<div className="card rounded-xxl">
				<div className="card-body scroll-bar">
					<table className="table table-striped table-hover">
						<table className="table">
							{/* <thead>
								<tr>
									<th scope="col" className="fw-100">
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
								<EachWalletTransaction />
								<EachWalletTransaction />
								<EachWalletTransaction />
								<EachWalletTransaction />
								<EachWalletTransaction />
								<EachWalletTransaction />
								<EachWalletTransaction />
							</tbody>
						</table>
					</table>
				</div>
			</div>
		</div>
	)
}

const EachWalletTransaction = () => {
	return (
		<tr>
			<th scope="d-flex" style={{ minWidth: '220px' }}>
				<div className="d-flex align-items-center">
					<img
						src="https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.rsquare.w700.jpg"
						style={{ width: '46px', borderRadius: '50px' }}
					/>{' '}
					<h4 className="ml-2 mb-0 fw-500">From Chioma</h4>
				</div>
			</th>
			<td colspan="2" className="fw-500" style={{ minWidth: '160px' }}>
				3 minutes ago
			</td>
			<td colspan="2" className="fw-500" style={{ minWidth: '140px' }}>
				N200,000
			</td>
			<td
				className="text-warning fw-500 d-flex align-items-center"
				style={{ minWidth: '130px' }}
			>
				<span class="bg-warning m-0 btn-round-xss"></span>{' '}
				<span className="px-2">Pending</span>
			</td>
			<td className="fw-500" style={{ minWidth: '100px' }}>
				ID #454
			</td>
		</tr>
	)
}
