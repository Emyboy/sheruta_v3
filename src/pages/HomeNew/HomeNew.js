import React from 'react'
// import Layout from '../../components/Layout/Layout'
import AboutUs from './components/AboutUs'
import HomeJumbo from './components/HomeJumbo'
import HowItWorks from './components/HowItWorks'
import LookingForFlat from './components/LookingForFlat'
import OurNumbers from './components/OurNumbers'
import OurServices from './components/OurServices'
import styled from 'styled-components';
import '../../joel_ui/css/app.css';
import RecentRequests from './components/RecentRequests/RecentRequests';
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

import SocialHomePage from '../../components/Social/SocialHomePage/SocialHomePage'
import { Redirect } from 'react-router'

const Layout = React.lazy(() => import('../../components/Layout/Layout'))
const HomeListing = React.lazy(() => import('./components/HomeListings/HomeListings'))

const Wrapper = styled.div`
	@import url(css);
`

export default function HomeNew() {

	const {user} =  useSelector(state => state.auth);

	if(user){
		return <Redirect to='/feeds' />
	}

	return (
		<Layout>
			<Helmet>
				<title>Home | Sheruta NG</title>
				<meta name="description" content="Fine verified flat mates today." />
			</Helmet>
			<Wrapper className="main-wrapper" id="main-wrapper">
				<div className="pt-5">
					<HomeJumbo />
					<AboutUs />
					<OurServices />
					<HowItWorks />
					<HomeListing />
					<RecentRequests />
					<LookingForFlat />
					<OurNumbers />
				</div>
			</Wrapper>
		</Layout>
	)
}
