import React from 'react'
import { BiRocket, BiCommentDetail } from 'react-icons/bi'
import { BsShieldCheck } from 'react-icons/bs'
import { IoWarningOutline } from 'react-icons/io5'
import { RiUserSearchLine, RiHome4Fill } from 'react-icons/ri'
import { BsHash, BsHouseDoor, BsFillChatSquareFill } from 'react-icons/bs'
import { BiHelpCircle } from 'react-icons/bi'
import { MdElectricalServices, MdWorkOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/strapi_actions/auth.actions'
import Global from '../../Global'
import { FaCrown, FaTag } from 'react-icons/fa'
import { IoBagCheck, IoCalendarNumberSharp } from 'react-icons/io5'
import { AiOutlineCalendar } from 'react-icons/ai'
import { useSelector } from 'react-redux'

export default function SideNav({ show }) {
	const { personal_info } = useSelector((state) => state.view)
	const { user } = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const size = 25
	return (
		<nav className={`pb-5 navigation scroll-bar ${show && 'nav-active'}`}>
			<div className="container ps-0 pe-0">
				<div className="nav-content mb-5" style={{ height: '100vh' }}>
					<div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
						<div className="nav-caption fw-600 font-xssss text-grey-500">
							<span>Get </span>Started
						</div>
						<ul className="mb-1 top-content">
							<li className="logo d-none d-xl-block d-lg-block"></li>
							{!user?.user?.is_verified && (
								<li>
									<Link to="/start" className="nav-content-bttn open-font">
										<i className=" btn-round-md bg-blue-gradiant me-3">
											<BiRocket size={size} />
										</i>
										<span>Get Started</span>
									</Link>
								</li>
							)}

							{/* <li>
								<Link to="/requests" className="nav-content-bttn open-font">
									<i className=" btn-round-md bg-red-gradiant me-3">
										<BiCommentDetail size={size} />
									</i>
									<span>Requests</span>
								</Link>
							</li> */}

							<li>
								<Link
									to={`${
										// personal_info?.location_keyword
										// 	? `/discussion/room/${personal_info?.location_keyword?.id}`
										// 	:
										`/discussion`
									}`}
									className="nav-content-bttn open-font"
								>
									<i className="btn-round-md bg-mini-gradiant me-3">
										<BsFillChatSquareFill size={size} />
									</i>
									<span>Discussions</span>
								</Link>
							</li>
							<li>
								<Link
									to={
										personal_info && personal_info?.location_keyword
											? `/flats/?location=${personal_info?.location_keyword?.slug}`
											: '/flats'
									}
									className="nav-content-bttn open-font"
								>
									<i className="btn-round-md bg-gold-gradiant me-3">
										<RiHome4Fill size={size} />
									</i>
									<span>Properties</span>
								</Link>
							</li>
							<li>
								<Link to="/inspections" className="nav-content-bttn open-font">
									<i className="btn-round-md bg-current me-3">
										<IoCalendarNumberSharp size={size} />
									</i>
									<span>Inspections</span>
									{/* <span className="circle-count bg-danger font-xssss mt-0">
										3
									</span> */}
								</Link>
							</li>

							<li>
								<Link to="/pricing" className="nav-content-bttn open-font">
									<i className=" btn-round-md bg-gold-gradiant me-3">
										<FaCrown size={size} />
									</i>
									<span>Premium</span>
								</Link>
							</li>
							<li>
								<Link to="/services" className="nav-content-bttn open-font">
									<i className="btn-round-md bg-mini-gradiant me-3">
										<IoBagCheck size={size} />
									</i>
									<span>Services</span>
								</Link>
							</li>
						</ul>
					</div>

					<div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2">
						<div className="nav-caption fw-600 font-xssss text-grey-500">
							<span>More </span>Pages
						</div>
						<ul className="mb-3">
							{process.env.NODE_ENV === 'development' && (
								<>
									<li>
										<Link to={`/trends`} className="nav-content-bttn open-font">
											<i className="font-xl text-current me-3">
												<BsHash />
											</i>
											<span>Trends</span>
										</Link>
									</li>
									<li>
										<Link to={`/help`} className="nav-content-bttn open-font">
											<i className="font-xl text-current me-3">
												<BiHelpCircle />
											</i>
											<span>Help</span>
										</Link>
									</li>
								</>
							)}
							<li>
								<Link to={`/our-rules`} className="nav-content-bttn open-font">
									<i className="font-xl text-current me-3">
										<IoWarningOutline />
									</i>
									<span>Our Rules</span>
								</Link>
							</li>
							<li>
								<Link
									to={`/how-it-works`}
									className="nav-content-bttn open-font"
								>
									<i className="font-xl text-current me-3">
										<RiUserSearchLine />
									</i>
									<span>How It Works</span>
								</Link>
							</li>
							{/* <li>
								<Link to="/about" className="nav-content-bttn open-font">
									<i className="font-xl text-current me-3">
										<MdWorkOutline />
									</i>
									<span>About Us</span>
								</Link>
							</li> */}
							<li>
								<Link to="/terms" className="nav-content-bttn open-font">
									<i className="font-xl text-current me-3">
										<BsShieldCheck />
									</i>
									<span>Term and Conditions </span>
								</Link>
							</li>
							{/* <li>
								<a className="nav-content-bttn open-font">
									<i className="font-xl text-current feather-youtube me-3"></i>
									<span>Live Stream</span>
								</a>
							</li> */}
						</ul>
					</div>
					<div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
						<div className="nav-caption fw-600 font-xssss text-grey-500">
							<span></span> Account
						</div>
						<ul className="mb-1">
							<li className="logo d-none d-xl-block d-lg-block"></li>
							<li>
								<a className="nav-content-bttn open-font h-auto pt-2 pb-2">
									<i className="font-sm feather-pie-chart me-3 text-grey-500"></i>
									<span>Analytics</span>
									<span className="circle-count bg-info mt-0">Coming Soon</span>
								</a>
							</li>
							<li>
								<Link
									to="/settings"
									className="nav-content-bttn open-font h-auto pt-2 pb-2"
								>
									<i className="font-sm feather-settings me-3 text-grey-500"></i>
									<span>Settings</span>
								</Link>
							</li>
							<li>
								<a
									className="nav-content-bttn open-font h-auto pt-2 pb-2"
									onClick={() => {
										dispatch(logout())
										window.location.reload()
									}}
								>
									<i className="font-sm feather-power me-3 text-grey-500"></i>
									<span>Logout</span>
								</a>
							</li>
							{Global.isMobile && <div style={{ height: '20vh' }}></div>}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	)
}
