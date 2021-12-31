import React from 'react'
import Heading from '../../components/Heading/Heading'
import Layout from '../../components/Layout/Layout'

export default function JoinPaddy() {
	return (
		<Layout>
			<div>
				<div className="col-md-4 col-sm-2">
					<div
						className="shadow-sm border card-body link bg-transparent-card d-flex p-3 bg-greylight rounded align-items-center"
						style={{ marginBottom: 0 }}
					>
						<h1 className="fw-700 text-grey-900 font-xss mt-2 mb-0">
							{' '}
							Create Join Paddy
						</h1>
						<a
							href="#create"
							className="btn-round-sm bg-white text-grey-900 feather-plus font-xss ms-auto mt-2"
						></a>
					</div>
				</div>
			</div>
		</Layout>
	)
}
