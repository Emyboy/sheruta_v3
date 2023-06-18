import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import Wallet from '../../components/Wallet/Wallet'
import { Dots } from 'react-activity'
import { useEffect } from 'react'
import { getWallet } from '../../redux/strapi_actions/wallet.actions'

export default function WalletPage() {
	localStorage.setItem('after_login', window.location.pathname)
	const { user } = useSelector((state) => state.auth)
	const { wallet, wallet_loading } = useSelector((state) => state?.wallet)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!wallet) {
			dispatch(getWallet())
		}
	}, [wallet])

	useEffect(() => {
		dispatch(getWallet())
	},[])

	if (!user) {
		return <Redirect to="/login" />
	}

	if (!wallet || wallet_loading) {
		return (
			<div style={{ padding: `20vh 0px` }} className="text-center">
				<Dots />
			</div>
		)
	}

	return (
		<div>
			<Wallet user={user?.user} />
		</div>
	)
}
