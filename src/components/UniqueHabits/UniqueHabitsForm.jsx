import React, { useState } from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthPersonalInfo } from '../../redux/strapi_actions/view.action'
import PersonalInfoService from '../../services/PersonalInfoService'

export default function UniqueHabitsForm({ done }) {
	const { unique_habits, personal_info } = useSelector((state) => state.view)

	const mappedHabits = personal_info?.unique_habits?.map((x) => x.id)

	const dispatch = useDispatch()

	const [selected, setSelected] = useState(mappedHabits)

	const update = useCallback(async () => {
		try {
			await PersonalInfoService.updatePersonalInfo({
				unique_habits: selected,
			})
			dispatch(getAuthPersonalInfo())
			if (done) {
				done()
			}
		} catch (error) {
			return Promise.reject(error)
		}
	}, [selected])

	useEffect(() => {
		if (mappedHabits === selected) {
			return
		}
		update()
	}, [selected])

	return (
		<div className="middle-wrap">
			<div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
				<div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
					<h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
						Select Your Habits
					</h4>
				</div>
				<div className="card-body p-lg-5 p-4 w-100 border-0 ">
					<div className="text-center pb-3">
						<h5 className="fw-500 text-warning">Auto Saved</h5>
					</div>
					<div className="d-flex mt-3" style={{ flexWrap: 'wrap' }}>
						{unique_habits?.map((val, i) => {
							return (
								<EachHabit
									key={`habit-${i}`}
									val={val}
									selected={selected.includes(val?.id)}
									onClick={() =>
										setSelected(
											selected.includes(val?.id)
												? selected.filter((x) => x !== val?.id)
												: [...selected, val?.id]
										)
									}
								/>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

const EachHabit = ({ val, selected, onClick }) => {
	return (
		<span
			onClick={onClick}
			className={` ${
				selected ? 'bg-theme text-white' : 'bg-theme-light text-dark'
			} font-xssss rounded-3  fw-600 p-2  mt-0 mb-2 mr-2`}
			style={{ textTransform: 'capitalize' }}
		>
			{val?.name}
		</span>
	)
}
