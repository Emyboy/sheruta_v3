import { notification, Tooltip } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import InspectionService from '../../services/InspectionService'

const API_URL = process.env.REACT_APP_API_URL

export default function EachInspection({ data, index }) {
	const { user } = useSelector((state) => state.auth)
	const [closed, setClosed] = useState(false)

	const closeGroup = async () => {
		try {
			const res = await axios(API_URL + `/property-inspections/${data?.id}`, {
				method: 'DELETE',
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
			})
			setClosed(true)
			notification.success({ message: 'Deleted' })
		} catch (error) {
			console.log('ERROR ---', error)
			notification.error({ message: 'Error, please try again' })
			return Promise.reject(error)
		}
	}

	const leaveGroup = async () => {
		try {
			const res = await InspectionService.removeUser(user?.user?.id, data?.id);
			setClosed(true);
			return notification.success({ message: "You've left the group" })
		} catch (error) {
			notification.error({ message: "Error, please try again" })
			return Promise.reject(error);
		}
	}

	if (closed) {
		return null
	}

	return (
		<div className="col-md-6 col-sm-6 pe-2 ps-2">
			<div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
				<div
					className="card-body position-relative h100 bg-image-cover bg-image-center"
					style={{
						backgroundImage: `url(https://picsum.photos/${index}/100/?blur=5)`,
					}}
				></div>
				<div className="card-body d-block w-100 pl-10 pe-4 pb-4 pt-0 text-left position-relative">
					<Link to={`/inspection/${data?.id}`}>
						<figure
							className="avatar position-absolute w75 z-index-1"
							style={{ top: '-40px', left: '15px' }}
						>
							<img
								src={data?.owner?.avatar_url}
								alt="image"
								className="float-right p-1 bg-white rounded-circle w-100 shadow"
							/>
						</figure>
						<div className="clearfix"></div>
						<h4 className="fw-700 text-grey-700 font-xsss mt-3 mb-1">
							{user?.user?.id === data?.owner?.id ? 'Your' : data?.first_name}{' '}
							Group
						</h4>
						<p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">
							@{data?.owner?.username}
						</p>
					</Link>
					<span className="position-absolute right-15 top-0 d-flex align-items-center mt-3">
						{data?.owner?.id !== user?.user?.id && (
							<>
								{/* <a className="d-lg-block d-none">
									<i className="feather-mail btn-round-md font-md bg-current text-white"></i>
								</a> */}
								{!data?.pending_guests
									?.map((x) => x.id)
									?.includes(user?.user?.id) &&
								!data?.guests?.map((x) => x.id)?.includes(user?.user?.id) ? (
									<a
										href="#"
										className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white"
									>
										Join
									</a>
								) : (
									<a
										onClick={leaveGroup}
										className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-danger font-xsssss fw-700 ls-lg text-white"
									>
										Leave Group
									</a>
								)}
							</>
						)}
						{data?.owner?.id === user?.user?.id && (
							<a
								onClick={closeGroup}
								className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-danger font-xsssss fw-700 ls-lg text-white"
							>
								Close Group
							</a>
						)}
					</span>
					<div className="dd-block">
						<ul className="memberlist mt-1 mb-2 ms-0 d-block">
							{data?.guests?.map((val, i) => {
								return (
									<Tooltip title={val?.first_name}>
										<li className="w20">
											<Link to={`/user/${val?.username}`} style={{ width: '100px'}}>
												<img
													src={val?.avatar_url}
													alt="user"
													className="w35 d-inline-block"
													style={{ opacity: '1', borderRadius: '50%', width: '100px' }}
												/>
											</Link>
										</li>
									</Tooltip>
								)
							})}
							<li className="last-member">
								<a
									href="#"
									className="bg-greylight fw-600 text-grey-500 font-xssss w35 ls-3 text-center"
									style={{ height: '35px', lineHeight: '35px' }}
								>
									+2
								</a>
							</li>
							<li className="ps-3 w-auto ms-1">
								<a href="#" className="fw-600 text-grey-500 font-xssss">
									Members
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
