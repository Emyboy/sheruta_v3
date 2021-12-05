import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import EachSocialRequest from '../../components/Social/EachSocialRequest'

export default function SearchResults({ match }) {
	const { bedrooms, category, service } = match.params
	console.log({ bedrooms, category, service });
	const [list, setList] = useState([])

	useEffect(() => {
		axios(
			process.env.REACT_APP_API_URL +
				`/property-requests/search/${service}/${category}/${bedrooms || 0}`,
			{ method: 'POST' }
		)
			.then(res => {
				console.log(res.data);
				setList(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	return (
		<Layout>
			<div>
				<h1>Search results</h1>
				<div className='container'>
					<div className='row justify-content-center'>
						{
							list.map((val,i) => {
								return <EachSocialRequest key={`req-${i}`} data={val} />
							})
						}
					</div>
				</div>
			</div>
		</Layout>
	)
}
