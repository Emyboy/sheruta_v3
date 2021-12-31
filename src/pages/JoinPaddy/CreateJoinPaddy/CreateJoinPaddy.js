import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../../components/Layout/Layout'

import EachPaddyUser from '../components/EachPaddyUser'

export default function CreateJoinPaddy() {
	const { accepted_suggestions } = useSelector((state) => state.alice)
	const { user } = useSelector((state) => state.auth)

	return (
		<Layout>
			<div>
				<div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
					<div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
						{/* <a href="default-settings.html" className="d-inline-block mt-2">
							<i className="ti-arrow-left font-sm text-white"></i>
						</a> */}
						<h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
							Create A Join Paddy Group
						</h4>
					</div>
					<div className="card-body p-lg-5 p-4 w-100 border-0">

						<div className="row">
							{accepted_suggestions
								.filter((x) => !x.users_permissions_user.deactivated)
								.map((val) => {
									let user = val.users_permissions_user
									return (
										<div className="col-sm-12 col-md-6">
											<EachPaddyUser user={user} />
										</div>
									) 
								})}
						</div>
					</div>
					<div className="card-footer p-3">
						<div className="d-flex justify-content-between">
							<a
								href="#"
								className="bg-danger text-center text-white font-xsss fw-600 p-3 w175 rounded-3 "
							>
								Previous
							</a>
							<a
								href="#"
								className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 "
							>
								Next
							</a>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
