import React from 'react'
import styled from 'styled-components'
import auth from '../../assets/img/auth.svg'
import verify from '../../assets/img/verify.svg'
import post from '../../assets/img/post.svg'

const Wrapper = styled.article`
	margin-top: 20vh;
	.heading > h2 {
		font-size: 60px;
        margin-bottom: 30px;
	};

    .step > h2 {
        font-size: 20px;
        margin-top: 20px;
		font-weight: bold;
    }

`

export default function HowToUse() {
	return (
		<Wrapper className="container-fluid mb-5">
			<div className="text-center heading mb-5">
				<h2 style={{ fontSize: '40px' }} className="text-gray-200">
					<b>How It Works</b>
				</h2>
			</div>

			<div className="row justify-content-center">
				<div className="col-lg-3 col-sm-12">
					<div className="mb-4 step text-center">
						<img width={'300'} src={auth} />
						<h2>Sign up</h2>
					</div>
				</div>
				<div className="col-lg-3 col-sm-12">
					<div className="mb-4 step text-center">
						<img width={'250'} src={verify} />
						<h2>Verify Account</h2>
					</div>
				</div>
				<div className="col-lg-3 col-sm-12">
					<div className="mb-4 step text-center">
						<img width={'300'} src={post} />
						<h2>Upload Property</h2>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}
