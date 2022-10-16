import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import EachMyContact from './EachMyContact'

export default function MyContacts() {
	const { contacts } = useSelector((state) => state.contact)

	return (
		<Layout>
			<div className="row ps-2 pe-1">
				{contacts?.map((val) => {
					return <EachMyContact key={`my-contact-${val?.id}`} val={val} />
				})}
			</div>
		</Layout>
	)
}
