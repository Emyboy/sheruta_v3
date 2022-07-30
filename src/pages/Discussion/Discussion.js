import React from 'react'
import Global from '../../Global'
import DiscussionCenter from './DiscussionCenter/DiscoussionCenter'
import DiscussionLeft from './DiscussionLeft/DiscussionLeft'
import DiscussionRight from './DiscussionRight/DiscussionRight'

export default function Discussion() {
	return (
		<div
			style={{
				position: 'absolute',
				top: '0',
				bottom: '0',
				left: '0',
				right: '0',
			}}
		>
			{/* <header className="bg-white shadow-sm d-flex">
				<button className="btn">Back</button>
			</header> */}
			<div className="container-fluid">
				<div className="row">
					{!Global.isMobile && (
						<div className="col-lg-3 p-0">
							<DiscussionLeft />
						</div>
					)}
					<div className="col-lg-6 p-0">
						<DiscussionCenter />
					</div>
					{!Global.isMobile && (
						<div className="col-lg-3 p-0">
							<DiscussionRight />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
