import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../components/Heading/Heading'
import Layout from '../../components/Layout/Layout'
import JoinPaddyService from '../../services/JoinPaddyService'
import EachPaddyCard from './components/EachPaddyCard'

export default function JoinPaddy() {
	const [list, setList] = useState([])

	const getAllJoinPaddy = useCallback(async () => {
		try {
			const res = await JoinPaddyService.getAllJoinPaddy()
			setList(res.data)
			console.log(res.data)
		} catch (error) {
			console.log(error)
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getAllJoinPaddy()
	}, [getAllJoinPaddy])

	return (
		<Layout>
			<div>
				<div className="col-md-4 col-sm-2">
					<Link to={`/join-paddy/create`}>
						<div
							className="shadow-sm border card-body link bg-transparent-card d-flex p-3 bg-greylight rounded align-items-center"
							style={{ marginBottom: 0 }}
						>
							<h1 className="fw-700 text-grey-900 font-xss mt-2 mb-0">
								{' '}
								Create Join Paddy
							</h1>
							<a
								href="#create"
								className="btn-round-sm bg-white text-grey-900 feather-plus font-xss ms-auto mt-2"
							></a>
						</div>
					</Link>
				</div>
				<div className="row mt-5">
					{list.map((val, i) => {
						return (
							<div className="col-lg-4 col-md-6 pe-2 ps-2" key={`item-${i}`}>
								<EachPaddyCard data={val} />
							</div>
						)
					})}
				</div>
			</div>
		</Layout>
	)
}
