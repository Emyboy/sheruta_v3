import axios from 'axios'
import moment from 'moment'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import requestUtils from '../../../../utils/request.utils'

export default function RecentHomeRequest() {
	const [list, setList] = useState([])

	useEffect(() => {
		;(async () => {
			try {
				const res = await axios(
					process.env.REACT_APP_API_URL +
						`/property-requests/?is_searching=false&_limit=4&_start=0&_sort=created_at:DESC`
				)
				setList(res.data)
			} catch (error) {
				console.log('THE ERROR --', error)
				return Promise.reject(error)
			}
		})()
	}, [])

	if (list.length === 0) {
		return null
	}

	return (
		<div className="blog-area pt-100 pb-100">
			<div className="container">
				<div className="section-title">
					<h3>Recently Posted Rooms</h3>
					<p>
						These are rooms recently posted by people who have spaces to share.
					</p>
				</div>

				<div className="row justify-content-center">
					<div className="col-lg-6 col-md-12">
						<div className="single-blog-item">
							<a href="blog-details.html">
								{/* <img src={list[0]?.image_url[0]} alt="image" height={'80px'} width="100%" /> */}
								<div
									style={{
										height: '510px',
										backgroundImage: `url(${list[0]?.image_url[0]})`,
										backgroundRepeat: 'no-repeat',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										borderRadius: '10px',
									}}
								/>
							</a>

							<div className="blog-content">
								<span className="tag">
									<Link to={requestUtils.renderRequestURL(list[0])}>
										{list[0]?.category?.name}
									</Link>
								</span>
								<span className="btn ml-3 bg-accent">
									<Link
										to={requestUtils.renderRequestURL(list[0])}
										className="text-white"
									>
										{list[0]?.service?.name}
									</Link>
								</span>
								<h3>
									<Link to={requestUtils.renderRequestURL(list[0])}>
										{list[0]?.heading}
									</Link>
								</h3>

								<div className="bottom-content d-flex justify-content-between align-items-center">
									<div className="blog-author d-flex align-items-center">
										<img
											src={list[0]?.users_permissions_user?.avatar_url}
											className="rounded-circle"
											alt="image"
										/>
										<span>
											<Link
												to={`/user/${list[0]?.users_permissions_user?.username}`}
											>
												{list[0]?.users_permissions_user?.first_name}
											</Link>
										</span>
									</div>

									<p>
										<i className="bx bx-calendar"></i>
										{moment(list[0]?.created_at).fromNow()}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-6 col-md-12">
						{list.map((val, i) => {
							if (i > 0) {
								return (
									<div className="blog-side-item mb-3" key={`prop-i-${val.id}`}>
										<div className="row align-items-center">
											<div className="col-lg-4">
												<div className="left">
													<Link to={requestUtils.renderRequestURL(val)}>
														{/* <img
												src="assets/images/blog/blog-side-1.jpg"
												alt="image"
											/> */}
														<div
															style={{
																height: '140px',
																backgroundImage: `url(${list[i]?.image_url[0]})`,
																backgroundRepeat: 'no-repeat',
																backgroundSize: 'cover',
																backgroundPosition: 'center',
																borderRadius: '10px',
															}}
														/>
													</Link>

													<span className="tag">
														<Link to={requestUtils.renderRequestURL(val)}>
															{val?.service?.name}
														</Link>
													</span>
												</div>
											</div>

											<div className="col-lg-8">
												<div className="blog-content">
													<h3>
														<Link to={requestUtils.renderRequestURL(val)}>
															{val?.heading}
														</Link>
													</h3>

													<div className="bottom-content d-flex justify-content-between align-items-center">
														<div className="blog-author d-flex align-items-center">
															<img
																src={val?.users_permissions_user?.avatar_url}
																className="rounded-circle"
																alt="image"
															/>
															<span>
																<Link
																	to={`/user/${val?.users_permissions_user?.username}`}
																>
																	{val?.users_permissions_user?.first_name}
																</Link>
															</span>
														</div>

														<p>
															<i className="bx bx-calendar"></i>
															{moment(val?.created_at).fromNow()}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								)
							}
						})}
					</div>
				</div>
			</div>
			<div className="view-properties-btn mt-5">
				<Link to={`/flat/submit`} className="btn bg-accent text-white btn-lg">
					Upload Your Room<span></span>
				</Link>
			</div>
		</div>
	)
}
