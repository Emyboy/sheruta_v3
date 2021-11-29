import React from 'react'

export default function EachQuestionSelect({ selected, onSelect, answer }) {
	return (
		<div
			className="card link shadow-sm rounded "
			onClick={() => onSelect(answer)}
		>
			<div className="card-body d-flex align-items-center">
				<div className="col-2">
					<div
						className={`${
							selected ? 'bg-theme' : 'border-success'
						} border p-2 rounded-circle`}
					></div>
				</div>
				<div className="col-10">
					<h5 className="mb-0">{answer}</h5>
				</div>
			</div>
		</div>
	)
}
