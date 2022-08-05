import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import Footer from '../../../components/Footer'
import Layout from '../../../components/Layout/Layout'
import AboutNew from '../../HomeNew/components/AboutNew'
import OurNumbers from '../../HomeNew/components/OurNumbers'
import AgentHero from './components/AgentHero'
import AgentReview from './components/AgentReview'

export default function AgentLanding() {
	const { user } = useSelector(state => state.auth);

	if(user){
		return <Redirect to='/' />
	}

	return (
		<Layout>
			<Helmet>
				<title>Become An Agent | Sheruta</title>
			</Helmet>
			<div>
				<AgentHero />
				<AboutNew
					heading={'Become an partner'}
					bodyComponent={
						<>
							<p>
								There has been a recent increase in the demand for shared
								spaces, become a partner agent to meet this demand.
							</p>
							<p>
								List available room and apartments in your area of operation and
								get verified working class occupants for your properties. Click
								on button below to begin registration
							</p>
						</>
					}
					// ctaText="Post Now"
					// ctaURL={'/flat/submit'}
				/>
				<AgentReview />
				<OurNumbers />
			</div>
			<Footer />
		</Layout>
	)
}
