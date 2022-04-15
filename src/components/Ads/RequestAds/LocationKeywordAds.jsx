import React, { useState } from 'react'
import { Modal } from 'antd'
import LocationKeywordSelector from '../../LocationKeywordSelector/LocationKeywordSelector'

export default function LocationKeywordAds() {
	const [showLocationKeyword, setShowLocationKeyword] = useState(false)

	const handleSubmit = (data) => {
        console.log('sending --', data)
        //todo - Send the data to users personal info
    }

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
			<Modal closable={false} visible={showLocationKeyword} footer={null}>
				<LocationKeywordSelector
					done={(e) => {
						handleSubmit({
							location_keyword: e.locationKeyword?.value,
							state: e.state_id?.value,
						})
					}}
				/>
				<div className="text-center">
					<button onClick={() => {
                        setShowLocationKeyword(false)
                    }} className="btn text-danger mt-4">Close</button>
				</div>
			</Modal>
			<div className="card-body">
				<h1 className="fw-bold">Turn on location notification</h1>
				<h4>
					Get notified when there is a flat/flatmate in your area of choice.
				</h4>
				<button
					onClick={() => setShowLocationKeyword(true)}
					className="btn bg-current text-white fw-bold mt-3"
				>
					Turn On
				</button>
			</div>
		</div>
	)
}
