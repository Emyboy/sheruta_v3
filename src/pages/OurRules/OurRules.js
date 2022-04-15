import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'

export default function OurRules() {
	const { user } = useSelector((state) => state.auth)
	return (
		<Layout>
			<div
				className="container"
				style={{ marginTop: user?.user ? '5vh' : '15vh' }}
			>
				<div className="row justify-content-center">
					<div className="card">
						<div className="card-body">
							<h1 className="fw-bold text-grey-700 mb-4">
								BASED ON THESE RULES, SHERUTA RESERVES THE RIGHT TO BLOCK,
								DELETE POSTS AND RED FLAG DEFAULTERS.
							</h1>
							<ol className="pl-3">
								<li>
									<p>
										1. DO NOT POST CONTENT OUTSIDE THE CONTEXT OF SHARED LIVING
										AND PEER TO PEER APARTMENT SEARCH{' '}
										<a href="https://sheruta.ng/services">
											learn more about our services here
										</a>
									</p>
								</li>
								<li>
									<p>2. YOU SHALL NOT BE RUDE TO ANY COMMUNITY MEMBER.</p>
								</li>
								<li>
									<p>
										3. ALWAYS DELETE POSTS THAT ARE NO LONGER RELEVANT OR
										AVAILABLE.
									</p>
								</li>
								<li>
									<p>
										4. FOR TRANSPARENCY, YOU MUST BE ABLE TO SHOW PROOF OF
										OWNERSHIP OR RENT PAYMENT OF THE CONCERNED SPACE TO
										PROSPECTS WHEN LISTING UNDER{' '}
										<a href="https://sheruta.ng/services/for_share">
											FOR SHARE
										</a>{' '}
										and{' '}
										<a href="https://sheruta.ng/services/carry_over">
											CARRY OVER
										</a>{' '}
										CATEGORIES.
									</p>
								</li>
								<li>
									<p>
										5. COLLECTING INSPECTION FEES IS STRICTLY PROHIBITED.{' '}
										<a href="https://sheruta.ng/agents/signup">
											CLICK TO SIGNUP IF YOU ARE AN AGENT.
										</a>
									</p>
								</li>
								<li>
									<p>
										6. YOU CANT POST ANOTHER INDIVIDUALS' SPACE. YOU MUST BE THE
										OWNER OR RENTER.
									</p>
								</li>
								<li>
									<p>
										7. YOU SHALL NOT PUT FALSE INFORMATION DURING BACKGROUND
										CHECKS.
									</p>
								</li>
								<li>
									<p>
										8. DO NOT MAKE POSTS OF AVAILABLE APARTMENTS / SPACES
										WITHOUT PICTURES (BAD PICTURES MAY BE DELETED).
									</p>
								</li>
								<li>
									<p>
										9. DO NOT MAKE POSTS USING THE WRONG SERVICE TAG.{' '}
										<a href="https://sheruta.ng/services">
											learn more about our services here
										</a>
									</p>
								</li>
								<li>
									<p>
										10. YOU CAN NOT MAKE A POST CONTAINING FALSE OR MISLEADING
										INFORMATION ABOUT YOU, YOUR SPACE, OR YOUR APARTMENT.
									</p>
								</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
