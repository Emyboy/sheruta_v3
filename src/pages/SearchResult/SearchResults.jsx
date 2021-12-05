import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import EachSocialRequest from '../../components/Social/EachSocialRequest'

export default function SearchResults({ match }) {
	const { bedrooms, category, service } = match.params
	console.log({ bedrooms, category, service })
	const [list, setList] = useState([])

	useEffect(() => {
		axios(
			process.env.REACT_APP_API_URL +
				`/property-requests/search/${service}/${category}/${bedrooms || 0}`,
			{ method: 'POST' }
		)
			.then((res) => {
				console.log(res.data)
				setList(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<Layout>
			<div>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-8 col-sm-12">
							<div className="card rounded mb-4 border-0">
								<div className="card-body">
									<h1>Search results</h1>
								</div>
							</div>
							{list.map((val, i) => {
								return <EachSocialRequest key={`req-${i}`} data={val} />
							})}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
