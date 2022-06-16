import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import Layout from '../../components/Layout/Layout'
import EachInspection from './EachInspection'

export default function Inspection() {
	const { user } = useSelector((state) => state.auth)
	const [ownersGroup, setOwnersGroup] = useState([])
	const [getGroups, setGuestGroup] = useState([])
	const { inspections } = useSelector(state => state?.view);

	if(!user){
		return <Redirect to='/' />
	}

	return (
		<Layout>
			<div className="col-xl-12">
				<div class="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
					<div class="card-body d-flex align-items-center p-0">
						<h2 class="fw-700 mb-0 mt-0 font-md text-grey-600">Your Groups</h2>
					</div>
				</div>
				<div className="row ps-2 pe-1 mb-4">
					{inspections.filter(x => x?.owner?.id == user?.user?.id)?.map((val, i) => {
						return (
							<EachInspection key={`insp-${i}`} data={val} index={i + 100} />
						)
					})}
				</div>
				<div class="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
					<div class="card-body d-flex align-items-center p-0">
						<h2 class="fw-700 mb-0 mt-0 font-md text-grey-600">Other Groups</h2>
					</div>
				</div>
				<div className="row ps-2 pe-1">
					{inspections.filter(x => x?.owner?.id != user?.user?.id)?.map((val, i) => {
						return (
							<EachInspection key={`insp-${i}`} data={val} index={i + 110} />
						)
					})}
				</div>
			</div>
		</Layout>
	)
}
