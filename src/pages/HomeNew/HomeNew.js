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
import RecentProperties from './components/RecentProperties'

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
				<title>
					Flats for share in Lagos | Sheruta
				</title>
			</Helmet>
			<HomeHero />
			<AboutNew />
			<HomeFeatures />
			<RecentProperties />
			<HomeJoinPaddy />
			<LocationKeywords />
			<Footer />
		</Layout>
	)
}
