import React, { useState } from 'react'
import { BsCalendarXFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import Layout from '../../components/Layout/Layout'
import EachInspection from './EachInspection'

const iconSize = 50
export default function Inspection() {
	const { user } = useSelector((state) => state.auth)
	const [ownersGroup, setOwnersGroup] = useState([])
	const [getGroups, setGuestGroup] = useState([])
	const { inspections } = useSelector((state) => state?.view)


	if (!user) {
		return <Redirect to="/" />
	}

	return (
		<Layout>
			<div className="col-xl-12">
				<div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
					<div className="card-body d-flex align-items-center p-0">
						<h2 className="fw-700 mb-0 mt-0 font-md text-grey-600">
							Your Groups
						</h2>
					</div>
				</div>
				<div className="row ps-2 pe-1 mb-4">
					{inspections?.length > 0 ? (
						inspections
							.filter((x) => x?.owner?.id == user?.user?.id)
							?.map((val, i) => {
								return (
									<EachInspection
										key={`insp-${i}`}
										data={val}
										index={i + 100}
									/>
								)
							})
					) : (
						<EmptyInspection />
					)}
				</div>
				<div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
					<div className="card-body d-flex align-items-center p-0">
						<h2 className="fw-700 mb-0 mt-0 font-md text-grey-600">
							Other Groups
						</h2>
					</div>
				</div>
				<div className="row ps-2 pe-1">
					{inspections?.length > 0 ? (
						inspections
							.filter((x) => x?.owner?.id != user?.user?.id)
							?.map((val, i) => {
								return (
									<EachInspection
										key={`insp-${i}`}
										data={val}
										index={i + 110}
									/>
								)
							})
					) : (
						<EmptyInspection />
					)}
				</div>
			</div>
		</Layout>
	)
}

export const EmptyInspection = () => {
	return (
		<div className="text-center mt-5 mb-5">
			<BsCalendarXFill size={iconSize} className="text-grey-600 mb-3" />
			<h2 className="text-grey-600">No Inspection Group</h2>
		</div>
	)
}
