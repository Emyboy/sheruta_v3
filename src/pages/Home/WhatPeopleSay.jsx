import React from 'react'
import { Carousel } from 'react-bootstrap'

export default function WhatPeopleSay() {
    return (
        <div>
            <div className="container-fluid pb-4 bg-accent">
						<div className="row align-items-center mb-5">
							<div className="col-lg-6 col-md-7">
								<h3 className="text-light text-center">What People Say?</h3>

								<div className="smart-textimonials smart-light slick-initialized slick-slider bg-accent" id="smart-textimonials">
									<Carousel controls={false}indicators={false}>
										<Carousel.Item>
											<div aria-live="polite" className="slick-list draggable">
												<div className="slick-track" role="listbox">
													<div className="item slick-slide slick-cloned" style={{ width: "390px" }} tabindex="-1"  aria-describedby="slick-slide04" data-slick-index="-1" aria-hidden="true">
														<div className="smart-tes-content">
															<p> My apartment rent went up and i didnt want to loose the apartment and move into smaller space. I had a spare room and listed it on sheruta.ng, they provided me with the best flatmate with no wahala at all. </p>
														</div>

														<div className="smart-tes-author">
															<div className="st-author-box">
																{/* <div className="st-author-thumb">
																	<img src="assets/img/user-6.jpg" className="img-fluid" alt="" />
																</div> */}
																<div className="st-author-info">
																	<h4 className="st-author-title">Onyinye</h4>
																	<span className="st-author-subtitle">CEO Of Onyx Hair</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</Carousel.Item>
										<Carousel.Item>
										<div aria-live="polite" className="slick-list draggable">
												<div className="slick-track" role="listbox">
													<div className="item slick-slide slick-cloned" style={{ width: "390px" }} tabindex="-1"  aria-describedby="slick-slide04" data-slick-index="-1" aria-hidden="true">
														<div className="smart-tes-content">
															<p> Apartment search has been really stressfull for me especially with my kind of job. I came across the platform online and i got a space within days within my budget. </p>
														</div>

														<div className="smart-tes-author">
															<div className="st-author-box">
																{/* <div className="st-author-thumb">
																	<img src="assets/img/user-6.jpg" className="img-fluid" alt="" />
																</div> */}
																<div className="st-author-info">
																	<h4 className="st-author-title">Uche</h4>
																	<span className="st-author-subtitle">Pharmacist</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</Carousel.Item>
										{/* <Carousel.Item>
											<img
												className="d-block w-100"
												src="holder.js/800x400?text=Third slide&bg=20232a"
												alt="Third slide"
											/>

											<Carousel.Caption>
												<h3>Third slide label</h3>
												<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
											</Carousel.Caption>
										</Carousel.Item> */}
									</Carousel>
								</div>
							</div>

							<div className="col-lg-6 col-md-5">
								<img src="assets/img/avatar-large-1.png" className="img-fluid" alt="" />
							</div>

						</div>
					</div>
				
        </div>
    )
}
