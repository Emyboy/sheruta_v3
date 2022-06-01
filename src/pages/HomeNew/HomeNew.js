import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Layout from '../../components/Layout/Layout'
import AboutNew from './components/AboutNew'
import HomeFeatures from './components/HomeFeatures'
import HomeHero from './components/HomeHero'
import HomeJoinPaddy from './components/HomeJoinPaddy'
import LocationKeywords from './components/LocationKeywords'
import RecentProperties from './components/RecentProperties'

export default function HomeNew() {
	const { user } = useSelector(state => state.auth);
	const router = useHistory()
	React.useEffect(() => {
		if(user){
			router.push('/feeds')
		}
	},[])
	return (
		<Layout>
			<HomeHero />
			<AboutNew />
      <HomeFeatures />
			<RecentProperties />
			<HomeJoinPaddy />
      <LocationKeywords />
		</Layout>
	)
}
