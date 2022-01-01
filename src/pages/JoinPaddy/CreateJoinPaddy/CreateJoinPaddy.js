import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../../components/Layout/Layout'

import ContactSelect from './ContactSelect'
import CreateJoinPaddyForm from './CreateJoinPaddyForm'

export default function CreateJoinPaddy() {
	const { user } = useSelector((state) => state.auth)
	const [step, setStep] = useState(0)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState({
		guests: [],
		owner: user?.user?.id,
		country: process.env.REACT_APP_COUNTRY_ID,
	})
	const [nextBtnDisabled, setNextBtnDisabled] = useState(false)
	const stepProps = {
		next: () => setStep(step + 1),
		previous: () => setStep(step - 1),
		setLoading: (e) => setLoading(e),
		setData: (e) => setData(e),
		data,
	}
	const allSteps = [
		<ContactSelect
			heading={'Select Contacts To Join'}
			subHeading={'You can select as many contacts as you want to join'}
			onSelect={(e) => setData({ ...data, guests: [...data.guests, e] })}
			selectedContacts={data.guests}
			unSelect={(e) =>
				setData({ ...data, guests: data.guests.filter((x) => x !== e) })
			}
			selected={(e) => setNextBtnDisabled(!e)}
		/>,
		<CreateJoinPaddyForm {...stepProps} />,
	]
	return (
		<Layout>
			<div>
				<div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
					<div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
						{/* <a href="default-settings.html" className="d-inline-block mt-2">
							<i className="ti-arrow-left font-sm text-white"></i>
						</a> */}
						<h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
							Create Join Paddy Group
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
							{step !== allSteps.length - 1 && (
								<button
									className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 "
									onClick={stepProps.next}
									disabled={nextBtnDisabled || loading}
								>
									Next
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
