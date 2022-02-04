import React, { useState } from 'react'
import Avatar from 'antd/lib/avatar/avatar'
import moment from 'moment'
import { Tag } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import Global from '../../Global'
import requestUtils from '../../utils/request.utils'
import { IoCall } from 'react-icons/io5'

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps)(function EachRequest({
	data,
	auth,
	standalone,
}) {
	const [state, setState] = useState({
		length: false,
		confirmDelete: false,
		deleted: false,
	})

	const handleDelete = () => {
		setState({ ...state, loading: true })
		axios(process.env.REACT_APP_API_URL + '/property-requests/' + data?.id, {
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + auth.user.jwt,
			},
		})
			.then((res) => {
				setState({ ...state, loading: false, deleted: true })
				// console.log(res)
				// $(`#request-${val.id}`).hide(500)
			})
			.catch((err) => {
				setState({ ...state, loading: false })
				// console.log(err)
			})
	}

	return (
		<>
			<article className="col-lg-4">
				<div className="testimonial-grid bg-white p-3 rounded-xxl mb-3">
					{data?.category && (
						<span className="social-media text-theme">
							{data?.category.name.toUpperCase().split(' ')[0]}
						</span>
					)}
					<Link to={standalone ? '#' : requestUtils.renderRequestURL(data)}>
						<p className="mb-2">
							“{' '}
							{data?.body?.length > 60
								? data?.body.slice(0, 60) + '...'
								: data?.body}{' '}
							<small className="text-theme">Read More</small>”
						</p>
					</Link>
					<small>{data?.location?.slice(0, 40)}...</small>
					<div className="author-info pt-3">
						<div className="thumb">
							<img
								src={data?.users_permissions_user?.avatar_url}
								width="60"
								alt="Google Review"
							/>
						</div>
						<Link
							to={
								standalone
									? '#'
									: `/user/${data?.users_permissions_user.username}`
							}
							className="content"
						>
							<span className="name">
								{data?.users_permissions_user?.first_name}
							</span>
							<span className="designation">
								@{data?.users_permissions_user?.username.slice(0, 11)}...
							</span>
						</Link>
						{!standalone && (
							<Link to="/signup">
								<button className="btn text-white shadow-sm bg-theme fw-bold btn-sm">
									<IoCall className="mr-2" />
									Call Me
								</button>
							</Link>
						)}
					</div>
				</div>
			</article>
			{/* {state.confirmDelete ? (
				<div
					className={` single-comment bg-dark  card  p-4 text-center m-2 shadow ${
						state.deleted ? 'animated animate__fadeOutRightBig' : 'show'
					}`}
				>
					<h6 className="text-white">Are you sure you want to delete?</h6>
					<div
						className="btn-group"
						style={{ alignSelf: 'center' }}
						role="group"
						aria-label="Basic example"
					>
						<button
							disabled={state.loading}
							type="button"
							className="btn btn-danger"
							onClick={handleDelete}
						>
							{state.loading ? 'Loading...' : 'Delete'}
						</button>
						<button
							disabled={state.loading}
							type="button"
							className="btn btn-info"
							onClick={() => setState({ ...state, confirmDelete: false })}
						>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<article
					className={`card rounded-xxl  p-2 rounded border ${
						!standalone ? 'mb-3' : 'shadow'
					} border-gray `}
				>
					<div className="comment-details pl-3" style={{ height: Global.isMobile ? '250px':'200px' }}>
						{data?.users_permissions_user ? (
							<div className="comment-meta d-flex">
								<div
									className="article_comments_thumb"
									style={{ width: '60px' }}
								>
									<Link
										to={
											standalone
												? '#'
												: `/user/${data?.users_permissions_user.username}`
										}
									>
										<Avatar
											src={data?.users_permissions_user.avatar_url}
											size={50}
										/>
									</Link>
								</div>
								<div className="comment-left-meta">
									<Link
										to={
											standalone
												? '#'
												: `/user/${data?.users_permissions_user.username}`
										}
									>
										<h4
											className="author-name mb-1"
											style={{ fontSize: '20px' }}
										>
											{data?.users_permissions_user.first_name}
										</h4>
									</Link>
									<div className="comment-date">
										{moment(data?.created_at).fromNow()}
									</div>
								</div>
							</div>
						) : null}
						<div className="container">
							<div className="mt-2 d-flex">
								{data?.category ? (
									<Tag color="volcano">{data?.category.name.toUpperCase()}</Tag>
								) : null}
								{data?.service ? (
									<Tag color="cyan">{data?.service.name.toUpperCase()}</Tag>
								) : null}
							</div>
						</div>
						<div className="comment-text mt-1">
							<p>
								{data?.body?.length > 90
									? data?.body.slice(0, 90) + '...'
									: data?.body}
							</p>
						</div>
						{!standalone && <hr className="mt-1 mb-1" />}
						{data?.users_permissions_user && !standalone ? (
							<div className="d-flex justify-content-between">
								<>
									{auth.user &&
									auth.user.user.id === data?.users_permissions_user.id ? (
										<span>
											<i
												onClick={() =>
													setState({
														...state,
														confirmDelete: true,
													})
												}
												className="fa fa-trash link text-theme ml-4"
											></i>
										</span>
									) : (
										<a
											href={`tel:${data?.users_permissions_user.phone_number}`}
										>
											{auth.user ? (
												<span
													className="badge badge-danger"
													style={{ fontSize: '15px' }}
												>
													<i className="ti-mobile"></i> Call Me
												</span>
											) : (
												<Link
													to="/login"
													className="badge badge-danger"
													style={{ fontSize: '15px' }}
												>
													<i className="ti-mobile"></i> Call Me
												</Link>
											)}
										</a>
									)}
								</>
								{!standalone && (
									<Link
										to={requestUtils.renderRequestURL(data)}
										className="text-theme"
									>
										View More Details
									</Link>
								)}
							</div>
						) : null}
					</div>
				</article>
			)} */}
		</>
	)
})
