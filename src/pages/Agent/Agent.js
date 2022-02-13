import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import Layout from '../../components/Layout/Layout'
import Global from '../../Global'
import bg from './agent_bg.png';
import { Helmet } from 'react-helmet'

export default function Agent() {
	const { user } = useSelector((state) => state.auth)
	const [done, setDone] = useState(false)
	
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	if (done) {
		localStorage.setItem('after_login', '/agents/signup')
		Cookies.set('agent', true, { expires: 5 })
		return <Redirect to="/signup" />
	}


	return (
		<Layout>
			<Helmet>
				<title>For Agents</title>
				<meta
					name="description"
					content="Register as a real estate agent"
				></meta>
			</Helmet>
			<div
				className={`jumbotron bg-accent card text-center `}
				style={{
					// marginTop: user ? '20px' : '100px',
					backgroundImage: `url(${bg})`,
					backgroundSize: Global.isMobile ? '200% 100%' : 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<div style={{ marginBottom: '20vh', marginTop: '30vh' }}>
					<h1 className="text-white fw-bold" style={{ fontSize: '50px' }}>
						Partner with us today
					</h1>
					<h1 className="text-white">Register as a real estate agent</h1>
					<button
						className="btn btn-lg fw-bold bg-theme mt-3 text-white"
						onClick={() => setDone(true)}
					>
						Register
					</button>
				</div>
			</div>
		</Layout>
	)
}
