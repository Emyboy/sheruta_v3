import React from 'react'
import { Carousel } from 'react-bootstrap'
import Heading from '../../components/Heading/Heading'

const EachQuote = ({ full_name, review_text, role }) => {
	return (
		<div className="card rounded-xl shadow-sm" style={{ height: '380px' }}>
			<div className="card-body">
				<div className="testimonial_post">
					<div className="thumb">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/sheruta-prod.appspot.com/o/DONT%20DELETE%2F878597_user_512x512.png?alt=media&token=34573067-2e82-4b7f-8765-ee7b20ff0ba9"
							alt="1.jpg"
							style={{ height: '90px', marginTop: '10px' }}
						/>
						<h2 className="title mt-3">{full_name}</h2>
						<small className="text-thm">{role}</small>
					</div>
                    <hr />
					<div className="details">
						<div className="icon text-thm">
							<span className="fa fa-quote-left"></span>
						</div>
						<p style={{ fontSize: '18px' }}>{review_text}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function WhatPeopleSay() {
	return (
		<article className="bgc-f7 pb-4 pt-4 bg-accent rounded-xl">
			<div className="container ">
				<h1 className="mt-2 mb-4 text-white">
					<b>What People Say</b>
				</h1>
				<div className="row">
					<div className="col-lg-6 col-md-7">
						<div
							className="smart-textimonials smart-light slick-initialized slick-slider"
							id="smart-textimonials"
						>
							<Carousel controls={false} indicators={false}>
								<Carousel.Item>
									<EachQuote
										review_text="My apartment rent went up and i
                                            didnt want to loose the apartment
                                            and move into smaller space. I had a
                                            spare room and listed it on
                                            sheruta.ng, they provided me with
                                            the best flatmate with no wahala at
                                            all."
										full_name="Onyinye"
										role="CEO Of Onyx Hair"
									/>
								</Carousel.Item>
								<Carousel.Item>
									<EachQuote
										review_text="Apartment search has been really
                                            stressfull for me especially with my
                                            kind of job. I came across the
                                            platform online and i got a space
                                            within days within my budget."
										full_name="Uche"
										role="Pharmacist"
									/>
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
				</div>
			</div>
		</article>
	)
}
