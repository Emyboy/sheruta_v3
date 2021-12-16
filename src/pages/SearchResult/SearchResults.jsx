import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import EachSocialRequest from '../../components/Social/EachSocialRequest'
import { Dots } from 'react-activity'
import { useSelector } from 'react-redux'

export default function SearchResults({ match }) {
	const { bedrooms, category, service } = match.params
	console.log({ bedrooms, category, service })
	const [list, setList] = useState([])
	const [loading, setLoading] = useState(true)
	const { user } = useSelector((state) => state.auth)

	useEffect(() => {
		setLoading(true)
		axios(
			process.env.REACT_APP_API_URL +
				`/property-requests/search/${service}/${category}/${bedrooms || 0}`,
			{ method: 'POST' }
		)
			.then((res) => {
				console.log(res.data)
				setList(res.data)
				setLoading(false)
			})
			.catch((err) => {
				setLoading(false)
			})
	}, [])

	return (
		<Layout>
			<div style={{ paddingTop: !user ? '14vh' : '' }}>
				<div className="container h-100">
					<div className="row justify-content-center">
						<div className="col-md-9 col-sm-12">
							<div className="card rounded mb-4 border-0 shadow-sm">
								<div className="card-body">
									<h1>Search results</h1>
								</div>
							</div>
							{loading ? (
								<div className="text-center pt-5 pb-5">
									<Dots />
								</div>
							) : null}
							{!loading &&
								list.length > 0 &&
								list.map((val, i) => {
									return <EachSocialRequest key={`req-${i}`} data={val} />
								})}
							{!loading && list.length === 0 && (
								<div className="pt-5 pb-5 text-center">
									<h2>
										<b>No Results Found</b>
									</h2>
									<h6>Try narrowing your search down to one thing</h6>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
