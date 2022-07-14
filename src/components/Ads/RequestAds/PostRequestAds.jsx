import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Btn from '../../Btn/Btn'

export default function PostRequestAds() {
	const { view } = useSelector((state) => state)
	return (
		<>
			{view.personal_info && (
				<div
					className="card rounded border-gray mb-3 shadow"
					style={{
						backgroundColor: '#202323',
					}}
				>
					<div className="card-body">
						<h4 className="text-white font-xl">
							<b>Have a flat to share?</b>
						</h4>
						<p className="text-white">Upload your flat for free</p>
						<Link to="/flat/submit">
							<Btn text="Post Now" className="btn-sm" onClick={() => {}} />
						</Link>
					</div>
				</div>
			)}
		</>
	)
}
