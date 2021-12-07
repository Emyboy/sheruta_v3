import React, { useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import SettingsHeader from '../components/SettingsHeader'
import { MdOutlineWarningAmber } from 'react-icons/md'
import DeactivationQuestions from './DeactivationQuestions'

export default function AccountDeactivationSetting() {
	return (
		<Layout>
			<div className="middle-wrap pb-5">
				<div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
					<SettingsHeader heading={'Deactivate Account'} />
					<div className="card-body p-lg-5 p-4 w-100 border-0 text-center mt-1 mb-2">
						<div className="alert-danger card rounded">
							<div className="card-body">
								<h1 className="text-danger" style={{ fontSize: '3rem' }}>
									<MdOutlineWarningAmber /> Warning!
								</h1>
								<div>
									<p>You are attempting to deactivate your account</p>
									<p>Doing so will revoke access to the following</p>
									<ol>
										<li>1. Notification Updates</li>
										<li>2. Match with possible flat mates </li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<div className="row justify-content-center">
						<div className="col-lg-6 mb-3">
							<div className="form-group">
								<input type="checkbox" />
								<span className="ml-3">
									I understand the above warning and wish to continue
								</span>
							</div>
							<button className="w-50 bg-danger text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block">
								Continue
							</button>
						</div>
					</div>

					<div className="row justify-content-center mt-5 mb-5">
						<div className="col-lg-6 mb-3">
							<div className="form-group">
								<label className="mont-font fw-600 font-xsss">
									Enter Password
								</label>
								<input type="password" className="form-control" />
							</div>
							<button className="w-50 bg-danger text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block">
								Continue
							</button>
						</div>
					</div>
					<DeactivationQuestions />
					<div className="container mb-5">
						<div className="text-center">
							<h2>So sad to see you go </h2>
							<button className="btn w-50 bg-danger text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block">
								Deactivate Now
							</button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
