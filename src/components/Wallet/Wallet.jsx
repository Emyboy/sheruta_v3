import React from 'react'
import { useSelector } from 'react-redux'
import TransactionHistory from './TransactionHistory'

import { useState } from 'react'
import { useEffect } from 'react'
import Balance from './Balance'

export default function Wallet({ user }) {
	const { wallet_pending_balance, wallet } = useSelector(
		(state) => state?.wallet
	)
	const [showCount, setShowCount] = useState(false)

	useEffect(() => {
		if (wallet) {
			setTimeout(() => {
				setShowCount(true)
			}, 400)
		}
	}, [wallet])

	return (
		<div className="bg-grey" style={{ minHeight: '100vh' }}>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-8 col-md-9 col-sm-12 my-5">
						<Balance />
						<TransactionHistory />
					</div>
				</div>
			</div>
		</div>
	)
}
