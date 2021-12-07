import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Btn from '../../components/Btn/Btn'
import VerifiedBadge from '../../components/VerifiedBadge/VerifiedBadge'
import { FiCheck } from 'react-icons/fi'
import { MdClose, MdWork } from 'react-icons/md'
import { FaIndustry } from 'react-icons/fa'

const Wrapper = styled.div`
	.actions > div > button {
		border: none;
		/* background-color: pink; */
		height: 4em;
		width: 4em;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.actions > div {
		display: flex;
		flex-direction: column;
		text-align: center;
	}
`

export default function EachMatchCard({ data, handleStatusUpdate }) {
	const { users_permissions_user, personal_info } = data
	// console.log("DATA --", data);
	const { user } = useSelector((state) => state.auth)
	const { work_industries } = useSelector((state) => state.view)
	const [showInfo, setShowInfo] = useState(false)

	return (
		<Wrapper className="card d-block border shadow-xss rounded-3 overflow-hidden mb-3">
			<div className="card-body d-block w-100 p-4 text-center">
				<figure class="avatar ms-auto me-auto mb-0 position-relative w90 z-index-1">
					<img
						src={users_permissions_user.avatar_url}
						alt="image"
						class="float-right p-1 bg-white rounded-circle w-100"
					/>
				</figure>
				<div class="clearfix"></div>
				<div className="d-flex justify-content-center">
					<Link to={`/user/${users_permissions_user.username}`}>
						<h4 class="fw-700 font-xss mt-3 mb-0">
							{users_permissions_user.first_name}{' '}
						</h4>
					</Link>
					<VerifiedBadge
						user={users_permissions_user}
						without_text
						className="ml-2 mt-2"
					/>
				</div>

				<p class="fw-500 font-xssss text-grey-500 mt-0 mb-3">
					@{users_permissions_user.username}
				</p>
				<ul class="product-feature-list mt-1">
					<li class="lh-32 font-xsss text-grey-500 fw-500 d-flex">
						<b class="text-grey-900 mr-2"> Gender: </b>
						{personal_info.gender === 'm' ? 'Male' : 'Female'}
					</li>
					<li class="lh-32 font-xsss text-grey-500 fw-500 d-flex">
						<b class="text-grey-900 mr-2">Occupation: </b>
						{personal_info.occupation}
					</li>
					<li class="lh-32 font-xsss text-grey-500 fw-500 d-flex">
						<b class="text-grey-900 mr-2"> Industry: </b>
						{work_industries.length > 0 &&
							work_industries.filter(
								(x) => x.id === personal_info.work_industry
							)[0].name}
					</li>
				</ul>
			</div>
			{/* <div>
				<div className="frnd-name">
					<Link to={`/user/${users_permissions_user.username}`}>
						<Btn
							className="main-btn2 mt-2 btn-sm"
							text="View Profile"
							onClick={() => {}}
						/>
					</Link>
				</div>
			</div> */}

			{/* <ul className="menu-list pt-1">
				<li>
					<a href="#gender" title="" data-ripple="">
						<i className="fa fa-fire"></i>
						{personal_info.gender === 'm' ? 'Male' : 'Female'}
					</a>
				</li>
				<li>
					<a href="#profession" title="" data-ripple="">
						<i>
							<MdWork />
						</i>
						{personal_info.occupation}
					</a>
				</li>
				{personal_info.work_industry ? (
					<li>
						<a href="#work-industry" title="" data-ripple="">
							<i>
								<FaIndustry />
							</i>
							{work_industries.length > 0 &&
								work_industries.filter(
									(x) => x.id === personal_info.work_industry
								)[0].name}
						</a>
					</li>
				) : null}
			</ul> */}
			<hr />
			<div className="p-3 actions d-flex justify-content-around">
				<div>
					<button
						className="btn-danger"
						onClick={() => handleStatusUpdate(data.id, 'rejected')}
					>
						<MdClose size={40} />
					</button>
					<small>Reject</small>
				</div>
				<div>
					<button
						className="bg-theme text-white"
						onClick={() => handleStatusUpdate(data.id, 'accepted')}
					>
						<FiCheck size={40} />
					</button>
					<small>Accept</small>
				</div>
			</div>
		</Wrapper>
	)
}
