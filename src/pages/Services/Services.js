import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout/Layout'
import MetaTags from 'react-meta-tags'
import { useSelector } from 'react-redux'

const Section = styled.section`
	padding-top: 5vh;
`

export default function Services({ match }) {
	localStorage.setItem('after_login', window.location.pathname)
	const [service, setService] = useState(null);
	const { user } = useSelector(state => state.auth);

	useEffect(() => {
		if (match.params?.service) {
			setService(match.params.service)
			document.getElementById(match.params.service).scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'nearest',
			})
		} else {
			setService(null)
		}
	}, [match.params]);

	const formatService = text => {
		return text.replace('_',' ').toUpperCase()
	}

	return (
		<Layout>
			<MetaTags>
				<title>{!service ? "Services": formatService(service)} | Sheruta NG</title>
				<meta property="og:title" content="Services" />
			</MetaTags>
			<Section className='container'>
				<div
					className={`row justify-content-center`}
					style={{ paddingTop: !user ? '10vh' : '' }}
				>
					<div className="col-lg-9 col-sm-12">
						<div className="card shadow-sm rounded-xxl">
							<div className="card-body">
								<h1>
									<b>
										Our service tags were created to ensure that you engage with
										content most relevant to your interest.
									</b>
								</h1>
								<h2>
									We have three service tags….please read to learn how they
									function.
								</h2>
							</div>
						</div>
						<div
							className={`card shadow-sm rounded-xxl mt-3 ${
								service && service === 'for_share' && 'border-3 border-success'
							}`}
							id="for_share"
						>
							<div className="card-body">
								<article>
									<h1>
										<b>For Share</b>
									</h1>
									<p>
										<b>For share —</b> Tag your available spaces or free room(s)
										in your apartment for share using this service tag. Match
										and connect with possible flatmates interested in your post.{' '}
									</p>
									<p>
										You can also use this tag to post a request for the need of
										a private room or space in a flat and get contacted by users
										interested in your request..
									</p>
									<h2>
										<b>Examples of when to use For share?</b>
									</h2>
									<ul>
										<li>
											<p>
												<b>Scenario 1:</b> You have an empty room in your 3
												bedroom flat and you are looking for a flatmate to rent
												the room and split the bills.
											</p>
										</li>
										<li>
											<p>
												<b>Scenario 2:</b> You need someone who already has an
												apartment with an extra room and is looking for a
												flatmate to rent the place.
											</p>
										</li>
									</ul>
									<h2>
										<b>When not to use For share?</b>
									</h2>
									<ul>
										<li>
											<p>
												Do not post that you have an apartment FOR SHARE when
												you currently don't have an apartment or a space you
												occupy.{' '}
											</p>
										</li>
										<li>
											<p>
												Do not use it when you plan on moving out or relocating
												in less than 6 months.
											</p>
										</li>
										<li>
											<p>
												Do not use the FOR SHARE tag when the apartment is still
												in the rental market and has not been rented.
											</p>
										</li>
									</ul>
								</article>
							</div>
						</div>
						<div
							className={`card shadow-sm rounded-xxl mt-3 ${
								service && service === 'join_paddy' && 'border-3 border-success'
							}`}
							id="join_paddy"
						>
							<div className="card-body">
								<article>
									<h1>
										<b>Join-paddy.</b>
									</h1>
									<p>
										Joinpaddy is a new service that gives users the ability to
										tag unoccupied spaces still in the market and also, it gives
										users the opportunity to connect with other users interested
										in finding unoccupied spaces together within a particular
										location.
									</p>
									<h2>
										<b>When to use Join-paddy?</b>
									</h2>
									<ul>
										<li>
											<p>
												<b>Scenario 1:</b> You got access to a 2-bedroom space
												in Lekki phase II through an agent and you are looking
												for a flatmate to share the space with.
											</p>
										</li>
										<li>
											<p>
												<b>Scenario 2:</b> You are looking for a space in Ikeja
												and you are looking for flatmates to pair with and find
												a flat.
											</p>
										</li>
									</ul>
									<h2>
										<b>When not to use Join-paddy?</b>
									</h2>
									<ul>
										<li>
											<p>
												Do not use join-paddy when you already own or have
												rented and currently live in the apartment.
											</p>
										</li>
										<li>
											<p>
												Do not use join-paddy when you aren't the individual in
												need of the space.
											</p>
										</li>
										<li>
											<p>
												Do not use join-paddy when what you need is a private
												room in an already occupied apartment.
											</p>
										</li>
									</ul>
								</article>
							</div>
						</div>
						<div
							className={`card shadow-sm rounded-xxl mt-3 ${
								service && service === 'carry_over' && 'border-3 border-success'
							}`}
							id="carry_over"
						>
							<div className="card-body">
								<article>
									<h1>
										<b>Carry over.</b>
									</h1>
									<p>
										Carry over is a new service that gives users the ability to
										tag “soon to be empty spaces” and apartments, this is best
										suited for users who plan on relocating and need someone to
										take over the space. It also gives the opportunity to earn a
										commission of 10%.
									</p>
									<h2>
										<b>When to use Carry over?</b>
									</h2>
									<ul>
										<li>
											<p>
												<b>Scenario 1:</b> You have a sudden and urgent need to
												relocate to the U.S.A and you just paid rent so you are
												looking for someone to take over the space with months
												spent deducted.
											</p>
										</li>
										<li>
											<p>
												<b>Scenario 2:</b> You are relocating to the island from
												the mainland, your rent expires in three weeks and you
												are looking for someone to take over the space and get a
												commission.
											</p>
										</li>
									</ul>
									<h2>
										<b>When not to use Carry over?</b>
									</h2>
									<ul>
										<li>
											<p>
												Do not use Carry-over when you aren't moving out in less
												than 6 months.
											</p>
										</li>
										<li>
											<p>
												Do not use Carry-over when you don't have access or
												aren’t in contact with your landlord or the individual
												in charge of the space.
											</p>
										</li>
									</ul>
								</article>
							</div>
						</div>
					</div>
				</div>
			</Section>
		</Layout>
	)
}
