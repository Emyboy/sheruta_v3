import React from 'react'

export default function Heading({ heading, RightComponent, subHeading }) {
	return (
		<div class="card shadow-xss w-100 d-block d-flex border-0 p-3 rounded mb-3">
			<div class="card-body p-0">
				<div>
					<h2 class="fw-700 mb-0 mt-0 font-md text-grey-900">{heading}</h2>
					{subHeading && <p className="mb-0">{subHeading}</p>}
				</div>
				{RightComponent}
			</div>
		</div>
	)
}
