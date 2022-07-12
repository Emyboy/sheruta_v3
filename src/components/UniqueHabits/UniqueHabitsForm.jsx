import React, { useState } from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthPersonalInfo } from '../../redux/strapi_actions/view.action'
import PersonalInfoService from '../../services/PersonalInfoService'
import Select from 'react-select'
import { notification } from 'antd'
import { BsCircle, BsCheckCircle } from 'react-icons/bs'

export default function UniqueHabitsForm({ done }) {
	const { unique_habits, personal_info } = useSelector((state) => state.view)
	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()

	const [selected, setSelected] = useState([])
	const [option, setOption] = useState([])

	const update = async (_update) => {
		try {
			setLoading(true)
			const update = await PersonalInfoService.updatePersonalInfo({
				unique_habits: _update ? _update : selected,
			});
			setTimeout(() => {
				dispatch(getAuthPersonalInfo())
			}, 2000);
			if (done) {
				done()
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
			return Promise.reject(error)
		}
	}

	const handleClick = (item) => {
		if (selected.includes(item.id)) {
			const _new = selected.filter((x) => x != item.id)
			setSelected(_new)
			return update(_new)
		} else {
			const _update = [...selected, item.id]
			setSelected(_update)
			return update(_update)
		}
	}

	useEffect(() => {
		if (personal_info) {
			const mappedHabits = personal_info?.unique_habits?.map((x) => x.id)
			setSelected(mappedHabits)
		}
	}, [personal_info])

	useEffect(() => {
		return dispatch(getAuthPersonalInfo())
	},[])

	if (!personal_info) {
		return (
			<div>
				<div className="text-center pb-5 pt-5">
					<h4 className="fw-500 text-grey-500 mb-0">Loading...</h4>
				</div>
			</div>
		)
	}

	return (
		<div className="middle-wrap">
			<div className="text-center pb-1">
				<h5 className="fw-500 text-grey-500 mb-0">
					Select What Applies To You
				</h5>
			</div>
			<div className="text-center pb-3">
				<h5 className="fw-500 text-warning">
					{loading ? 'Saving...' : 'Auto Saved'}
				</h5>
			</div>
			<div className="d-flex mt-3" style={{ flexWrap: 'wrap' }}>
				{unique_habits?.map((val, i) => {
					return (
						<EachHabit
							key={`habit-${i}`}
							selected={selected.includes(val.id)}
							val={val}
							onClick={handleClick}
						/>
					)
				})}
			</div>
			{/* <div className="mt-5">
				<Select
					onChange={(e) => {
						const list = selected
						setSelected([...list, e.value])
					}}
					options={option?.map((val) => ({ value: val?.id, label: val?.name }))}
				/>
				<div className="d-flex justify-content-center mt-4">
					<button
						disabled={selected.length === 0}
						className="btn bg-accent text-white"
						onClick={update}
					>
						Save Changes
					</button>
				</div>
			</div> */}
		</div>
	)
}

const EachHabit = ({ val, selected, onClick }) => {
	const { unique_habits } = useSelector((state) => state.view)

	return (
		<a
			className={` ${
				selected ? 'bg-theme text-white' : 'bg-theme-light text-dark'
			} font-xsss rounded-3  fw-600 p-2  mt-0 mb-3 mr-3`}
			onClick={() => onClick(val)}
		>
			{!selected ? (
				<BsCircle size={20} className={'pr-1'} />
			) : (
				<BsCheckCircle size={20} className={'pr-1'} />
			)}
			<span style={{ textTransform: 'capitalize' }}>{val?.name}</span>
		</a>
	)
}
