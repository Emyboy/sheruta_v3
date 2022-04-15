import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function AgentStateSelect({ done, value }) {
	const { states } = useSelector((state) => state.view)

	const [selected, setSelected] = useState(value)

	useEffect(() => {
        done(selected)
    }, [selected])

	return (
		<div>
			<div className="text-center mb-4">
				<h2 className="fw-700">What State Do You Opperate in?</h2>
			</div>
			<div className="row justify-content-center">
				{states.map((val, i) => {
					return (
						<div className="col-sm-3 col-md-6 col-lg-4 mb-4" key={`state-${i}`}>
							<button
								className={`btn w-100 fw-700 text-success ${
									selected === val
										? 'border-2 border-success shadow-sm'
										: 'border'
								}`}
								onClick={() => setSelected(val)}
							>
								{val?.name?.slice(0, 22)}
							</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}
