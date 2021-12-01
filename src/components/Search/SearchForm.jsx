import React from 'react'
import { useSelector } from 'react-redux'

export default function SearchForm() {
	const { services, categories } = useSelector(state => state.view);
	return (
		<div className="col-lg-12 mt-4">
			<div className="card w-100 p-4 border-0 bg-lightblue">
				<div className="row">
					<div className="col-lg-3">
						<div className="form-group mb-0">
							<label
								htmlFor="Search"
								className="fw-600 text-grey-900 font-xsss"
							>
								Bedrooms
							</label>
						</div>
						<ul className="list-inline mt-2">
							{[1, 2, 3, 4].map((val, i) => {
								return (
									<li className="list-inline-item me-0 mb-2" key={`${i}-bed`}>
										<a
											href="#"
											className="btn-round-sm bg-white fw-600 font-xssss text-grey-800 "
										>
											{val}
										</a>
									</li>
								)
							})}
						</ul>
					</div>
					<div className="col-lg-3">
						<div className="form-group mb-0 mt-3">
							<label
								htmlFor="Search"
								className="fw-600 text-grey-900 font-xsss"
							>
								Service
							</label>
						</div>
						<ul className="list-inline mt-2">
							{services.map((service, i) => {
								return (
									<li
										className="m-0 list-inline-item mb-2"
										key={`service-${i}`}
									>
										<a
											href="#"
											className="fw-600 font-xssss text-grey-700 pt-1 pb-1 ps-3 pe-3 d-inline-block rounded-xl bg-white"
										>
											{service.name}
										</a>
									</li>
								)
							})}
						</ul>
					</div>
					<div className="col-lg-3">
						<div className="form-group mb-0 mt-3">
							<label
								htmlFor="Search"
								className="fw-600 text-grey-900 font-xsss"
							>
								Type
							</label>
						</div>
						<ul className="list-inline mt-2">
							{categories.map((service, i) => {
								return (
									<li
										className="m-0 list-inline-item mb-2"
										key={`service-${i}`}
									>
										<a
											href="#"
											className="fw-600 font-xssss text-grey-700 pt-1 pb-1 ps-3 pe-3 d-inline-block rounded-xl bg-white"
										>
											{service.name}
										</a>
									</li>
								)
							})}
						</ul>
						<button
							class="mt-4 p-0 btn p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current  fw-700 ls-lg text-white w-50"
						>
							Search
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
