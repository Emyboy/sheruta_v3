import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import PageLoading from '../../components/PageLoader'
import PageNotFound from '../../pages/PageNotFound'
import PropertiesService from '../../services/PropertiesServices'
import Global from '../../Global'
import axios from 'axios'
import { useSelector } from 'react-redux'
import PropertyDetailsRight from './PropertyDetailsRight'
import SimilarProperties from './SimilarProperties'
import Sticky from 'react-sticky-el'
import PropertyDetailsLeft from './PropertyDetailsLeft'

export default function PropertyDetails(props) {
	console.log("THE PROPS ---",props)
	localStorage.setItem('after_login', window.location.pathname)
	const { user } = useSelector((state) => state.auth)
	const { match, location } = props
	const iconSize = 19
	const { property_id } = match.params
	const [pageState, setPageState] = useState('loading')
	const [data, setData] = useState(location?.state || null)
	const [listLoading, setListLoading] = useState(false)

	useEffect(() => {
		if(location?.state){
			setData(location?.state)
		}
	},[location?.state])

	

	useEffect(async () => {
		console.log('DETAILS --', data)
		if (data) {
			return setPageState('done')
		}
		try {
			const res = await PropertiesService.getPropertyByUidAndID(property_id)
			if (res.data.length === 0) {
				setPageState('not found')
			} else {
				setData(res.data[0])
				setPageState('done')
			}
		} catch (error) {
			setPageState('not found')
			return Promise.reject(error)
		}
	}, [property_id])

	if (pageState === 'loading') {
		return <PageLoading />
	} else if (pageState === 'not found') {
		return <PageNotFound />
	} else if (data && pageState !== 'loading') {
		return (
			<Layout>
				<div className="row pb-5" style={{ paddingTop: user ? '0vh' : '10vh' }}>
					<div className="col-xl-8 col-xxl-9 col-lg-8">
						<PropertyDetailsLeft data={data} done={e => setData(e)} />
					</div>
					<div className="col-xl-4 col-xxl-3 col-lg-4 ps-0">
						<Sticky
							stickyStyle={{
								zIndex: 10,
								marginTop: Global.isMobile ? '6vh' : '11vh',
							}}
						>
							<PropertyDetailsRight data={data} />
							<SimilarProperties data={data} />
						</Sticky>
					</div>
				</div>
			</Layout>
		)
	} else {
		return <PageNotFound />
	}
}
