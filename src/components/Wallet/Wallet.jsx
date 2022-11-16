import React from 'react'
import { useSelector } from 'react-redux'
import ballance from './balance.svg'
import pending from './pending.svg'
import TransactionHistory from './TransactionHistory'

export default function Wallet({ user }) {
	const { wallet_pending_balance, wallet } = useSelector(
		(state) => state?.wallet
	)
	return (
		<div className="bg-grey" style={{ minHeight: '100vh' }}>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-8 col-md-9 col-sm-12 my-5">
						<div className="row">
							<div className="col-lg-6 col-sm-12">
								<div className="rounded-xxl card bg-accent shadow p-4 mb-2">
									<img
										src={ballance}
										alt="balance icon"
										style={{ width: '50px' }}
										className="mb-3"
									/>
									<h1 className="font-xxl mb-4 text-white">
										₦{window.formattedPrice.format(wallet?.total_balance)}
									</h1>
									<div className="d-flex justify-content-between align-items-center">
										<h6 className="mb-0 fw-400 text-muted">Total Balance</h6>
										<button className="fw-bold btn btn-sm text-theme">
											Withdraw Funds
										</button>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-sm-12">
								<div className="rounded-xxl card bg-white shadow-sm p-4 mb-2">
									<img
										src={pending}
										alt="balance icon"
										style={{ width: '50px' }}
										className="mb-3"
									/>
									<h1 className="font-xxl mb-4 text-accent">
										₦{window.formattedPrice.format(wallet_pending_balance)}
									</h1>
									<div className="d-flex justify-content-between align-items-center">
										<h6 className="fw-400 text-muted mb-0">
											Pending Transaction
										</h6>
										<button className="fw-bold btn btn-sm text-danger">
											Stop Transaction
										</button>
									</div>
								</div>
							</div>
						</div>
						<TransactionHistory />
					</div>
				</div>
			</div>
		</div>
	)
}
