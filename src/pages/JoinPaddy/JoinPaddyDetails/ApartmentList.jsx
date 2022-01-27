import React from 'react'
import EachJoinPaddyProperty from './components/EachJonPaddyProperty'

export default function ApartmentList({ list, heading }) {
	return (
		<>
			<div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
				<div className="card-body d-flex align-items-center p-0">
					<h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">
						{heading ? heading : 'Properties'}
					</h2>
				</div>
			</div>
			<div className="row">
				{list.map((val, i) => {
					return (
						<div className="col-6 col-md-4" key={`flat-${i}`}>
							{' '}
							<EachJoinPaddyProperty data={val} />
						</div>
					)
				})}
			</div>
		</>
	)
}

// import React from 'react'
// import { useSelector } from 'react-redux'
// import Layout from '../../../components/Layout/Layout'
// import EachProperty from '../../Properties/EachProperty'

// export default function Properties({ list, heading }) {

// 	return (
// 		<div className="row">
// 			<div>
// 				<div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
// 					<div className="card-body d-flex align-items-center p-0">
// 						<h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">
// 							{heading ? heading : 'Properties'}
// 						</h2>
// 					</div>
// 				</div>
// 				<div className="row ps-2 pe-2">
// 					{list.map((val, i) => {
// 						return (
// 							<div
// 								className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2"
// 								key={`property-${i}`}
// 							>
// 								<EachProperty data={val} />
// 							</div>
// 						)
// 					})}
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
