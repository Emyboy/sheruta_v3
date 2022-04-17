import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import EachProperty from './EachProperty';
import { HiFilter } from 'react-icons/hi'

export default function Properties() {

	const { recent_properties } = useSelector(state => state.properties);

	return (
		<Layout>
			<div className="row">
				<div className="">
					<div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3 pb-2 rounded-xxl">
						<div className="card-body d-flex align-items-center p-0 justify-content-between pb-3">
							<h2 className="fw-700 mb-0 mt-0 font-md text-grey-700">
								Properties
							</h2>
							{/* <div className="search-form-2 ms-auto">
								<i className="ti-search font-xss"></i>
								<input
									type="text"
									className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
									placeholder="Search here."
								/>
							</div> */}
							<a
								href="#"
								className="pl-3 pr-3 ms-2 bg-greylight theme-dark-bg rounded-3"
							>
								<i className=" font-xss text-grey-600"><HiFilter /></i>{' '}
								<span className="text-grey-600 fw-700">Filter</span>
							</a>
						</div>
						<div className="d-block w-100 shadow-none mb-0 p-0 border-top-xs">
							<ul
								className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ml-0"
								id="pills-tab"
								role="tablist"
							>
								<li className="active list-inline-item me-5">
									<a
										className="fw-700 font-xssss text-grey-500 pt-3 pb-2 ls-1 d-inline-block active"
										href="#navtabs1"
										data-toggle="tab"
									>
										Grid View
									</a>
								</li>
								<li className="list-inline-item me-5">
									<a
										className="fw-700 font-xssss text-grey-500 pt-3 pb-2 ls-1 d-inline-block"
										href="#navtabs1"
										data-toggle="tab"
									>
										Map View
									</a>
								</li>
								<li className="list-inline-item me-5">
									<a
										className="fw-700 font-xssss text-grey-500 pt-3 pb-2 ls-1 d-inline-block"
										href="#navtabs1"
										data-toggle="tab"
									>
										Users View
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="row ps-2 pe-2">
						{recent_properties.map((val, i) => {
							return (
								<div
									className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2"
									key={`property-${i}`}
								>
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
