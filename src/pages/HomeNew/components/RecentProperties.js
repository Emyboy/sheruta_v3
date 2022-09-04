import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import EachDemoProperty from '../../../components/New/EachDemoProperty'
import { Link } from 'react-router-dom'
import Global from '../../../Global'

export default function RecentProperties() {
	const [list, setList] = useState([])

	const getRecentProperties = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL + `/properties?&_limit=10`
			)
			setList(res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getRecentProperties()
	}, [getRecentProperties])

	if (list.length === 0) {
		return null
	}

	return (
		<div className="featured-area ptb-100">
			<div className="container">
				<div className="section-title">
					<h3>Recent Join Paddy Flats</h3>
					<p>
						Recently available flats for share. Team up to get one of these
						spaces.
					</p>
				</div>
				<div className="d-flex" style={{ overflowX: 'scroll' }}>
					{list?.map((val) => {
						return (
							<div
								className={`"col-sm-12 col-md-6 col-lg-4 ${
									Global.isMobile ? 'mr-0 pl-0' : 'mr-4'
								}`}
								key={`prop-${val?.id}`}
							>
								<EachDemoProperty data={val} />
							</div>
						)
					})}
				</div>
				<div className="view-featured-btn">
					<Link to="/flats" className="default-btn text-white">
						VIEW MORE FLATS
						{/* <span style="top: -46.0938px; left: 267.734px;"></span> */}
					</Link>
				</div>
			</div>
		</div>
	)
}
