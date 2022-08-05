import React, { useState } from 'react'
import { Modal, notification } from 'antd'

import { useSelector } from 'react-redux'
import store from '../../../redux/store/store'

export default function LocationKeywordAds() {
	

	

	return (
		<div
			className="card rounded-xxl mb-4"
			style={{
				backgroundImage: `url(https://png.pngtree.com/thumb_back/fw800/background/20191011/pngtree-abstract-white-background-with-rounded-squares-image_319149.jpg)`,
				backgroundPosition: 'center',
				backgroundSize: '100% 100%',
				// filter: ""
			}}
		>
			<div className="card-body">
				<h1 className="fw-bold">Turn on location notification</h1>
				<h4>
					Get notified when there is a flat or flatmate in your area of choice.
				</h4>
				<button
					onClick={() => store.dispatch({
						type: 'SET_VIEW_STATE',
						payload: {
							collect_location_keyword: true
						}
					})}
					className="btn bg-current text-white fw-bold mt-3"
				>
					Turn On
				</button>
			</div>
		</div>
	)
}
