import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ballance from './balance.svg'
import pending from './pending.svg'
import CountUp from 'react-countup'

export default function Balance() {
    const { wallet_pending_balance, wallet } = useSelector(
			(state) => state?.wallet
		)
		const [showCount, setShowCount] = useState(false);

		useEffect(() => {
			if (wallet) {
				setTimeout(() => {
					setShowCount(true)
				}, 400)
			}
		}, [wallet])
  return (
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
						<CountUp
							start={showCount ? 1 : 0}
							end={parseInt(wallet?.total_balance)}
							duration={1.75}
							separator=" "
							// decimals={2}
							decimal=","
							prefix="₦"
							// onEnd={() => console.log('Ended! 👏')}
							// onStart={() => console.log('Started! 💨')}
						>
							{({ countUpRef, start }) => (
								<div>
									<span ref={countUpRef} />
								</div>
							)}
						</CountUp>
						{/* ₦{window.formattedPrice.format(wallet?.total_balance)} */}
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
						<h6 className="fw-400 text-muted mb-0">Pending Transaction</h6>
						<button className="fw-bold btn btn-sm text-danger">
							Stop Transaction
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
