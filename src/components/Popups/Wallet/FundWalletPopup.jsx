import { Modal, notification } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AmountInput from 'react-currency-input-field'
import { useState } from 'react'
import { Dots } from 'react-activity'
import { usePaystackPayment } from 'react-paystack'
import { useEffect } from 'react'
import success from './success.svg'
import UserService from '../../../services/UserService'
import WalletService from '../../../services/WalletService'
import { notifyEmy } from '../../../services/Sheruta'
import { getWallet } from '../../../redux/strapi_actions/wallet.actions'

export default function FundWalletPopup() {
	const { show_fund_wallet } = useSelector((state) => state?.wallet)
	const [step, setStep] = useState(0)
	const [amount, setAmount] = useState(0)
	const [password, setPassword] = useState(null)
	const dispatch = useDispatch()

	if (!show_fund_wallet) {
		return null
	}
	return (
		<Modal
			visible={true}
			footer={null}
			onCancel={() => {
				dispatch({
					type: 'SET_WALLET_STATE',
					payload: {
						show_fund_wallet: false,
					},
				})
			}}
		>
			<div className="my-4">
				{step < 2 && <h1 className="mb-4">Fund Your Wallet</h1>}
				{
					[
						<WalletAmountInput
							done={(e) => {
								setAmount(e)
								setStep(step + 1)
							}}
						/>,
						<WalletPasswordInput
							done={(e) => {
								setPassword(e)
								setStep(step + 1)
							}}
						/>,
						<WalletFunLoading
							amount={amount}
							password={password}
							onSuccess={(e) => {
								dispatch({
									type: 'SET_WALLET_STATE',
									payload: {
										show_fund_wallet: false,
									},
								})
								setStep(0)
								dispatch(getWallet())
								notification.success({ message: 'Wallet funded successfully' })
							}}
						/>,
					][step]
				}
			</div>
		</Modal>
	)
}

const WalletAmountInput = ({ done }) => {
	const [amount, setAmount] = useState(0)
	return (
		<>
			<form>
				<label for="exampleFormControlInput1" className="form-label">
					Amount
				</label>
				<div className="input-group mb-3">
					<span className="input-group-text font-xs fw-bold" id="basic-addon1 ">
						₦
					</span>
					<AmountInput
						required
						autoFocus
						className="form-control font-xs fw-bold"
						decimalsLimit={2}
						onValueChange={(value) => setAmount(value)}
					/>
				</div>
			</form>
			<button
				disabled={!amount || amount < 10}
				className="btn btn-lg bg-accent text-white my-3 w-100"
				onClick={() => done(amount)}
			>
				Next
			</button>
		</>
	)
}

const WalletPasswordInput = ({ done }) => {
	const [password, setPassword] = useState(0)
	const [inCorrect, setInCorrect] = useState(false)
	const [loading, setLoading] = useState(false)

	const confirmPassword = async () => {
		try {
			setLoading(true)
			const res = await UserService.confirmPassword(password)
			if (res.data.isPassword) {
				done(password)
			} else {
				setInCorrect(true)
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
			return Promise.reject(error)
		}
	}

	return (
		<>
			<form>
				<label for="exampleFormControlInput1" className="form-label">
					Enter Password{' '}
					{inCorrect && <span className="text-danger">Incorrect Password</span>}
				</label>
				<div className="input-group mb-3">
					<input
						required
						type="password"
						autoFocus
						className="form-control font-xs fw-bold"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
			</form>
			<button
				disabled={!password || loading}
				className="btn btn-lg text-center bg-accent text-white my-3 w-100"
				onClick={confirmPassword}
			>
				Next
			</button>
		</>
	)
}

const WalletFunLoading = ({ amount, password, onCancel, onSuccess }) => {
	const { user } = useSelector((state) => state.auth)
	const { wallet } = useSelector((state) => state.wallet)
	const [pageState, setPageState] = useState('none')
	const [reference, setReference] = useState(null)
	const config = {
		reference: new Date().getTime().toString(),
		email: user?.user?.email,
		amount: parseInt(String(amount) + '00'),
		publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
	}

	const sendMoneyToAuth = async (ref) => {
		if (ref && password && wallet?.id) {
			setPageState('loading')
			try {
				const newTrans = await WalletService.saveWalletTransaction({
					password,
					reference: ref,
					wallet_id: wallet?.id,
					amount,
					from: user?.user?.id,
					to: user?.user?.id,
				})
				if (newTrans) {
					setPageState('success')
					setTimeout(() => {
						setPageState('none')
						if (onSuccess) {
							onSuccess(newTrans)
						}
					}, 2000)
				}
			} catch (error) {
				notifyEmy({
					heading: `⚠️ Error saving wallet trans to DB`,
					log: { error, ref, wallet_id: wallet?.id, amount },
				})
				return Promise.reject(error)
			}
		} else {
			notifyEmy({
				heading: `⚠️ Error saving wallet trans to DB`,
				log: { ref, password, wallet_id: wallet?.id },
			})
			notification.error({ message: 'Error, Please contact Sheruta' })
		}
	}

	useEffect(() => {
		if (reference) {
		}
	}, [reference])

	const initializePayment = usePaystackPayment(config)

	const _onSuccess = (reference) => {
		// Implementation for whatever you want to do with reference and after success call.
		console.log(reference)

		sendMoneyToAuth(reference)
	}

	// you can call this function anything
	const onClose = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log('closed')
	}

	const PaystackHookExample = () => {
		return (
			<div>
				<button
					className="btn btn-lg bg-accent text-white mt-4 px-5"
					onClick={() => {
						initializePayment(_onSuccess, onClose)
						console.log(config)
					}}
				>
					Pay Now
				</button>
			</div>
		)
	}

	return (
		<div className="my-5">
			<div className="text-center">
				{pageState === 'loading' && <Dots />}

				{pageState === 'none' && (
					<div>
						<h6>Amount to be deposited</h6>
						<h1>₦ {window.formattedPrice.format(amount)}</h1>
						<PaystackHookExample />
					</div>
				)}
			</div>
			{pageState === 'success' && (
				<div className="animate__animated  animate__heartBeat">
					<div className="text-center">
						<img src={success} alt="success" style={{ width: '80px' }} />
					</div>
				</div>
			)}
		</div>
	)
}
