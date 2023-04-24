import { Modal } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { IoMdTrash } from 'react-icons/io'
import { useSelector } from 'react-redux'
import AddBankInfo from './AddBankInfo'

export default function BankingInformation() {
	const [bankList, setBankList] = useState([])
	const [pageState, setPageState] = useState('none')
	const { user } = useSelector((state) => state.auth)
	const [showAdd, setShowAdd] = useState(false)

	const getBankInfos = async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL + `/bank-infos/?owner=${user?.user?.id}`,
				{
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			setBankList(res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}

	useEffect(() => {
		getBankInfos()
	}, [])

	return (
		<div>
			{showAdd && (
				<Modal visible={true} closable={false} footer={null}>
					<AddBankInfo
						done={() => {
							setShowAdd(false)
							getBankInfos()
						}}
					/>
				</Modal>
			)}
			<div className="my-4 text-right">
				<button
					className="bg-accent text-white fw-600 btn"
					onClick={() => setShowAdd(true)}
				>
					Add More <BsPlusLg size={15} />
				</button>
			</div>
			{bankList.map((val) => {
				return <EachAuthBank val={val} key={`bank--${val?.id}`} />
			})}
		</div>
	)
}

const EachAuthBank = ({ val }) => {
	const removeBankingDetails = async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL + `/bank-infos/${val?.id}`,
				{
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
					method: 'DELETE'
				}
			)
			console.log('REMOVED --', res.data)
		} catch (error) {
			console.log(`ERROR --`, error)
			return Promise.reject(error)
		}
	}

	return (
		<div className="card mb-4 shadow-sm">
			<div className="card-body">
				<div className="row justify-content-between">
					<div className="col-lg-8">
						<h5 className="fw-bold">
							{val?.bank_name} - {val?.account_name}
						</h5>
						<h6>
							<span className="text-muted">Account number: </span>
							{val?.account_number}
						</h6>
					</div>
					<div className="col-lg-4 text-right">
						<div className="btn-group" role="group" aria-label="Basic example">
							{/* <button type="button" className="btn bg-theme-light text-theme">
								<BsPencilFill />
							</button> */}
							<button
								type="button"
								className="btn text-red "
								onClick={removeBankingDetails}
							>
								<IoMdTrash size={30} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
