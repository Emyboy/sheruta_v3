import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Footer from '../../components/Footer'
import Layout from '../../components/Layout/Layout'
import AboutNew from './components/AboutNew'
import HomeFeatures from './components/HomeFeatures'
import HomeHero from './components/HomeHero'
import HomeJoinPaddy from './components/HomeJoinPaddy'
import LocationKeywords from './components/LocationKeywords'
import RecentHomeRequest from './components/RecentHomeRequests/RecentHomeRequest'
import RecentProperties from './components/RecentProperties'
import HomeReviews from './HomeReviews'
import P2pProperties from './P2pProperties'

export default function HomeNew() {
	const { user } = useSelector((state) => state.auth)
	const router = useHistory()
	React.useEffect(() => {
		if (user) {
			router.push('/feeds')
		}
	}, [])
	return (
		<Layout>
			<Helmet>
				<title>Flats for share in Lekki, Yaba, Surulere | Sheruta</title>
			</Helmet>
			<HomeHero />
			<RecentHomeRequest />
			<HomeJoinPaddy />
			<RecentProperties />
			<P2pProperties />
			<AboutNew
				heading={'Why Post Your Space?'}
				bodyComponent={
					<>
						<p>
							Vet and select verified prospective flatmates and occupants within
							the community, from professionals to entrepreneurs and students,
							the choice is yours. click button below to get started.
						</p>
						<p>
							Vet and select verified prospective flatmates and occupants within
							the community, from professionals to entrepreneurs and students,
							the choice is yours. click button below to get started.
						</p>
					</>
				}
				ctaText="Post Now"
				ctaURL={'/flat/submit'}
			/>
			<HomeFeatures />
			<HomeReviews />
			<LocationKeywords />
			<Footer />
		</Layout>
	)
}
