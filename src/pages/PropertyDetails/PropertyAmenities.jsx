import React from 'react'

export default function PropertyAmenities({ data }) {
  return (
		<>
			{data?.amenities?.length > 0 && (
				<div className="details-features bg-white rounded">
					<h3>Features</h3>

					<div className="row justify-content-start">
						<div className="col-lg-4 col-md-6">
							<ul className="features-list">
								{data?.amenities?.map((val, i) => {
									if (i < 4) {
										return (
											<li key={`cat-l-${i}`}>
												<i className="bx bx-check"></i> {val?.name}
											</li>
										)
									}
								})}
							</ul>
						</div>

						<div className="col-lg-4 col-md-6">
							<ul className="features-list">
								{data?.amenities?.map((val, i) => {
									if (i > 3 && i < 8) {
										return (
											<li key={`cat-r-${i}`}>
												<i className="bx bx-check"></i> {val?.name}
											</li>
										)
									}
								})}
							</ul>
						</div>
						<div className="col-lg-4 col-md-6">
							<ul className="features-list">
								{data?.amenities?.map((val, i) => {
									if (i > 7 && i < 12) {
										return (
											<li key={`cat-r-${i}`}>
												<i className="bx bx-check"></i> {val?.name}
											</li>
										)
									}
								})}
							</ul>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
