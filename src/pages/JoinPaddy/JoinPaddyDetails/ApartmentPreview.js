import React from 'react'

export default function ApartmentPreview({ data, onShowMore }) {
	return (
		<div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
			<div className="card-body d-flex align-items-center  p-4">
				<h4 className="fw-700 mb-0 font-xssss text-grey-900">Apartments </h4>
				<a className="text-dark fw-600 ms-auto font-xssss text-primary">
					({data?.properties?.length})
				</a>
			</div>
			<div className="card-body d-block pt-0 pb-2">
				<div className="row">
					{data?.properties.map((val, i) => {
						return (
							<div className="col-6 mb-2 ">
								<a href="images/e-2.jpg" data-lightbox="roadtrip">
									<label
										className="rounded-xxl"
										style={{
											height: '150px',
											width: '100%',
											backgroundPosition: 'center',
											backgroundSize: '100%',
											backgroundImage: `url(${val?.image_urls[0]})`,
										}}
									></label>
								</a>
							</div>
						)
					})}
				</div>
			</div>
			<div className="card-body d-block w-100 pt-0">
				<a
					onClick={onShowMore}
					className="p-2 lh-28 w-100 d-block bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"
				>
					<i className="feather-external-link font-xss me-2"></i> More
				</a>
			</div>
		</div>
	)
}
