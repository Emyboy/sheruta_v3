import { Modal } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { BsFillTrashFill, BsPencilFill, BsPlusLg } from 'react-icons/bs'
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
					<AddBankInfo />
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
							<button type="button" className="btn bg-theme-light text-theme">
								<BsPencilFill />
							</button>
							<button type="button" className="btn text-red bg-danger-light">
								<BsFillTrashFill />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
