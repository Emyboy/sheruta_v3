import React, { useEffect } from 'react'

export default function BtnSelectors({
	heading,
	sub_heading,
	data,
	setData,
	selected,
	multi,
	remove,
}) {
	return (
		<div className="mb-5">
			<h1 className="fw-700">{heading}</h1>
			<p>{sub_heading}</p>
			<div className="row">
				{data.map((val, i) => {
					return (
						<div className="col-4 col-lg-2 text-center mr-2 mb-2">
							<button
								onClick={() => {
									if (multi && selected.includes(val?.id)) {
										remove(val?.id)
										return
									}
									setData(val?.id)
								}}
								className={`btn ${
									(multi ? selected.includes(val?.id) : selected === val?.id)
										? val && 'bg-theme text-white shadow-sm'
										: 'border border-success text-success'
								}`}
							>
								{val?.name}
							</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}
