import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Dots } from 'react-activity'
import { useSelector } from 'react-redux'
import Select from 'react-select'

export default function AddBankInfo({ bank_info, onCancel, done }) {
	const [bankList, setBankList] = useState([])
	const [accountNumber, setAccountNumber] = useState(null)
	const [selectedBank, setSelectedBank] = useState(null)
	const [accountDetails, setAccountDetails] = useState(null)
	const [verifyLoading, setVerifyLoading] = useState(false)
	const [error, setError] = useState(false)
	const { user } = useSelector((state) => state.auth)

	console.log({ selectedBank, accountDetails })

	const getBankList = async (currentCount = 0) => {
		let count = currentCount
		if (count < 5) {
			try {
				const res = await axios(
					'https://api.paystack.co/bank?currency=NGN&type=nuban'
				)
				setBankList(res.data.data)
			} catch (error) {
				setTimeout(() => {
					getBankList(count + 1)
				}, 4000)
				return Promise.reject(error)
			}
		}
	}

	const verifyAccountNumber = async () => {
		try {
			if (!accountNumber) {
				return null
			}
			setVerifyLoading(true)
			const res = await axios(
				process.env.REACT_APP_API_URL + `/wallet-transactions/verify/bank`,
				{
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
					data: {
						account_number: accountNumber,
						bank_code: selectedBank?.code,
					},
					method: 'POST',
				}
			)
			console.log('ACCOUNT DETAILS', res.data)
			setAccountDetails(res.data)
			setVerifyLoading(false)
			setError(false)
		} catch (error) {
			setVerifyLoading(false)
			setError(true)
			return Promise.reject(error)
		}
	}

	const saveBankingDetails = async (e) => {
		e.preventDefault()
		try {
			const res = await axios(process.env.REACT_APP_API_URL + `/bank-infos`, {
				method: 'POST',
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
				data: {
					owner: user?.user?.id,
					bank_name: selectedBank?.name,
					country: selectedBank?.country,
					bank_slug: selectedBank?.slug,
					bank_code: selectedBank?.code,
					bank_type: 'nuban',
					bank_id: String(selectedBank?.id),
					account_name: accountDetails?.data?.account_name,
					account_number: String(accountDetails?.data?.account_number),
				},
			})
			if(done){
				done(res.data)
			}
		} catch (error) {
			return Promise.reject(error)
		}
	}

	useEffect(() => {
		getBankList()
	}, [])

	useEffect(() => {
		if (selectedBank?.code && accountNumber) {
			verifyAccountNumber()
		}
	}, [selectedBank])

	useEffect(() => {
		if (accountNumber?.length > 9) {
			verifyAccountNumber()
		} else {
			setAccountDetails(null)
		}
	}, [accountNumber])

	return (
		<div className="my-4">
			{bankList.length === 0 ? (
				<div className="text-center my-5">
					<Dots />
					<h4 className="mt-3">Just a moment</h4>
				</div>
			) : (
				<>
					<h3 className="mb-4">Add Banking Info</h3>
					<form onSubmit={saveBankingDetails}>
						<div className="form-group">
							<label for="exampleInputEmail1">Select Bank</label>
							<Select
								options={bankList.map((val) => ({
									value: val,
									label: val?.name,
								}))}
								placeholder={selectedBank ? selectedBank?.name : 'Select Bank'}
								onChange={(e) => setSelectedBank(e.value)}
							/>
						</div>
						<div className="form-group">
							<label for="account-number">Account Number </label>
							{process.env.NODE_ENV !== 'production' && (
								<small> 0469241573</small>
							)}
							<div className="input-group mb-3">
								<input
									type="number"
									disabled={!selectedBank || verifyLoading}
									className={`form-control ${
										error && !verifyLoading
											? 'border-danger animate__headShake animate__animated'
											: `border-success`
									}`}
									id="account-number"
									placeholder="Bank Account Number"
									onChange={(e) => setAccountNumber(e.target.value)}
								/>
								{verifyLoading && accountNumber?.length > 9 && (
									<div className="input-group-append">
										<span
											className="text-theme input-group-text"
											id="basic-addon2"
										>
											<Dots />
										</span>
									</div>
								)}
							</div>
							{!error && (
								<small id="emailHelp" className="form-text text-black fw-bold">
									{accountDetails?.data?.account_name || '_'}
								</small>
							)}
						</div>
						<div>
							<div className="row m-0 justify-content-between w-100">
								<div className="p-0 col-lg-4 col-sm-12">
									<button
										type="button"
										className="w-100 px-5 mt-3 btn bg-white fw-500 text-danger"
									>
										Cancel
									</button>
								</div>
								<div className="p-0 col-lg-4 col-sm-12">
									<button
										onClick={onCancel}
										type="submit"
										disabled={!accountDetails && accountNumber?.length > 9}
										className="w-100 px-5 mt-3 btn bg-accent fw-500 text-white"
									>
										Submit
									</button>
								</div>
							</div>
						</div>
					</form>
				</>
			)}
		</div>
	)
}
