import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../../components/Layout/Layout'
import VerifiedBadge from '../../../components/VerifiedBadge/VerifiedBadge'
import SettingsHeader from '../components/SettingsHeader'
import axios from 'axios'
import Cookies from 'js-cookie';
import { notification } from 'antd';

export default function AccountSettings() {
	const { user } = useSelector((state) => state.auth)
	const _user = user.user
	const [userData, setUserData] = useState(_user)
	const [loading, setLoading] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		axios(
			process.env.REACT_APP_API_URL +
				`/users-permissions/auth/local/edit/${user ? user.user.id : null}`,
			{
				method: 'POST',
				data: { ...userData },
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
			}
		)
			.then((res) => {
				setLoading(false)
				notification.success({ message: 'Profile updated' })
			})
			.catch((err) => {
				notification.error({ message: 'Error updating profile' })
				setLoading(false)
			})
	}

	return (
		<Layout>
			<div className="middle-wrap pb-5">
				<div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
					<SettingsHeader heading={'Change Account Information'} />
					<div className="card-body p-lg-5 p-4 w-100 border-0 ">
						<div className="row justify-content-center">
							<div className="col-lg-4 text-center">
								<figure className="avatar ms-auto me-auto mb-0 mt-2 w100 position-relative">
									<img
										src={userData.avatar_url}
										alt="image"
										className="shadow-sm rounded-3 w-100"
									/>
									<a
										href="#"
										className="shadow mr-4 p-1 position-absolute alert-primary text-dark font-xsss fw-500 mt-2 rounded-3"
										style={{ right: '40px', width: '5rem' }}
									>
										Change
									</a>
								</figure>
								<h2 className="fw-700 font-sm text-grey-900 mt-3">
									{userData.first_name} {userData.last_name}
								</h2>
								<h4 className="text-grey-500 fw-500 mb-3 font-xsss mb-4">
									@{userData.username}
								</h4>
							</div>
						</div>

						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">
											First Name
										</label>
										<input
											onChange={(e) =>
												setUserData({ ...userData, first_name: e.target.value })
											}
											defaultValue={userData.first_name}
											type="text"
											className="form-control"
											required
										/>
									</div>
								</div>

								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">
											Last Name{' '}
											{userData.is_verified && (
												<small>(Can't change this)</small>
											)}
										</label>
										<input
											required
											onChange={(e) =>
												setUserData({ ...userData, last_name: e.target.value })
											}
											disabled={userData.is_verified}
											defaultValue={userData.last_name}
											type="text"
											className="form-control"
										/>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">
											Email <small>(Can't change this)</small>
										</label>
										<input
											disabled
											type="text"
											className="form-control"
											defaultValue={userData.email}
											required
										/>
									</div>
								</div>

								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">Phone</label>
										<input
											onChange={(e) =>
												setUserData({
													...userData,
													phone_number: e.target.value,
												})
											}
											defaultValue={userData.phone_number}
											type="text"
											className="form-control"
											required
										/>
									</div>
								</div>
							</div>

							<div className="row">
								{/* <div className="col-lg-12 mb-3">
									<div className="card mt-3 border-0">
										<div className="card-body d-flex justify-content-between align-items-end p-0">
											<div className="form-group mb-0 w-100">
												<input
													type="file"
													name="file"
													id="file"
													className="input-file"
												/>
												<label
													for="file"
													className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed"
												>
													<i className="ti-cloud-down large-icon me-3 d-block"></i>
													<span className="js-fileName">
														Drag and drop or click to replace
													</span>
												</label>
											</div>
										</div>
									</div>
								</div> */}

								<div className="col-lg-12 mb-3">
									<label className="mont-font fw-600 font-xsss">
										About You
									</label>
									<textarea
										onChange={(e) =>
											setUserData({ ...userData, bio: e.target.value })
										}
										className="form-control mb-0 p-3 h100 bg-greylight lh-16"
										rows="5"
										placeholder="Write your message..."
										spellcheck="false"
										defaultValue={userData.bio}
										style={{ height: '3rem' }}
										required
									></textarea>
								</div>

								<div className="col-lg-12">
									<button
										type="submit"
										className="btn btn-sm bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
										// disabled={loading}
									>
										{loading ? 'Loading..' : 'Save'}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className="card w-100 border-0 p-2"></div>
			</div>
		</Layout>
	)
}
