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


const Wrapper = styled.div``

export default function Home() {
	return (
		<Layout>
			<Wrapper className="mb-5">
				<div
					className="jumbotron bg-white home-one home1_bgi1"
					style={{
						marginTop: '10vh',
						paddingTop: '30vh',
					}}
				>
					<div className="container-fluid d-flex justify-content-start align-items-center">
						<div className="z-index-1">
							<h1 style={{ fontSize: '4rem', zIndex: 5 }} className="text-dark">
								Find A Verified Flat Mate
							</h1>
							<h2 style={{ fontSize: '2rem' }}>Submit your property today.</h2>
							<button className="btn bg-current text-white shadow btn-lg mt-3">
								Get Started
							</button>
						</div>
						<img src={man} style={{ position: 'absolute', right: '2vw' }} />
						<img
							src={balls}
							className="z-index-0"
							style={{ position: 'absolute', left: '20vw', top: '20vh' }}
						/>
					</div>
				</div>
				<HowToUse />
				<ExploreByPopularCity />
				<div className="container mt-6 card border-0 rounded shadow">
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
								<button className="btn btn-lg bg-theme shadow text-white mt-2">
									Get Started
								</button>
							</div>
							<div className="col-lg-5 col-sm-12 mt-3 mb-3">
								<img src={community} />
							</div>
						</div>
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
// import Partners from '../../assets/img/partners.png'
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
