import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Layout from '../../../components/Layout/Layout'
import SettingsHeader from '../components/SettingsHeader'

export default function PersonalInfoSettings() {
	const { personal_info } = useSelector((state) => state.view)

	if (personal_info && !personal_info.nin) {
		return (
			<Layout>
				<div className="middle-wrap pb-5">
					<div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
						<SettingsHeader heading={'Update personal info'} />
						<div className="card-body p-lg-5 p-4 w-100 border-0 text-center mt-5 mb-5">
							<h1>Account Not Verified</h1>
							<h5>Join the community today</h5>
							<Link to="/start">
								<button className="mt-3 bg-current text-center text-white font-xsss fw-600 p-2 w175 rounded-3 d-inline-block btn">
									Get Started
								</button>
							</Link>
						</div>
					</div>
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<div className="middle-wrap pb-5">
				<div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
					<SettingsHeader heading={'Update personal info'} />
					<div className="card-body p-lg-5 p-4 w-100 border-0 ">
						<form action="#">
							<strong className="mont-font fw-600 font-xsss">
								<h1>Work Information</h1>
							</strong>
							<hr className="mt-1" />
							<div className="row">
								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">
											Occupation
										</label>
										<input type="text" className="form-control" />
									</div>
								</div>

								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">
											Occupation
										</label>
										<input type="text" className="form-control" />
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">
											Work Industry
										</label>
										<input type="text" className="form-control" />
									</div>
								</div>

								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">
											Religion
										</label>
										<input type="text" className="form-control" />
									</div>
								</div>
								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">
											Supervisor Phone Number
										</label>
										<input type="text" className="form-control" />
									</div>
								</div>
							</div>

							<strong className="mont-font fw-600 font-xsss">
								<h1>Social Information</h1>
							</strong>
							<hr className="mt-1" />

							<div className="row">
								<div className="col-lg-6 mb-3">
									<label className="mont-font fw-600 font-xsss">
										Facebook Username
									</label>
									<div class="input-group mb-3">
										<div class="input-group-prepend">
											<span class="input-group-text" id="basic-addon1">
												facebook.com/
											</span>
										</div>
										<input
											type="text"
											class="form-control"
											placeholder="Username"
											aria-label="Username"
											aria-describedby="basic-addon1"
										/>
									</div>
								</div>
								<div className="col-lg-6 mb-3">
									<label className="mont-font fw-600 font-xsss">
										Instagram Username
									</label>
									<div class="input-group mb-3">
										<div class="input-group-prepend">
											<span class="input-group-text" id="basic-addon1">
												instagram.com/
											</span>
										</div>
										<input
											type="text"
											class="form-control"
											placeholder="Username"
											aria-label="Username"
											aria-describedby="basic-addon1"
										/>
									</div>
								</div>
								<div className="col-lg-6 mb-3">
									<label className="mont-font fw-600 font-xsss">
										Twitter Username
									</label>
									<div class="input-group mb-3">
										<div class="input-group-prepend">
											<span class="input-group-text" id="basic-addon1">
												twitter.com/
											</span>
										</div>
										<input
											type="text"
											class="form-control"
											placeholder="Username"
											aria-label="Username"
											aria-describedby="basic-addon1"
										/>
									</div>
								</div>
								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">
											LinkedIn URL
										</label>
										<input
											type="text"
											className="form-control"
											placeholder="Ex. https://www.linkedin.com/in/john-doe/"
										/>
									</div>
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
