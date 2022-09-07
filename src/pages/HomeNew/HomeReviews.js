import React from 'react'
import fav from './img/fav.jpeg'

const reviews = [
	{
		name: 'Uche',
		avatar_url:
			'https://firebasestorage.googleapis.com/v0/b/sheruta-prod.appspot.com/o/images%2Fprofile%2F94%2Fimage_0?alt=media&token=7a3f77a5-19c5-40f1-a56b-ff950d17817d',
		review:
			'Finding a flat mate was easier than I thought, the process to so smooth and I really enjoyed it. Thank you',
		stars: 5,
		occupation: 'Software Developer at FoodBots',
	},
	{
		name: 'Chioma',
		avatar_url:
			'https://images.unsplash.com/photo-1602342323893-b11f757957c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmlnZXJpYW4lMjBnaXJsfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
		review:
			'I finally found someone on the site to share a flat with, I was an amazing experience. Thank you Sheruta 🤗',
		stars: 5,
		occupation: 'Digital Marketer at Zedcor',
	},
	{
		name: 'Somto',
		avatar_url: fav,
		review: `The website was transparent enough for me to get the right person very quickly. Thanks guys`,
		stars: 5,
		occupation: 'Product manager at MyWays',
	},
]

export default function HomeReviews() {
	return (
		<div className="ptb-100 bg-accent">
			<div className="container">
				<div className="section-title">
					<h3 className="text-grey-200">Recent Flatmate Reviews</h3>
					<p className="text-grey-500">
						Here are some reviews of users who recently found a flatmate on the
						site.
					</p>
				</div>
				<div className="row">
					{reviews.map((val, i) => {
						return <EachHomeReview key={`home-review-${i}`} data={val} />
					})}
				</div>
			</div>
		</div>
	)
}

const EachHomeReview = ({ data }) => {
	return (
		// <div className="owl-item active" style="width: 264px; margin-right: 20px;">
		<div className="col-sm-5 col-lg-4">
			<div className="customers-item">
				<div className="customers-info d-flex">
					<div className="image">
						<img src={data?.avatar_url} alt="image" />
					</div>

					<div className="ml-3">
						<h4>{data?.name}</h4>
						<span>{data.occupation}</span>
					</div>
				</div>
				<p>{data.review}.</p>

				<ul className="rating-list">
					{new Array(data.stars).fill(Date.now()).map((val, i) => {
						return (
							<li key={`'each-reve-${i}`}>
								<i className="bx bxs-star"></i>
							</li>
						)
					})}
					{new Array(5 - data.stars).fill(Date.now()).map((val, i) => {
						return (
							<li className="color-gray" key={`each-review-${i}`}>
								<i className="bx bxs-star"></i>
							</li>
						)
					})}
					{/* <li>
						<i className="bx bxs-star"></i>
					</li>
					<li>
						<i className="bx bxs-star"></i>
					</li>
					<li>
						<i className="bx bxs-star"></i>
					</li> */}
					
				</ul>
			</div>
		</div>
	)
}
