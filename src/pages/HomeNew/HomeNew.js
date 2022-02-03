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
import RecentRequests from './components/RecentRequests/RecentRequests'
const Layout = React.lazy(() => import('../../components/Layout/Layout'))
const HomeListing = React.lazy(() => import('./components/HomeListings/HomeListings'))

const Wrapper = styled.div`
	@import url(css);
`

export default function HomeNew() {
	return (
		<Layout>
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
