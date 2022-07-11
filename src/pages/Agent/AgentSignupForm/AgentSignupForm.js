import React, { useCallback, useEffect, useState } from 'react'

import AgentProfileStep from './AgentProfileStep'
import UpdateAvatar from '../../GetStarted/Steps/UpdateAvatar'
import CreateAgentLastStep from './CreateAgentLastStep'
import LocationKeywordSelector from '../../../components/LocationKeywordSelector/LocationKeywordSelector'
import { Dots } from 'react-activity'
import axios from 'axios'
import Cookies, { set } from 'js-cookie'
import { Redirect } from 'react-router'
import { notification } from 'antd'

export default function AgentSignupForm() {
	const [step, setStep] = useState(0)
	const [nextAble, setNextAble] = useState(false)
	const [loading, setLoading] = useState(true)
	const [done, setDone] = useState(false)
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


	useEffect(() => {
		setNextAble(false)
	}, [step])

	// console.log('AGENT DATA --', agentData)

	const addData = (newData) => {
		setAgentData({ ...agentData, ...newData })
	}

	const checkIfUserIsAgent = useCallback(async () => {
		try {
			const res = await axios(process.env.REACT_APP_API_URL + `/agents/me`, {
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
			})

			if (res.data.length === 0) {
				setLoading(false)
			} else {
				setDone(true)
			}
		} catch (error) {
			setLoading(false)
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		checkIfUserIsAgent()
	}, [checkIfUserIsAgent])

	if (done) {
		notification.info({ message: 'You are already an agent' })
		return <Redirect to={'/'} />
	}

	if (loading) {
		return (
			<div className="card rounded-xxl mt-5">
				<div className="row justify-content-center pt-5 pb-5">
					<div className="col-lg-6 col-sm-12 text-center">
						<Dots />
						<h3 className="fw-600 mt-1 mb-3">Please wait...</h3>
						<p>Getting you started</p>
					</div>
				</div>
			</div>
		)
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

						<LocationKeywordSelector
							state_id={agentData.state}
							done={(e) =>
								addData({ location_keyword: e.locationKeyword, state: e.state })
							}
							stand_alone
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
