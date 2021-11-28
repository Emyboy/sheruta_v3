import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../../components/Layout/Layout'
import VerifiedBadge from '../../../components/VerifiedBadge/VerifiedBadge';
import SettingsHeader from '../components/SettingsHeader'

export default function AccountSettings() {
	const { user } = useSelector((state) => state.auth);
    const _user = user.user;
    console.log(_user)
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
										src={_user.avatar_url}
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
									{_user.first_name} {_user.last_name}
								</h2>
								<h4 className="text-grey-500 fw-500 mb-3 font-xsss mb-4">
									@{_user.username}
								</h4>
							</div>
						</div>

						<form action="#">
							<div className="row">
								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">
											First Name
										</label>
										<input
											defaultValue={_user.first_name}
											type="text"
											className="form-control"
										/>
									</div>
								</div>

								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">
											Last Name {_user.is_verified &&<small>(Can't change this)</small>}
										</label>
										<input
											disabled={_user.is_verified}
											defaultValue={_user.last_name}
											type="text"
											className="form-control"
										/>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">Email</label>
										<input
											type="text"
											className="form-control"
											defaultValue={_user.email}
										/>
									</div>
								</div>

								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">Phone</label>
										<input
											defaultValue={_user.phone_number}
											type="text"
											className="form-control"
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
										className="form-control mb-0 p-3 h100 bg-greylight lh-16"
										rows="5"
										placeholder="Write your message..."
										spellcheck="false"
										defaultValue={_user.bio}
									></textarea>
								</div>

								<div className="col-lg-12">
									<a
										href="#"
										className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
									>
										Save
									</a>
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
