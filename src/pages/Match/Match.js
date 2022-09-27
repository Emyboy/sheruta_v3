import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import Global from '../../Global'
import { findPerfectMatch } from '../../redux/strapi_actions/contact.actions'
import EachMatch from './EachMatch'

export default function Match() {
	const { matches } = useSelector((state) => state?.contact)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(findPerfectMatch())
	}, [dispatch])

	return (
		<Layout full_screen>
			<div
				className="bg-accent"
				style={{
					paddingTop: Global.isMobile ? '13vh' : '10vh',
					paddingBottom: '20vh',
				}}
			>
				<div className="section-title">
					<h3 className="text-white">99% Match</h3>
					<p className="text-grey-500">These are people you match with 99%</p>
				</div>
				<div className="d-flex mt-3 scroll-bar">
					{matches
						?.sort((a, b) => new Date(b?.updated_at) - new Date(a?.updated_at))
						.map((val) => {
							return (
								<EachMatch
									key={`match-${val?.id}`}
									data={val}
									done={() => {
										dispatch(findPerfectMatch())
									}}
								/>
							)
						})}
				</div>
				{matches?.length === 0 && <div style={{ height: '80vh' }} />}
			</div>
		</Layout>
	)
}


const NoMatches = () => {
	return <div style={{ padding: '30vh 0px'}}>

	</div>
}
