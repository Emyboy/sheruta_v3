import React, { useState } from 'react'

export default function DiscussionBreakPoint() {
	const [show, setShow] = useState(true)

	return (
		<div className="container d-flex justify-content-center mt-5 mb-4">
			<button
				type="button"
				class="btn btn-sm bg-theme-light shadow-sm text-dark fw-500"
			>
				New Messages <br /> 👇🏽
			</button>
		</div>
	)
}
