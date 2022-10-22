import React from 'react';

const features = [
	{
		name: 'Real Time Messaging',
		img: 'https://img.favpng.com/7/3/8/message-logo-png-favpng-uL8Jdg0CKSBnn0TYhV4pQ0Frq.jpg',
	},
	{
		name: 'Calls',
		img: 'https://www.pngitem.com/pimgs/m/207-2074671_free-green-phone-icon-hd-png-download.png',
	},
	{
		name: 'Real Time Notification',
		img: 'https://icones.pro/wp-content/uploads/2022/02/icone-de-cloche-verte.png',
	},
]

export default function HomeFeatures() {
	return (
		<div className="facilities-area pt-100 pb-70">
			<div className="container">
				<div className="section-title">
					<h3>Why Subscribe?</h3>
					<p>
						Gain access to our awesome features designed for you to get the best
						value.
					</p>
				</div>

				<div className="row justify-content-center">
					{features.map((val, i) => {
						return (
							<div className="col-lg-4 col-md-6" key={`feat-${i}`}>
								<div className="single-facilities">
									<div className="image">
										<img src={val.img} alt="feature" />
									</div>

									<h3>{val?.name}</h3>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
