import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PrefaredLocations } from '../../GetStarted/Steps/PrefaredLocations'
import AgentProfileStep from './AgentProfileStep'
import AgentStateSelect from './AgentStateSelect'
import UpdateAvatar from '../../GetStarted/Steps/UpdateAvatar'
import CreateAgentLastStep from './CreateAgentLastStep'
import LocationKeywordSelector from '../../../components/LocationKeywordSelector/LocationKeywordSelector'

export default function AgentSignupForm() {
	const [step, setStep] = useState(0)
	const [nextAble, setNextAble] = useState(false)
	const [agentData, setAgentData] = useState({
		name: null,
		officeLocation: null,
		state: null,
		idFront: null,
		idBack: null,
		avatar: null,
		locations: [],
		inspection_fee: null,
		location_keyword: null,
	})

	console.log('THE DATA --', agentData)

	useEffect(() => {
		setNextAble(false)
	}, [step])

	// console.log('AGENT DATA --', agentData)

	const addData = (newData) => {
		setAgentData({ ...agentData, ...newData })
	}

	return (
		<div className="card w-100 border-0 bg-white shadow mt-4 p-0 mb-4">
			<div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
				{/* <a href="default-settings.html" className="d-inline-block mt-2">
					<i className="ti-arrow-left font-sm text-white"></i>
				</a> */}
				<h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
					Agent Registration ({step + 1})
				</h4>
			</div>
			<div className="card-body p-lg-5 p-4 w-100 border-0 ">
				<div className="alert alert-warning p-2 text-center">
					<h6 className="mb-0 fw-bold">
						All fields are required, including images.
					</h6>
				</div>
				{
					[
						<AgentProfileStep
							done={(e) => {
								if (e) {
									setNextAble(true)
									addData(e)
								} else {
									setNextAble(false)
								}
							}}
							data={agentData}
						/>,
						<UpdateAvatar standalone ended={(e) => addData({ avatar: e })} />,
						<AgentStateSelect
							data={agentData}
							done={(e) => addData({ state: e })}
							value={agentData?.state}
						/>,
						// <PrefaredLocations
						// 	done={(e) => {
						// 		if (e) {
						// 			setNextAble(true);
						// 			setAgentData({...agentData, locations: e})
						// 		} else {
						// 			setNextAble(false)
						// 		}
						// 	}}
						// 	standAlone
						// 	heading={'Location(s) you opperate in.'}
						// />,
						<LocationKeywordSelector
							state_id={agentData.state}
							done={(e) => addData({ location_keyword: e })}
							heading={`Where in ${agentData.state?.name}?`}
							sub_heading={`What area in ${agentData.state?.name} do you opperate in?`}
							stand_alone
							no_state_error={
								<div className="text-center">
									<h1 className="fw-bold text-grey-600">
										Please select a state
									</h1>
									<h4 className="text-muted">
										Please go back and select a state
									</h4>
									<button
										onClick={() => setStep(step - 1)}
										className="btn bg-current text-white mt-4"
									>
										<i className="feather-arrow-left mr-3"></i>Select Now
									</button>
								</div>
							}
						/>,
						<CreateAgentLastStep
							data={agentData}
							changeStep={(s) => setStep(s)}
						/>,
					][step]
				}
			</div>
			<div className="card-footer d-flex justify-content-between">
				<div className="col-sm-6 col-lg-3 text-left">
					{step > 0 && (
						<button
							onClick={() => setStep(step - 1)}
							className="bg-danger btn text-center text-white font-xsss fw-600 p-3  w100 rounded-3 d-inline-block"
						>
							Previous
						</button>
					)}
				</div>
				<div className="col-sm-6 col-lg-3 text-right">
					<button
						href="#"
						className="bg-current btn text-center text-white font-xsss fw-600 p-3  w100 rounded-3 d-inline-block"
						// disabled={!nextAble}
						onClick={() => setStep(step + 1)}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	)
}
