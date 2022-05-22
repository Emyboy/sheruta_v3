import React from 'react'
import { Avatar } from 'antd'
import { BsTelephoneFill } from 'react-icons/bs'

export default function PropertyDetailsRight({ data }) {

	return (
		<div className="card w-100 border-0 mt-4 mb-4 p-lg-4 p-3 shadow-xss position-relative rounded-3 bg-white">
			<h4 className="text-grey-500 fw-600">Agent</h4>
			<div className="section full mb-4 p-4 pb-0 theme-dark-bg theme-light-bg rounded-3">
				<div className="row">
					<div className="col-12 text-center">
						<h2 className="display2-size lh-1 m-0 text-grey-900 fw-700">
							<Avatar
								size={100}
								src={data?.agent_profile?.avatar_url}
								alt="agent"
							/>
						</h2>
					</div>
					<div className="col-12 text-center mt-3">
						<h4 className="font-xssss fw-700 text-grey-500 fw-600 mt-2">
							{data?.agent_profile?.first_name}
						</h4>
						<h4 className="font-xsss fw-700 text-grey-700 fw-600 mt-2">
							{data?.agent?.name}
						</h4>
						<button
							className="btn border border-success mt-3 shadow-md"
							style={{ borderRadius: '50%', height: '50px' }}
						>
							<BsTelephoneFill className="text-current" size={25} />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
