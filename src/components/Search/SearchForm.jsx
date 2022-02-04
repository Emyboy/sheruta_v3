import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import AnalyticsService from '../../services/Analytics'
import { getAllViewOptions} from '../../redux/strapi_actions/view.action'

export default function SearchForm() {
	const dispatch = useDispatch();
	const { services, categories } = useSelector((state) => state.view)
	const [bedrooms, setBedrooms] = useState(null)
	const [service, setService] = useState(null)
	const [category, setCategory] = useState(null)
	const [showButton, setShowButton] = useState(false)

	useEffect(() => {
		if (bedrooms || category || service) {
			setShowButton(true)
		} else {
			setShowButton(false)
		}
	}, [bedrooms, category, service]);

	useEffect(() => {
		dispatch(getAllViewOptions())
	},[])

	const recordSearch = () => {
		AnalyticsService.create({
			type: 'search',
		})
	}


	return (
		<div className="col-lg-12 mt-4 h-100">
			<div className="card w-100 p-4 border-0 bg-lightblue rounded-xxl shadow-sm">
				<h5 className='mb-5 fw-700 text-muted'>Select what you are looking and hit search</h5>
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
									<li
										className="pl-0 list-inline-item me-0 mb-2"
										key={`${i}-bed`}
									>
										<a
											href="#"
											onClick={() => setBedrooms(val)}
											className={`${
												bedrooms === val && 'border border-success shadow'
											} btn-round-sm bg-white fw-600 font-xssss text-grey-800 `}
										>
											{val}
										</a>
									</li>
								)
							})}
						</ul>
					</div>
					<div className="col-lg-4">
						<div className="form-group mb-0 mt-0">
							<label
								htmlFor="Search"
								className="fw-600 text-grey-900 font-xsss"
							>
								Service
							</label>
						</div>
						<ul className="list-inline mt-2 ">
							{services.map((val, i) => {
								return (
									<li
										className="pl-0 m-0 list-inline-item mb-2"
										key={`service-${i}`}
									>
										<a
											href="#"
											onClick={() => setService(val.id)}
											className={`${
												service === val.id && 'border border-success shadow'
											} fw-600 font-xssss text-grey-700 pt-1 pb-1 ps-3 pe-3 d-inline-block rounded-xl bg-white`}
										>
											{val.name}
										</a>
									</li>
								)
							})}
						</ul>
					</div>
					<div className="col-lg-4">
						<div className="form-group mb-0 mt-0">
							<label
								htmlFor="Search"
								className="fw-600 text-grey-900 font-xsss"
							>
								Type
							</label>
						</div>
						<ul className="list-inline mt-2">
							{categories.map((type, i) => {
								return (
									<li
										className="pl-0 m-0 list-inline-item mb-2"
										key={`service-${i}`}
									>
										<a
											href="#"
											onClick={() => setCategory(type.id)}
											className={`${
												category === type.id && 'border border-success shadow'
											} fw-600 font-xssss text-grey-700 pt-1 pb-1 ps-3 pe-3 d-inline-block rounded-xl bg-white`}
										>
											{type.name}
										</a>
									</li>
								)
							})}
						</ul>
					</div>
					<div className="col-md-4 mt-4 col-sm-12">
						{showButton && (
							<Link
								to={`/search/results/${service}/${category}/${bedrooms}`}
								onClick={recordSearch}
							>
								<button className="w-100 mt-4 p-0 btn p-2 lh-24 ms-1 ls-3  rounded-xl bg-current  fw-700 ls-lg text-white">
									Search
								</button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
