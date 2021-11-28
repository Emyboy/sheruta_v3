import React from 'react'
import { Link } from 'react-router-dom'

export default function SettingsHeader({ heading }) {
    return (
			<div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
				<Link to="/settings" className="d-inline-block mt-2">
					<i className="ti-arrow-left font-sm text-white"></i>
				</Link>
				<h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
					{heading}
				</h4>
			</div>
		)
}
