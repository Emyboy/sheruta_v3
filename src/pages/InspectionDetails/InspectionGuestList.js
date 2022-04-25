import React from 'react';
import moment from 'moment'

export default function InspectionGuestList({ data }) {
	return (
		<div className="chat-wrapper p-3 w-100 position-relative scroll-bar bg-white theme-dark-bg">
			<ul className="email-message">
				{data?.guests?.map((val, i) => {
					return (
						<li key={`guest-${i}`}>
							<a
								className="rounded-3 bg-lightblue theme-light-bg"
							>
								<div className="form-check mt-1">
									<input
										className="form-check-input"
										type="checkbox"
										id="blankCheckbox1"
										value="option1"
										aria-label=""
									/>
									<label
										className="text-grey-500 font-xssss"
										for="blankCheckbox1"
									></label>
								</div>
								<div className="email-user">
									<span
										className={`btn-round-xss ms-0 bg-${
											val?.online ? 'current' : 'danger'
										} me-2`}
									></span>
									<img
										src={val?.avatar_url}
										alt="user"
										className="w35 me-2"
										style={{ borderRadius: '50%' }}
									/>
									<h6 className="font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-700">
										{val?.first_name} {val?.last_name}
									</h6>
								</div>
								<div className="email-subject text-grey-600 text-dark fw-600 font-xssss">
									@{val?.username}
								</div>
								<div className="email-text text-grey-500 fw-600 font-xssss">
									{val?.bio}
								</div>
								<span className="email-file">
									<i className="feather-mail font-xss btn-round-sm text-grey-500 me-2 p-0"></i>
								</span>
								<div className="email-time text-grey-500 fw-600">{moment(val?.updated_at).fromNow()}</div>
							</a>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
