import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { notification, Tooltip } from 'antd'
import { BsPeople } from 'react-icons/bs'
import moment from 'moment'
import logo from '../../assets/img/logo.png'
import Global from '../../Global';
import PaymentAlert from '../PaymentAlert/PaymentAlert'
import Sticky from 'react-sticky-el';

const NavWrapper = styled.ul`
	li > a {
		font-size: 20px !important;
		font-weight: 600 !important;
		padding-bottom: 9px;
	}
`

const iconSize = 25

export default function Header({
	onNavToggle,
	showNav,
	onChatToggle,
	showChat,
	pageName,
}) {
	const { user_suggestions } = useSelector((state) => state.alice)
	const { user } = useSelector((state) => state.auth)
	const { notifications, messages, payment_plan } = useSelector(
		(state) => state.view
	)
	const [showNotification, setNotification] = useState(false)

	if (!user) {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light bg-white shadow-xs border-0" style={{ zIndex: 39 }}>
				<div className="container-fluid">
					<Link to="/">
						<a className="navbar-brand">
							<img src={logo} alt="sheruta logo" width="150" height="40" />
						</a>
					</Link>
					<button
						className="navbar-toggler border-0"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<NavWrapper className="mt-2 navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link to="/">
									<a className="nav-link" aria-current="page">
										Home
									</a>
								</Link>
							</li>
							<li className="nav-item">
								{/* <Link to={`/signup`}>
									<a className="nav-link">Post Your Property</a>
								</Link> */}
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									Our Services
								</a>
								<ul
									className="dropdown-menu dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow hide"
									aria-labelledby="navbarDropdown"
								>
									<li>
										<Link className="dropdown-item" to="/services/for_share">
											For Share
										</Link>
									</li>
									<li>
										<Link className="dropdown-item" to="/services/join_paddy">
											Join Paddy
										</Link>
									</li>
									<li>
										<Link className="dropdown-item" to='/services/carry_over'>Carry Over</Link>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<a className="dropdown-item" href="tel:08138154470">
											Call Us
										</a>
									</li>
								</ul>
							</li>
							<li className="nav-item">
								<Link to={`/about`}>
									<a className="nav-link">About Us</a>
								</Link>
							</li>
							{/* <li className="nav-item">
								<Link to={`/pricing`}>
									<a className="nav-link">Pricing</a>
								</Link>
							</li> */}
						</NavWrapper>
						<form className="d-flex">
							<Link to="/login">
								<a className="header-btn d-lg-block bg-dark fw-500 text-white font-xsss ms-auto w100 text-center lh-20 rounded pl-4 pr-4 pt-3 pb-3 ">
									Login
								</a>
							</Link>
							<Link to="/signup">
								<a className="header-btn  d-lg-block bg-current fw-500 text-white font-xsss ms-2 w100 text-center lh-20 rounded pl-4 pr-4 pt-3 pb-3">
									Register
								</a>
							</Link>
						</form>
					</div>
				</div>
			</nav>
		)
	} else
		return (
			<div
				className="nav-header bg-white shadow-xs border-0"
				style={{ zIndex: 80 }}
			>
				<div className="nav-top">
					<a>
						<Link to="/feeds">
							<span>
								{/* <i className="feather-box text-success display1-size me-2 ms-0"></i> */}
								<span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
									{/* Sheruta.{' '} */}
									<img
										// className="mt-3 pb-3"
										src={logo}
										alt="sheruta logo"
										width={Global.isMobile ? '150' : '180'}
										height={Global.isMobile ? '30' : '45'}
									/>
								</span>{' '}
							</span>
						</Link>
					</a>
					<a
						className="mob-menu ms-auto me-2 chat-active-btn"
						onClick={onChatToggle}
					>
						{messages.length > 0 && (
							<small className="badge badge-danger position-fixed">
								{messages.length}
							</small>
						)}
						<i
							className={`${
								showChat ? 'feather-x' : 'feather-mail'
							} text-grey-900 font-sm btn-round-md bg-greylight`}
						></i>
					</a>
					{/* <a className="mob-menu me-2">
						<i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i>
					</a> */}
					<Link to={'/search'} className="me-2 menu-search-icon mob-menu">
						<i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i>
					</Link>

					<button
						className={`nav-menu me-0 ms-2 ${showNav && 'active'}`}
						onClick={onNavToggle}
					></button>
				</div>

				<form action="#" className="float-left header-search">
					{/* <div className="form-group mb-0 icon-input">
						<i className="feather-search font-sm text-grey-400"></i>
						<input
							type="text"
							placeholder="Start typing to search.."
							className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg"
						/>
					</div> */}
				</form>
				<Link to={`/feeds`}>
					<Tooltip placement="bottom" title={'Home'}>
						<a className="p-2 text-center ms-3 menu-icon center-menu-icon">
							<i
								className={`feather-home font-lg alert-primary btn-round-lg theme-dark-bg ${
									pageName === 'feeds'
										? 'text-current'
										: 'text-grey-500 bg-greylight'
								}`}
							></i>
						</a>
					</Tooltip>
				</Link>
				<Link to="/flat/submit">
					<Tooltip placement="bottom" title={'Submit Flat'}>
						<a className="p-2 text-center ms-0 menu-icon center-menu-icon">
							<i
								className={`feather-plus font-lg alert-primary btn-round-lg theme-dark-bg ${
									pageName === 'requests'
										? 'text-current'
										: 'text-grey-500 bg-greylight'
								}`}
							></i>
						</a>
					</Tooltip>
				</Link>

				<Link to="/match">
					<Tooltip placement="bottom" title={'Your Match'}>
						<a className="p-2 text-center ms-0 menu-icon center-menu-icon">
							{user_suggestions && user_suggestions.length > 0 && (
								<span className="badge badge-danger position-fixed">
									{user_suggestions.length}
								</span>
							)}
							<i
								className={`font-lg alert-primary btn-round-lg theme-dark-bg  ${
									pageName === 'match'
										? 'text-current'
										: 'text-grey-500 bg-greylight'
								} `}
							>
								<BsPeople size={iconSize} />
							</i>
						</a>
					</Tooltip>
				</Link>
				<Link to="/search">
					<Tooltip placement="bottom" title={'Search'}>
						<a className="p-2 text-center ms-0 menu-icon center-menu-icon">
							<i
								className={`feather-search font-lg alert-primary btn-round-lg theme-dark-bg ${
									pageName === 'search'
										? 'text-current'
										: 'text-grey-500 bg-greylight'
								} `}
							></i>
						</a>
					</Tooltip>
				</Link>

				<a
					className="p-2 text-center ms-auto menu-icon link"
					id="dropdownMenu3"
					data-bs-toggle="dropdown"
					aria-expanded="false"
					onClick={() => setNotification(!showNotification)}
				>
					<Link to={`/notifications`}>
						<span>
							{notifications &&
								notifications.filter((x) => !x.seen).length > 1 && (
									<span className="dot-count bg-danger"></span>
								)}
							<i className="feather-bell font-xl text-current"></i>
						</span>
					</Link>
				</a>
				<div
					className={`dropdown-menu dropdown-menu-end p-4 rounded-3 border-0 shadow-lg ${
						showNotification && 'show'
					}`}
					aria-labelledby="dropdownMenu3"
					style={{ right: '9vw', width: '350px' }}
				>
					<h4 className="fw-700 font-xss mb-4">Notification</h4>
					{!payment_plan ? (
						<PaymentAlert />
					) : (
						<>
							{notifications.map((val, i) => {
								if (i > 6) {
									return null
								}
								const otherUser = val?.users_permissions_user
								const user = val?.owner
								return (
									<div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
										<img
											src={
												otherUser?.avatar_url || Global.USER_PLACEHOLDER_AVATAR
											}
											alt="user"
											className="w40 position-absolute left-0"
										/>
										<Link to={otherUser ? `/user/${otherUser?.username}` : '#'}>
											<h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
												{otherUser?.first_name || 'Someone'}{' '}
												<span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
													{' '}
													{moment(val?.created_at).fromNow()}
												</span>
											</h5>
										</Link>
										<h6 className="text-grey-500 fw-500 font-xssss lh-4">
											{val?.title}
										</h6>
									</div>
								)
							})}
							<div className="text-center">
								<Link to="/notifications">View All</Link>
							</div>
						</>
					)}
				</div>

				<a
					className="p-2 text-center ms-3 menu-icon chat-active-btn link"
					onClick={onChatToggle}
				>
					{messages.length > 0 && <span className="dot-count bg-danger"></span>}
					<i className="feather-message-square font-xl text-current"></i>
				</a>

				<Link to="/settings">
					<div className="p-2 text-center ms-3 position-relative dropdown-menu-icon menu-icon cursor-pointer">
						<i className="feather-settings animation-spin d-inline-block font-xl text-current"></i>
					</div>
				</Link>

				{user && (
					<Link to={`/user/${user?.user.username}`}>
						<a className="p-0 ms-3 menu-icon">
							<img
								src={user.user?.avatar_url}
								alt="user"
								className="w40 mt--1"
								style={{ borderRadius: '50px' }}
							/>
						</a>
					</Link>
				)}
			</div>
		)
}
