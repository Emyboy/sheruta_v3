import { notification } from 'antd'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Layout from '../../components/Layout/Layout'
import Global from '../../Global'

export default function BookInspection({ match }) {
	const history = useHistory()
	const [property, setProperty] = useState(null)
	const [loading, setLoading] = useState(false)

	const getProperty = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/properties/?id=${match?.params?.property_id}`
			)
			if (res.data?.length > 0) {
				setProperty(res.data[0])
			} else {
				history.goBack()
				notification.error({ message: 'Error, please try again' })
			}
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getProperty()
	}, [getProperty])

	return (
		<Layout>
			<div className="container-fluid pt-5">
				<div className="row justify-content-center">
					<div className="col-md-7 col-sm-12">
						{property && (
							<div className="card mb-3 rounded">
								<div className="card-header">
									<div className="text-center">
										<h1 className="fw-700 text-grey-600 mb-0">
											Open a new inspection.
										</h1>
									</div>
								</div>
								<div className="card-body d-flex p-1">
									<div
										className="m-2"
										style={{
											backgroundImage: `url(${property?.image_urls[0]})`,
											height: '100px',
											width: '100px',
											borderRadius: '7px',
											backgroundSize: 'cover',
											backgroundPosition: 'center',
										}}
									/>
									<div className="mt-2">
										<h4 className="fw-bold text-grey-700">{property?.name}</h4>
										<h3 className="fw-500">
											{Global.currency}
											{window.formatedPrice.format(property?.price)}
										</h3>
									</div>
								</div>
								<div className="card-footer p-1">
									<Alert variant="info" className="m-1">
										<Alert.Heading className="fw-bold">
											You need {property?.bedroom - 1} more people to join you
											to get this flat.
										</Alert.Heading>
										<p>
											Send an invitations to people on your contact list or
											people who are also interested in this flat.
										</p>
										<hr />
										<p className="mb-0">
											Once all <strong>{property?.bedroom - 1}</strong> people
											accepts, you'll be able to fix a date for the inspection.
										</p>
									</Alert>
									<div className="d-flex justify-content-center mt-4 mb-4">
										<button className="w-50 btn bg-accent text-white fw-700">
											Invite People
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	)
}
