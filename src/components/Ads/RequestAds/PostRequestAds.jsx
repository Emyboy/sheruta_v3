import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Btn from "../../Btn/Btn";

export default function PostRequestAds() {
    const { view } = useSelector((state) => state);
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
							<h1 className="text-white">
								<b>
									{view.personal_info.is_looking_for
										? 'Looking for a flat to share?'
										: 'Have a flat to share?'}
								</b>
							</h1>
							<p className="text-white">Post a request today. 🚀</p>
							<Link to="/requests/create">
								<Btn text="Post Now" className="btn-sm" onClick={() => {}} />
							</Link>
						</div>
					</div>
				)}
			</>
		)
}
