import { notification } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import AgentService from '../../services/AgentService'
import { Redirect } from 'react-router-dom'

export default function AgentPending(props) {
	const { user } = useSelector((state) => state.auth)
	console.log(props)

	const sendRequest = useCallback(async () => {
		try {
			const res = await AgentService.sendPendingRequest(
				user?.user?.id,
				props?.match?.params?.agent_id
			)
			if (res.data) {
				notification.success({ message: 'Request was sent' })
			}
			console.log(res.data)
		} catch (error) {
			notification.error({ message: 'Error sending request' })
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		sendRequest()
	}, [sendRequest])

	if (!user) {
		return <Redirect to="/" />
	}

	return (
		<Layout>
			<div className="container-fluid mt-3">
				<div className="row justify-content-center">
					<div className="col-lg-8 col-sm-12">
						<div className="card mt-5 rounded-xxl shadow-sm">
							<div className="card-body">
								<h1 className="fw-700 text-grey-700">Congratulations</h1>
								<h4>
									We have have received your request and one of our
									representatives will reach out to you via email or phone in 2
									business days.
								</h4>
								<h4>So please check your email from time to time.</h4>
								<h1 className="fw-700 mt-4  text-grey-700">What Next?</h1>
								<h4>
									If your request gets accepted, we will send you a link to give
									you access to the agent dashboard.
								</h4>

								<div className="alert alert-info mt-4">
									<h4 className="fw-bold  text-grey-700">
										Please call us if you don't hear from us in 2 business days
									</h4>
								</div>
							</div>
							<div className="text-center mb-4 mt-3">
								<Link to="/services">
									<button className="btn btn-lg text-white bg-theme">
										Explore Services
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
