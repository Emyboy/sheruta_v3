import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../../../components/Footer'
import Layout from '../../../components/Layout/Layout'
import AboutNew from '../../HomeNew/components/AboutNew'
import OurNumbers from '../../HomeNew/components/OurNumbers'
import AgentHero from './components/AgentHero'
import AgentReview from './components/AgentReview'

export default function AgentLanding() {
	return (
		<Layout>
            <Helmet>
                <title>Become An Agent | Sheruta</title>
            </Helmet>
			<div>
				<AgentHero />
				<AboutNew />
				<AgentReview />
				<OurNumbers />
			</div>
			<Footer />
		</Layout>
	)
}
