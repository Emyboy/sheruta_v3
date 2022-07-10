import { Avatar, notification } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import Layout from '../../components/Layout/Layout'
import PageNotFound from '../PageNotFound'
import { FaTimes } from 'react-icons/fa'
import { BsCheckLg } from 'react-icons/bs'
import { Dots } from 'react-activity'
import { useSelector } from 'react-redux'
import Global from '../../Global'

export default function InspectionInvitation() {
	localStorage.setItem('after_login', window.location.pathname)
	const { inspection_id } = useParams()
	const [pageState, setPageState] = useState('loading')
	const [data, setData] = useState(null)
	const { user } = useSelector((state) => state.auth)
	const router = useHistory()

	const getInspection = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/property-inspections/?id=${inspection_id}`,
				{
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			console.log('DATA ---', res.data)
			if (res.data) {
				console.log(res.data)
				setData(res.data[0])
				setPageState('done')
			}
		} catch (error) {
			setPageState('404')
			return Promise.reject(error)
		}
	}, [])

	const handleClick = async (status) => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/property-inspections/invitation/answer/${status}/${user?.user?.id}/${inspection_id}`,
				{
					method: 'PUT',
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			if (status === 'reject') {
				notification.success({ message: "Message sent" })
				return router.push('/feeds');
			} else {
				notification.success({ message: `Welcome ${user?.user?.first_name?.split(' ')[0]}` })
				router.push(`/inspection/${inspection_id}`)
				return window.location.reload()
			}
		} catch (error) {
			console.log('error --', error)
			return Promise.reject(error)
		}
	}

	useEffect(() => {
		getInspection()
	}, [getInspection])

	if (data?.guests?.filter((x) => x?.id == user?.user?.id)?.length > 0) {
        // if user is in guest list
		router.push(`/inspection/${inspection_id}`)
		return null
	}else if(data?.pending_guests?.filter((x) => x?.id == user?.user?.id)?.length === 0){
        //if user isn't part of pending guests
		router.push(`/feeds`)
		return null

    }

	switch (pageState) {
		case '404':
			return <PageNotFound />
		default:
			return (
				<Layout>
					<div className="container-fluid">
						<div className="row justify-content-center">
							<div className="col-md-8 col-xl-8 col-sm-12">
								<div className="card mt-4 rounded-xxl">
									<div className="card-body pt-5 pb-5">
										{pageState === 'loading' ? (
											<div className="text-center h50">
												<h5>Loading...</h5>
												<Dots />
											</div>
										) : (
											<div className="text-center">
												<Avatar src={data?.owner?.avatar_url} size={100} />
												<h5 className="text-grey-600 fw-bold mt-2">
													{data?.owner?.first_name}
												</h5>
												<h5 className="text-grey-600 fw-500 mt-2">
													{Global.currency}{' '}
													{window.formattedPrice.format(data?.owner?.budget)} - Budget
												</h5>
												<div className="container">
													<h3 className="mt-5 text-grey-600 fw-400">
														<strong>{data?.owner?.first_name}</strong> wants you
														to join an inspection for a{' '}
														<strong>{data?.property?.bedroom} bedroom</strong>{' '}
														flat located in{' '}
														<strong>{data?.property?.location}</strong>.
													</h3>
													<div className="d-flex justify-content-center mt-5">
														<div>
															<button
																className="ml-4 mr-4 btn btn-round-xl rounded-xl btn-danger"
																onClick={() => handleClick('reject')}
															>
																<FaTimes />
															</button>
															<br />
															<small className="text-grey-700 fw-bold">
																Reject
															</small>
														</div>
														<div>
															<button
																className="ml-4 mr-4 btn btn-round-xl rounded-xl bg-current text-white"
																onClick={() => handleClick('accept')}
															>
																<BsCheckLg />
															</button>
															<br />
															<small className="text-grey-700 fw-bold">
																Accept
															</small>
														</div>
													</div>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</Layout>
			)
	}
}
