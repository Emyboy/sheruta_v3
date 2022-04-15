import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../../components/Layout/Layout'

import ContactSelect from './ContactSelect'
import RequestSelector from './SelectRequest'
import { v4 as Uid } from 'uuid'
import PrefaredLocations from '../../GetStarted/Steps/PrefaredLocations'
import JoinPaddyDetailsFrom from './JoinPaddyDetailsForm'
import Selectors from './Selectors'
import FinalJoinPaddyStep from './FinalJoinPaddyStep'
import JoinPaddyService from '../../../services/JoinPaddyService'
import moment from 'moment'
import { notification } from 'antd'
import { Redirect } from 'react-router'
import { getAllViewOptions } from '../../../redux/strapi_actions/view.action'

export default function CreateJoinPaddy() {
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.auth);
	const [step, setStep] = useState(0)
	const [loading, setLoading] = useState(false)
	const { personal_info } = useSelector((state) => state.view)
	const [newPaddy, setNewPaddy] = useState(null)
	const [data, setData] = useState({
		guests: [],
		owner: user?.user?.id,
		country: parseInt(process.env.REACT_APP_COUNTRY_ID),
		property_requests: [],
		personal_info: personal_info,
		user_preferred_locations: [],
		uuid: `${Uid()}@${user?.user?.id}@${
			new Date().toISOString().split('T')[1]
		}`,
		status: 'inactive',
		change_budget: true,
		newly_built: false,
		agenda: 'Lets all come together to find an apartment we can share',
		budget: null,
		bedrooms: null,
		toilets: null,
		bathrooms: null,
		settingrooms: null,
	})

	useEffect(() => {
		setData({ ...data, personal_info: personal_info?.id })
	}, [personal_info]);

	useEffect(() => {
		dispatch(getAllViewOptions())
	},[])

	// useEffect(() => {
	// 	console.log('UPDATE ---', data)
	// }, [data])

	const [nextBtnDisabled, setNextBtnDisabled] = useState(false)
	const stepProps = {
		next: () => setStep(step + 1),
		previous: () => setStep(step - 1),
		setLoading: (e) => setLoading(e),
		setData: (e) => setData(e),
		stopNext: (e) => setNextBtnDisabled(e),
		data,
	}
	const allSteps = [
		<ContactSelect
			heading={'Select Contacts To Join'}
			subHeading={'You can select as many contacts as you want to join'}
			onSelect={(e) => setData({ ...data, guests: [...data.guests, e?.id] })}
			selectedContacts={data.guests}
			unSelect={(e) =>
				setData({ ...data, guests: data.guests.filter((x) => x !== e) })
			}
			selected={(e) => setNextBtnDisabled(!e)}
		/>,
		<RequestSelector {...stepProps} done={(e) => setNextBtnDisabled(!e)} />,
		<PrefaredLocations
			standAlone
			done={(e) =>
				setData({ ...data, user_preferred_locations: e?.map((val) => val?.id) })
			}
		/>,
		<JoinPaddyDetailsFrom
			{...stepProps}
			joinPaddyData={data}
			done={() => setNextBtnDisabled(false)}
		/>,
		<Selectors
			done={() => setNextBtnDisabled(false)}
			data={data}
			setData={(e) => setData({ ...data, ...e })}
		/>,
		<FinalJoinPaddyStep />,
	]

	const handleSubmit = async () => {
		try {
			const res = await JoinPaddyService.create(data)
			setNewPaddy(res.data)
			notification.success({ message: 'Group created' })
		} catch (error) {
			notification.error({ message: 'Error create new group' })
			notification.info({ message: 'Please try again' })
			return Promise.reject(error)
		}
	}

	if(newPaddy && newPaddy?.uuid){
		return <Redirect to={`/join-paddy/${newPaddy.uuid}`} />
	}

	return (
		<Layout>
			<div>
				<div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
					<div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
						{/* <a href="default-settings.html" className="d-inline-block mt-2">
							<i className="ti-arrow-left font-sm text-white"></i>
						</a> */}
						<h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
							Create Join Paddy Group ({step + 1} / {allSteps.length})
						</h4>
					</div>
					<div className="card-body p-lg-5 p-4 w-100 border-0">
						{allSteps[step]}
					</div>
					<div className="card-footer p-3">
						<div className="d-flex justify-content-between">
							{step > 0 && (
								<button
									className="btn bg-danger text-center text-white font-xsss fw-600 p-3 w175 rounded-3 "
									onClick={stepProps.previous}
								>
									Previous
								</button>
							)}
							{step !== allSteps.length - 1 ? (
								<button
									className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 "
									onClick={stepProps.next}
									disabled={nextBtnDisabled || loading}
								>
									Next
								</button>
							) : (
								<button
									className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 "
									onClick={handleSubmit}
									disabled={nextBtnDisabled || loading}
								>
									{loading ? 'Loading...' : 'Finish'}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
