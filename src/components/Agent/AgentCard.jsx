import React from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Global from '../../Global'
import PropertiesService from '../../services/PropertiesServices'

export default function AgentCard({ val }) {
	const data = val.agent_profile
	const agent = val?.agent
	console.log('VAL --', val)
	const [propertyCount, setPropertyCount] = useState(0)

	const getPropertyCount = useCallback(async () => {
		try {
			const res = await PropertiesService.getPropertyViaQuery(
				`count/?agent=${agent?.id}`
			)
			setPropertyCount(res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getPropertyCount()
	}, [getPropertyCount])

	return (
		<div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 pb-4 pt-4">
			<div className="card-body d-block w-100 p-4 text-center">
				<figure className="avatar d-flex justify-content-center mb-0 position-relative z-index-1">
					<img
						src={data?.avatar_url}
						alt="image"
						className="float-right p-1 bg-white rounded-circle "
						width={'200'}
					/>
				</figure>
				<div className="clearfix"></div>
				<h4 className="fw-700 font-lg mt-3 mb-0">
					{data?.first_name} {data?.last_name}
				</h4>
				<p className="fw-500 font-xsss text-grey-500 mt-0 mb-3">
					{data?.email}
				</p>

				{val.message && (
					<div className="row justify-content-center">
						<div className='col-md-8'>
							<h5 className='fw-bold'>Agent Says 👇🏽</h5>
							<div className="pt-1 pb-1 pl-4 pr-4 alert alert-info rounded-xl ">
								{val?.message}
							</div>
						</div>
					</div>
				)}
				<ul className="d-flex align-items-center justify-content-center mt-1">
					<li className="m-2">
						<h4 className="fw-700 font-sm">
							{agent?.inspection_count}{' '}
							<span className="font-xsss fw-500 mt-1 text-grey-500 d-block">
								Inspections
							</span>
						</h4>
					</li>
					<li className="m-2">
						<h4 className="fw-700 font-sm">
							{propertyCount}{' '}
							<span className="font-xsss fw-500 mt-1 text-grey-500 d-block">
								Properties
							</span>
						</h4>
					</li>
					<li className="m-2">
						<h4 className="fw-700 font-sm">
							{Global.currency}{' '}
							{window.formattedPrice.format(agent?.inspection_fee)}{' '}
							<span className="font-xsss fw-500 mt-1 text-grey-500 d-block">
								Inspection Fee
							</span>
						</h4>
					</li>
				</ul>

				<a
					href={`tel:${data?.phone_number}`}
					className="btn bg-current text-white mt-5 p-4"
					style={{ borderRadius: '80px', height: '80px' }}
				>
					<i className="feather-phone font-xxl"></i>
				</a>
			</div>
		</div>
	)
}
