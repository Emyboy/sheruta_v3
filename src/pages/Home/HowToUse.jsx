import React from 'react'
import styled from 'styled-components'
import auth from '../../assets/img/auth.svg'
import verify from '../../assets/img/verify.svg'
import post from '../../assets/img/post.svg'

const Wrapper = styled.section`
	margin-top: 20vh;
	.heading > h2 {
		font-size: 60px;
        margin-bottom: 30px;
	};

    .step > h3 {
        font-size: 20px;
        margin-top: 20px;
    }

`

export default function HowToUse() {
	return (
		<Wrapper className="container-fluid mb-5">
			<div className="text-center heading mb-4">
				<h2 style={{ fontSize: '40px'}}>
					<b>How It Works</b>
				</h2>
			</div>

			<div className="row justify-content-center">
				<div className="col-lg-3 col-sm-12">
					<div className="step text-center">
						<img width={'300'} src={auth} />
						<h3>Sign up</h3>
					</div>
				</div>
				<div className="col-lg-3 col-sm-12">
					<div className="step text-center">
						<img width={'250'} src={verify} />
						<h3>Verify Account</h3>
					</div>
				</div>
				<div className="col-lg-3 col-sm-12">
					<div className="step text-center">
						<img width={'300'} src={post} />
						<h3>Upload Property</h3>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}
