import React from 'react'
import { useEffect } from 'react'
import { FaCrown, FaUserSlash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import Global from '../../Global'
import { findPerfectMatch } from '../../redux/strapi_actions/contact.actions'
import EachMatch from './EachMatch'

export default function Match() {
	const { matches } = useSelector((state) => state?.contact)
	const { payment_plan } = useSelector((state) => state?.view)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(findPerfectMatch())
		localStorage.setItem("after_payment", window.location.pathname)
	}, [dispatch])

	return (
		<Layout full_screen>
			<div
				className="bg-accent"
				style={{
					paddingTop: Global.isMobile ? '13vh' : '10vh',
					paddingBottom: '20vh',
				}}
			>
				{!payment_plan ? (
					<PremiumError />
				) : (
					<div>
						{matches?.length > 0 ? (
							<div className="section-title">
								<h3 className="text-white">99% Match</h3>
								<p className="text-grey-500">
									These are people you match with 99%
								</p>
							</div>
						) : null}
						<div className="d-flex mt-3 scroll-bar">
							{matches
								?.sort(
									(a, b) => new Date(b?.updated_at) - new Date(a?.updated_at)
								)
								.map((val) => {
									return (
										<EachMatch
											key={`match-${val?.id}`}
											data={val}
											done={() => {
												dispatch(findPerfectMatch())
											}}
										/>
									)
								})}
						</div>
						{matches?.length === 0 && <NoMatches />}
					</div>
				)}
			</div>
		</Layout>
	)
}

const NoMatches = () => {
	const { personal_info } = useSelector((state) => state?.view)

	return (
		<div
			style={{ height: '80vh', paddingTop: '10vh' }}
			className="d-flex justify-content-center mt-5"
		>
			<div className="text-center">
				<FaUserSlash size={80} className="text-grey-600 mb-3" />
				<h3 className="text-grey-600">You don't have any matches</h3>
				{!personal_info?.location_keyword && (
					<div
						className=" mt-5 alert alert-info alert-dismissible fade show"
						role="alert"
					>
						Updating and verifying your profile will match you with more people{' '}
						<br />
						<Link to={`/settings/location-keyword`}>
							<strong>Update Here</strong>
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

const PremiumError = () => {
	return (
		<div className="container">
			<div
				className="text-center"
				style={{ height: '65vh', paddingTop: '15vh' }}
			>
				<FaCrown className="text-warning mb-3" size={80} />
				<h1 className="text-grey-400 font-xl">Get Premium</h1>
				<h4 className="text-grey-400">
					Get to meet hundreds of potential flatmates today.
				</h4>
				<Link to={`/pricing`} className="default-btn btn-sm mt-5 fw-bold">Get Premium</Link>
			</div>
		</div>
	)
}
