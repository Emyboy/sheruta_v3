
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EachRequest from '../../../components/EachRequest/EachRequest'
import RequestService from '../../../services/RequestService'
import { VscEmptyWindow } from 'react-icons/vsc'
import Btn from '../../../components/Btn/Btn'
import { Dots } from 'react-activity'

export default function SelectRequest({ setData, data, done }) {
	const { user } = useSelector((state) => state.auth)
	const [loading, setLoading] = useState(false)
	const [feeds, setFeeds] = useState([])
	const [selected, setSelected] = useState([])

	useEffect(async () => {
		setLoading(true)
		try {
			const res = await RequestService.getUserRequestByUserId(user?.user?.id)
			setFeeds(res.data)
			if (res.data) {
				setLoading(false)
			}
		} catch (error) {
			setLoading(false)
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		setData({ ...data, property_requests: selected })
		if (selected.length === 0) {
			done(false)
		} else {
			done(true)
		}
	}, [selected]);

	useEffect(() => {
		setSelected(data.property_requests)
	},[])

	return (
		<div>
			<div className="text-center">
				<h1 className="fw-700">Append your request to the group</h1>
				<h5>
					This is so that our partners will know what kind of apartment you are
					looking for
				</h5>
				<div className="row justify-content-center">
					<div className="col-md-6 col-sm-12">
						<div className="card bg-warning">
							<p className="mb-0 fw-700">
								Select one request to append to the group
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="row justify-content-center mt-5 align-items-center">
				{!loading && feeds.length === 0 && (
					<div className="col-lg-6 col-sm-12 text-center mb-5 mt-5">
						<VscEmptyWindow size={40} />
						<h3 className="mb-4">No Request Found</h3>
						<Btn onClick={() => {}} text={'Create Request'} />
					</div>
				)}
				{loading && (
					<div className="col-lg-6 col-sm-12 text-center mb-5 mt-5">
						<Dots />
						<h3 className="mb-4">Loading..</h3>
					</div>
				)}
				{feeds.map((val, i) => {
					return (
						<div className="col-lg-6 col-sm-12">
							<div
								onClick={() => {
									if (selected.includes(val)) {
										setSelected([])
									} else {
										setSelected([val])
									}
								}}
								className={`link mb-3 ${
									selected.includes(val)
										? 'border border-success border-2 shadow rounded-xxl'
										: ''
								}`}
							>
								<EachRequest data={val} key={`post-${i}`} standalone />
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
