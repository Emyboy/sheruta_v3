import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeHero() {
	return (
		<div
			className="main-slides-area"
			style={{
				backgroundImage: `url(http://cdn.home-designing.com/wp-content/uploads/2019/07/dark-living-room.jpg)`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'bottom',
			}}
		>
			<div className="home-slides owl-carousel owl-theme owl-loaded owl-drag">
				<div className="owl-stage-outer owl-height" style={{ height: '800px' }}>
					<div
						className="owl-stage"
						style={{
							transform: `translate3d(-2816px, 0px, 0px)`,
							transition: `all 0s ease 0s`,
							width: '9856px',
						}}
					>
						<div
							className="owl-item cloned"
							style={{ width: '1378px', marginRight: '30px' }}
						>
							<div className="single-slides-item item-bg2"></div>
						</div>
						<div
							className="owl-item cloned"
							style={{ width: '1378px', marginRight: '30px' }}
						>
							<div className="single-slides-item item-bg3"></div>
						</div>
						<div
							className="owl-item animated owl-animated-in fadeIn active"
							style={{ width: '1378px', marginRight: '30px' }}
						>
							<div className="single-slides-item"></div>
						</div>
						<div
							className="owl-item"
							style={{ width: '1378px', marginRight: '30px' }}
						>
							<div className="single-slides-item item-bg2"></div>
						</div>
						<div
							className="owl-item animated owl-animated-in fadeIn"
							style={{ width: '1378px', marginRight: '30px' }}
						>
							<div className="single-slides-item item-bg3"></div>
						</div>
						<div
							className="owl-item cloned"
							style={{ width: '1378px', marginRight: '30px' }}
						>
							<div className="single-slides-item"></div>
						</div>
						<div
							className="owl-item cloned"
							style={{ width: '1378px', marginRight: '30px' }}
						>
							<div className="single-slides-item item-bg2"></div>
						</div>
					</div>
				</div>
			</div>

			<div className="main-slides-content">
				<div className="container">
					<div className="content">
						<h1
							className="wow animate__ animate__fadeInUp animated"
							data-wow-delay="100ms"
							data-wow-duration="1000ms"
							style={{
								visibility: 'visible',
								animationDuration: '1000ms',
								animationDelay: '100ms',
								animationName: 'fadeInUp',
							}}
						>
							Find A Verified Flat Mate.
						</h1>
					</div>

					<div
						className="tab slides-list-tab wow animate__ animate__fadeInUp animated"
						data-wow-delay="300ms"
						data-wow-duration="2000ms"
						// style={{ visibility: visible; animation-duration: 2000ms; animation-delay: 300ms; animation-name: fadeInUp;"}}
						style={{
							visibility: 'visible',
							animationDuration: '1000ms',
							animationDelay: '100ms',
							animationName: 'fadeInUp',
						}}
					>
						{/* <ul className="tabs active">
							<li className="current">RENT</li>
							<li>SELL</li>
						</ul> */}

						<div className="tab_content">
							<div className="tabs_item">
								{/* <SearchBox /> */}
								<Link
									className="btn bg-theme py-3 px-4 fw-bold text-white
									shadow"
									to={`/signup`}
									onClick={() =>
										localStorage.setItem('after_login', '/discussion')
									}
								>
									Get Started
								</Link>
							</div>

							<div className="tabs_item">
								<div className="main-slides-search-form">
									<form>
										<div className="row align-items-center">
											<div className="col-lg-3 col-md-6">
												<div className="form-group mb-2">
													<label>
														<i className="bx bxs-map"></i>
													</label>

													<div className="select-box">
														<select style={{ display: 'none' }}>
															<option>Location</option>
															<option>Switzerland</option>
															<option>Canada</option>
															<option>Japan</option>
															<option>Germany</option>
															<option>Australia</option>
															<option>United Kingdom</option>
															<option>United States</option>
															<option>Sweden</option>
															<option>Netherlands</option>
														</select>
													</div>
												</div>
											</div>

											<div className="col-lg-3 col-md-6">
												<div className="form-group mb-2">
													<label>
														<i className="bx bx-home"></i>
													</label>

													<div className="select-box">
														<select style={{ display: 'none' }}>
															<option>Property Type</option>
															<option>Apartment</option>
															<option>Bar</option>
															<option>Cafe</option>
															<option>Farm</option>
															<option>House</option>
															<option>Luxury Homes</option>
															<option>Office</option>
															<option>Single Family</option>
															<option>Store</option>
														</select>
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
