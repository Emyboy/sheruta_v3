import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import Global from '../../Global'
import EachMatch from './EachMatch'

export default function Match() {
	const { matches } = useSelector((state) => state?.contact)
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
					{matches?.map((val) => {
						return <EachMatch key={`match-${val?.id}`} data={val} />
					})}
				</div>
				{matches?.length === 0 && <div style={{ height: '50vh' }} />}
			</div>
		</Layout>
	)
}
