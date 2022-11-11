import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router';
import Wallet from '../../components/Wallet/Wallet'

export default function WalletPage() {
    localStorage.setItem('after_login', window.location.pathname)
    const { user } = useSelector((state) => state.auth);

    if(!user){
        return <Redirect to='/login' />
    }

	return (
		<div>
			<Wallet user={user?.user} />
		</div>
	)
}
