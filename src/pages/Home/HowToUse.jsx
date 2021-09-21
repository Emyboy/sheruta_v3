import React from 'react'

export default function HowToUse() {
    return (
        <div>
            <section className='bg-white mt-3'>
				<div class="container">
					
					<div class="row">
						<div class="col text-center">
							<div class="sec-heading center">
								<h3>How It Works?</h3>
								<p>How to start work with us and working process</p>
							</div>
						</div>
					</div>
					
					<div class="row">
						<div class="col-lg-4 col-md-4">
							<div class="middle-icon-features">
								<div class="middle-icon-features-item">
									<div class="middle-icon-large-features-box"><i class="ti-user text-danger"></i><span class="steps bg-danger">01</span></div>
									<div class="middle-icon-features-content">
										<h4>Create An Account</h4>
										<p>Sign up and verify your account through email.</p>
									</div>
								</div>
							</div>
						</div>
						
						<div class="col-lg-4 col-md-4">
							<div class="middle-icon-features">
								<div class="middle-icon-features-item">
									<div class="middle-icon-large-features-box"><i class="ti-search text-success"></i><span class="steps bg-success">02</span></div>
									<div class="middle-icon-features-content">
										<h4>Find & Search Property</h4>
										<p>Browse through available properties for both shared apartments and entire apartments available for rent. </p>
									</div>
								</div>
							</div>
						</div>
						
						<div class="col-lg-4 col-md-4">
							<div class="middle-icon-features">
								<div class="middle-icon-features-item">
									<div class="middle-icon-large-features-box"><i class="ti-location-arrow text-warning"></i><span class="steps bg-warning">03</span></div>
									<div class="middle-icon-features-content">
										<h4>Book Inspection</h4>
										<p>Book inspection for apartments you are interested in through call or direct message.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>
			</section>
			<div class="clearfix"></div>
        </div>
    )
}
