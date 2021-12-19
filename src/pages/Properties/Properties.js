import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import EachProperty from './EachProperty';

export default function Properties() {

	const { recent_properties } = useSelector(state => state.properties);

	return (
		<Layout>
			<div className="row">
				<div className="">
					<div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
						<div className="card-body d-flex align-items-center p-0">
							<h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">
								Properties
							</h2>
							{/* <div className="search-form-2 ms-auto">
								<i className="ti-search font-xss"></i>
								<input
									type="text"
									className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
									placeholder="Search here."
								/>
							</div>
							<a
								href="#"
								className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3"
							>
								<i className="feather-filter font-xss text-grey-500"></i>
							</a> */}
						</div>
					</div>
					<div className="row ps-2 pe-2">
						{recent_properties.map((val, i) => {
							return (
								<div className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2" key={`property-${i}`}>
									<EachProperty data={val} />
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</Layout>
	)
}
