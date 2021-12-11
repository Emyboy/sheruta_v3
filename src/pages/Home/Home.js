import React from 'react'
import styled from 'styled-components'
import HowToUse from './HowToUse'
import man from '../../assets/img/man-sitting.svg'
import floatLarge from '../../assets/img/float-large.svg'
import balls from '../../assets/img/floating-pebbles.svg'
import community from '../../assets/img/community.svg'
import Layout from '../../components/Layout/Layout'
import Footer from '../../components/Footer'
import ExploreByPopularCity from './Graphics'
import Partners from '../../assets/img/partners.png'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import Global from '../../Global'
import { Link } from 'react-router-dom';
import WhatPeopleSay from './WhatPeopleSay'

const Wrapper = styled.div`
	.jumbotron {
		margin-top: 10vh;
		padding-top: 30vh;
		height: 90vh;
	}

	@media (max-width: 1476px) {
		.jumbotron {
			margin-top: 0;
			margin-top: 5vh;
			padding-top: 30vh;
			height: ${Global.isMobile ? '90vh' : '100vh'};
			background-image: url('https://www.pngkit.com/png/full/11-114242_technology-pattern-png-png-freeuse-vancouver.png');
			background-position: 36vw;
			background-repeat: no-repeat;
			img {
				display: none;
			}
		}
		/* .man {
			top: 3vh;
			left: 51vw;
			width: 80vw;
			position: absolute;
		}
		.floating-balls {
			width: 400px;
			top: 70vh !important;
			left: 60vw !important;
		} */
	}
`

export default function Home() {
	const { user } = useSelector((state) => state.auth)
	if (user) {
		return <Redirect to={'/feeds'} />
	}
	return (
		<Layout>
			<Wrapper className="mb-5">
				<article className="jumbotron bg-white home-one home1_bgi1">
					<div className="container-fluid d-flex justify-content-start align-items-center">
						<div className="z-index-1">
							<h1
								style={{
									fontSize: Global.isMobile ? '2rem' : '4rem',
									zIndex: 5,
								}}
								className="text-dark animate__animated animate__fadeInLeft"
							>
								<b>Find A Verified Flat Mate</b>
							</h1>
							<h2
								style={{ fontSize: Global.isMobile ? '' : '2rem' }}
								className="animate__animated animate__fadeInUp"
							>
								Submit your property today.
							</h2>
							<Link
								className="btn bg-theme text-white btn-lg shadow mt-3 animate__animated animate__fadeInUp"
								to="/start"
							>
								Get Started
							</Link>
						</div>
						<img
							src={man}
							style={{ position: 'absolute', right: '2vw' }}
							className="man animate__animated animate__fadeInRight"
						/>
						<img
							src={balls}
							className="z-index-0 floating-balls animate__animated animate__fadeInUp"
							style={{
								position: 'absolute',
								left: '10vw',
								top: '30vh',
								width: '70vw',
							}}
						/>
					</div>
				</article>
				<HowToUse />
				<ExploreByPopularCity />
				<article className="container mt-6 card border-0 rounded shadow-sm pt-4 pb-4">
					<div
						style={{
							backgroundPosition: 'top',
						}}
					>
						<div className="card-body row justify-content-between align-items-center">
							<div className="col-lg-6 col-sm-12">
								<h2 style={{ fontSize: '40px' }}>
									<strong>Looking for a flat to share?</strong>
								</h2>
								<h2>We've got you covered</h2>
								<h3 className="mt-3 mb-3">
									Join the community, post a request and peer with other like
									minded individuals
								</h3>
								<Link
									className="btn bg-theme text-white btn-lg shadow"
									to="/start"
								>
									Get Started
								</Link>
							</div>
							<div className="col-lg-5 col-sm-12 mt-3 mb-3">
								<img src={community} width={'90%'} className="mt-4" />
							</div>
						</div>
					</div>
				</article>
				<div className="container mt-5">
					<WhatPeopleSay />
				</div>
				<div className="container">
					<div className="text-center mb-5" style={{ marginTop: '10vh' }}>
						<h2 className="mb-3 text-gray" style={{ fontSize: '40px' }}>
							<b>Our Partners</b>
						</h2>
						<img src={Partners} width="90%" />{' '}
					</div>
				</div>
			</Wrapper>
			<Footer />
		</Layout>
	)
}

// import React, { useEffect, useState } from 'react'
// import Heading from '../../components/Heading/Heading'
// import PropertyCard from '../../components/PropertyCard/PropertyCard'
// import HowToUse from './HowToUse'
// import WhatPeopleSay from './WhatPeopleSay'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import Btn from '../../components/Btn/Btn'
// import EachRequest from '../../components/EachRequest/EachRequest'
// import Global from '../../Global'
// import PropertyCardSM from '../../components/PropertyCard/PropertyCardSM'
// import { connect } from 'react-redux'
// import SocailHomePage from '../../components/Social/SocialHomePage/SocialHomePage'
// import match from '../../assets/img/match.jpeg'
// // import FreeRequestAds from '../../components/Ads/RequestAds/FeeRequestAds'

// import OurServices from '../../components/OurServices/OurServices'
// import { Redirect } from 'react-router'

// const Home = (props) => {
// 	const { view, auth } = props
// 	const { user } = auth
// 	const [state, setState] = useState({
// 		properties: [],
// 		list: [],
// 	})

// 	useEffect(() => {
// 		if (state.properties.length === 0) {
// 			axios(
// 				process.env.REACT_APP_API_URL +
// 					`/properties/recent/${Global.isMobile ? '4' : '6'}`
// 			)
// 				.then((res) => {
// 					setState({ ...state, properties: res.data })
// 				})
// 				.catch((err) => {})
// 		}
// 	}, [state])
// 	useEffect(() => {
// 		if (state.list.length === 0) {
// 			axios(
// 				process.env.REACT_APP_API_URL +
// 					`/property-requests/recent/${Global.isMobile ? '4' : '4'}`
// 			)
// 				.then((res) => {
// 					setState({ ...state, list: res.data })
// 				})
// 				.catch((err) => {})
// 		}
// 	}, [state])

// 	if (user) {
// 		return <Redirect to="/feeds" />
// 	} else
// 		return (
// 			<Layout page="home">

// 				<ExploreByPopularCity />
// 				<div className="text-center mb-5">
// 					<h1 className="text-muted">Our Partners</h1>
// 					<img src={Partners} width="800px" />
// 				</div>
// 				{/* <div className="container-fluid">
//                       <div className="row justify-content-center">
//                           <div className="col-sm-12 col-md-6 mb-4">
//                               <FreeRequestAds />
//                           </div>
//                       </div>
//                   </div> */}
// 				{/* {view.app_details
//                       ? view.app_details.everything_free && (
//                         )
//                         : null} */}
// 				{/* <div className="container">
//                       <div className="text-center mb-5">
//                           <img
//                               src={end_sarz}
//                               className="rounded shadow"
//                               width="100%"
//                           />
//                       </div>
//                   </div> */}

// 				<div className="container-fluid">
// 					<div className="row bgc-f7 pt-3">
// 						<div className="col-lg-4 col-md-12 col-sm-12">
// 							<Heading
// 								heading="Recent Requests"
// 								subHeading="These are the most recent requests we have."
// 							/>
// 							<img src={match} className="mb-3 rounded" />

// 							<div className=" pl-0 pr-1">
// 								<div className="block-body">
// 									<div className="author-review">
// 										<div className="comment-list">
// 											<div className="article_comments_wrap">
// 												{state.list.map((val, i) => {
// 													return <EachRequest key={i} data={val} />
// 												})}
// 											</div>
// 										</div>
// 									</div>
// 									<div className="text-center">
// 										<Link
// 											to="/requests/all"
// 											className="reviews-checked theme-cl text-thm"
// 										>
// 											<i className="fas fa-arrow-alt-circle-down mr-2"></i>
// 											See More Requests
// 										</Link>
// 									</div>
// 								</div>
// 							</div>
// 							{Global.isMobile ? <hr /> : null}
// 						</div>
// 						<div className="col-lg-8 col-md-12 col-sm-12">
// 							<Heading
// 								heading="Recent Properties"
// 								subHeading="These are the most recent properties we have."
// 							/>
// 							{/* <hr /> */}
// 							<div className="row">
// 								{state.properties.map((val, i) => {
// 									return Global.isMobile ? (
// 										<PropertyCardSM key={i} val={val} />
// 									) : (
// 										<PropertyCard key={i} data={val} />
// 									)
// 								})}
// 							</div>
// 							<div className="text-center">
// 								<Link
// 									to="/properties"
// 									className="reviews-checked theme-cl btn text-thm"
// 								>
// 									<i className="fas fa-arrow-alt-circle-down mr-2"></i>
// 									See More Properties
// 								</Link>
// 							</div>
// 							{Global.isMobile ? <hr /> : null}
// 						</div>
// 					</div>
// 				</div>
// 				<OurServices />
// 				<WhatPeopleSay />
// 				<Footer />
// 			</Layout>
// 		)
// }

// const mapStateToProps = (state) => ({
// 	auth: state.auth,
// 	view: state.view,
// })

// const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(Home)
