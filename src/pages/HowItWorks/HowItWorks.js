import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'

export default function HowItWorks() {
	return (
		<Layout>
			<div className="card mb-5 mt-3 rounded shadow-sm">
				<div className="card-body text-center">
					<h1>
						<b>How It All Works</b>
					</h1>
				</div>
			</div>
			<div>
				<div className="card mb-4 mt-2 rounded shadow-sm">
					<div className="card-body">
						<h2>
							<b>1. signup</b>
						</h2>
						Sign up, fill in the relevant and accurate information.
					</div>
				</div>

				<div className="card mb-4 mt-2 rounded shadow-sm">
					<div className="card-body">
						<h2>
							<b>2. Get started & verify account.</b>
						</h2>
						Verification improves the authenticity of you as a person and that
						of your post. Click on sidebar, and follow process to get verified
						in a few steps. Your NIN is required.
					</div>
				</div>

				<div className="card mb-4 mt-2 rounded shadow-sm">
					<div className="card-body">
						<h2>
							<b>3. View matches</b>
						</h2>
						Our algorithm uses the information you put on the get started
						section to suggest who would be the right match for you. You can
						pair with users looking to find a home together or get awesome
						flatmates to occupy your space.
					</div>
				</div>

				<div className="card mb-4 mt-2 rounded shadow-sm">
					<div className="card-body">
						<h2>
							<b>4. Post requests.</b>
						</h2>

						<p>
							Post your properties, free rooms or the need for a space using our
							service tags.
						</p>

						<p>
							Learn more about our service tags{' '}
							<Link to="/services">
								<b>here</b>
							</Link>
							.
						</p>

						<p>
							Always put a realistic budget or rent cost to get relevant post
							engagements.
						</p>
					</div>
				</div>

				<div className="card mb-4 mt-2 rounded shadow-sm">
					<div className="card-body">
						<h2>
							<b>5. Search through requests.</b>
						</h2>

						<p>
							Use the search section to search for posts or requests relevant to
							your needs .
						</p>
					</div>
				</div>

				<div className="card mb-4 mt-2 rounded shadow-sm">
					<div className="card-body">
						<h2>
							<b>6. View request</b>
						</h2>

						<p>View relevant requests and check profile to vet user(s).</p>

						<p>Click the call icon to contact users.</p>

						<p>Send direct messages to users using the message icon. </p>

						<p>(Always apply caution when engaging with unverified users).</p>
					</div>
				</div>
			</div>
		</Layout>
	)
}
