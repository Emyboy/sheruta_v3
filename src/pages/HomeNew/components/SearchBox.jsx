import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Global from '../../../Global'

export default function SearchBox() {
	const router = useHistory()
	const { location_keywords, services, categories } = useSelector(
		(state) => state.view
	)

	const [queryData, setQueryData] = useState({
		location: null,
		service: null,
		type: null,
	})

	const handleSearch = (e) => {
		e.preventDefault();

		const queryStrings = [];

		Object.keys(queryData).map((key, i) => {
			const value = Object.values(queryData)[i];
			if(key == 'location' && value){
				queryStrings.push(`${key}=${value}`)
			}
			if(key == 'service' && value){
				queryStrings.push(`${key}=${value}`)
			}
			if(key == 'type' && value){
				queryStrings.push(`${key}=${value}`)
			}
		
		});
		
		const query = queryStrings.join("&")
		console.log('QUERY STRING --', query);

		router.push(`/flats/?${query}`)
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
									onChange={(e) =>
										setQueryData({ ...queryData, location: e.target.value })
									}
								>
									<option>Select Location Ex. Lekki, Yaba, Jabi</option>
									{location_keywords?.map((val, i) => {
										return (
											<option value={val?.slug} key={`option-keyword_${i}`}>
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
									onChange={(e) =>
										setQueryData({ ...queryData, type: e.target.value })
									}
								>
									<option>Property Type</option>
									{categories?.map((val, i) => {
										return (
											<option value={val?.slug} key={`search-cat-${i}`}>
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
									onChange={(e) =>
										setQueryData({ ...queryData, service: e.target.value })
									}
								>
									<option>Service Type</option>
									{services?.map((val, i) => {
										return (
											<option value={val?.slug} key={`option-service-${i}`}>
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
