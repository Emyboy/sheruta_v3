import { Avatar, Tooltip } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../assets/images/featured/featured-large-3.jpg'
import Global from '../../Global'
import { formatPropertyURL } from '../../pages/Properties/EachProperty'

export default function EachDemoProperty({ data }) {
	return (
		<div
			className="owl-item active mb-4 "
			style={{ width: Global.isMobile ? '330px' : '400px' }}
		>
			<div className="featured-item-box">
				<div className="featured-image">
					<Link
						to={{
							pathname: formatPropertyURL(data),
							state: data,
						}}
					>
						{/* <img src={data?.image_urls[0]} alt="image" /> */}
						<div
							style={{
								width: '100%',
								height: '400px',
								backgroundImage: `url(${data?.image_urls[0]})`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}
							className="rounded"
						/>
					</Link>

					{data?.categorie?.name && (
						<div className="tag">
							<Link
								to={{
									pathname: formatPropertyURL(data),
									state: data,
								}}
							>
								{data?.categorie?.name}
							</Link>
						</div>
					)}

					<div className="featured-top-content">
						<span>{data?.location?.slice(0, 38)}...</span>
						<h3>
							<Link
								to={{
									pathname: formatPropertyURL(data),
									state: data,
								}}
							>
								{data?.name}
							</Link>
						</h3>
						<p className="font-lg">
							{Global.currency} {window.formatedPrice.format(data?.price)}
						</p>

						<ul className="featured-list">
							<li>
								<i className="bx bx-bed"></i> {data?.bedroom} Bedrooms
							</li>
							<li>
								<i className="bx bxs-bath"></i> {data?.bathroom} Baths
							</li>
							<li>
								<i className="bx bx-home"></i> {data?.service?.name}
							</li>
						</ul>
					</div>
				</div>

				<div className="featured-bottom-content d-flex justify-content-between align-items-center pt-0 pb-3">
					<ul className="rating-list">
						<div className="dd-block pt-0">
							<ul className="memberlist mt-1 mb-2 ms-0 d-block d-flex"></ul>
						</div>
						<li>{data?.interested_parties?.length} Interested Users</li>
					</ul>

					<div className="featured-btn">
						<Link
							to={{
								pathname: formatPropertyURL(data),
								state: data,
							}}
							className="default-btn pl-4 pr-4 pb-2 pt-2"
						>
							MORE{' '}
							<span style={{ top: '-146.094px', left: '63.3438px' }}></span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
