import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Global from '../../../Global'

export default function SearchBox() {
	const router = useHistory()
	const { location_keywords, services, categories } = useSelector(
		(state) => state.view
	)

	const [location, setLocation] = useState(null)
	const [category, setCategory] = useState(null)
	const [service, setService] = useState(null)

	const handleSearch = (e) => {
		e.preventDefault()
		let data = {
			keyword_slug: null,
			property_type: null,
			service: null,
		}
		console.log('THE DATA --', services)
		if (location) {
			data.keyword_slug = location_keywords?.filter(
				(x) => Number(x?.id) === Number(location)
			)[0]
		}
		if (category) {
			data.property_type = categories?.filter(
				(x) => Number(x?.id) === Number(category)
			)[0]
		}
		if (service) {
			data.service = services?.filter(
				(x) => Number(x?.id) === Number(service)
			)[0]
		}

		console.log('SEARCH DATA --', data)
		// TODO - Go to 👉🏽 https://v5.reactrouter.com/web/example/query-parameters
		// Use router query string 👇🏽
		router.push(
			`/flats/for-share${
				data.keyword_slug ? `/${data.keyword_slug?.slug}` : ''
			}${data.property_type ? `/${data?.property_type?.slug}` : ''}${
				data.service ? `/${data.service?.slug}` : ''
			}`,
			data
		)
	}

	return (
		<div className="main-slides-search-form">
			<form className="pb-2" onSubmit={handleSearch}>
				<div className="row align-items-center">
					<div className="col-lg-6 col-md-12">
						<div className="form-group mb-2">
							<label>
								<i className="bx bxs-map"></i>
							</label>

							<div className="select-box">
								<select
									className="form-control"
									onChange={(e) => setLocation(e.target.value)}
								>
									<option>Select Location Ex. Lekki, Yaba, Jabi</option>
									{location_keywords?.map((val, i) => {
										return (
											<option value={val?.id} key={`option-keyword_${i}`}>
												{val?.name}
											</option>
										)
									})}
								</select>
								{/* <div className="nice-select" tabindex="0">
															<span className="current">Location</span>
														</div> */}
							</div>
						</div>
					</div>

					<div className="col-lg-3 col-md-6">
						<div className="form-group mb-2">
							<label>
								<i className="bx bx-home"></i>
							</label>

							<div className="select-box">
								<select
									className="form-control"
									onChange={(e) => setCategory(e.target.value)}
								>
									<option>Property Type</option>
									{categories?.map((val, i) => {
										return (
											<option value={val?.id} key={`search-cat-${i}`}>
												{val?.name}
											</option>
										)
									})}
								</select>
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6">
						<div className="form-group mb-2">
							<label>
								<i className="bx bx-link"></i>
							</label>

							<div className="select-box">
								<select
									className="form-control"
									onChange={(e) => setService(e.target.value)}
								>
									<option>Service Type</option>
									{services?.map((val, i) => {
										return (
											<option value={val?.id} key={`option-service-${i}`}>
												{val?.name}
											</option>
										)
									})}
								</select>
								{/* <div className="nice-select" tabindex="0">
															<span className="current">Property Type</span>
														</div> */}
							</div>
						</div>
					</div>
				</div>

				<div className="submit-btn">
					<button type="submit" className={Global.isMobile ? 'w-100 mt-3' : ''}>
						<i className="bx bx-search"></i>
					</button>
				</div>
			</form>
		</div>
	)
}
