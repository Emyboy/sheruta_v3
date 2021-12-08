import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import EachSocialRequest from '../../components/Social/EachSocialRequest';
import { Dots } from 'react-activity'

export default function SearchResults({ match }) {
	const { bedrooms, category, service } = match.params;
	console.log({ bedrooms, category, service })
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		axios(
			process.env.REACT_APP_API_URL +
			`/property-requests/search/${service}/${category}/${bedrooms || 0}`,
			{ method: 'POST' }
			)
			.then((res) => {
				console.log(res.data)
				setList(res.data)
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
			})
	}, [])

	return (
		<Layout>
			<div>
				<div className="container h-100">
					<div className="row justify-content-center">
						<div className="col-md-8 col-sm-12">
							<div className="card rounded mb-4 border-0 shadow-sm">
								<div className="card-body">
									<h1>Search results</h1>
								</div>
							</div>
							{loading ?
							(
								<div className="text-center pt-5 pb-5">
									<Dots />
								</div>
							):null}
							{ !loading && list.length > 0 ? list.map((val, i) => {
								return <EachSocialRequest key={`req-${i}`} data={val} />
							}): <div className='pt-5 pb-5 text-center'>
									<h2>No Results Found</h2>
									<h6>Try narrowing your search down to one thing</h6>
								</div>}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
