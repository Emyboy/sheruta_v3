import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CallBtn from '../../components/CallBtn/CallBtn'
import VerifiedBadge from '../../components/VerifiedBadge/VerifiedBadge'
import UserAction from '../../components/UserAction/UserAction';
import Global from '../../Global'

export default function AcceptedMatchList({ list }) {
	const { user } = useSelector((state) => state.auth)
	return (
		<div className="load-more mb-5">
			{list
				.sort(
					(a, b) =>
						new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
				)
				.map((val, i) => {
					const person = val.users_permissions_user
					if(!person.deactivated){
						return (
							<div
								className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 pb-3"
								key={`person-${i}`}
							>
								<div
									className="position-relative  bg-image-cover bg-image-center"
									style={{
										// backgroundImage: 'url(/../assets/images/bb-16.png)',
										height: '20px',
									}}
								></div>
								<div className="card-body d-block w-100 pl-10 pe-4 pb-2 pt-0  text-left position-relative">
									<figure
										className="avatar position-absolute w75 z-index-1"
										style={{ left: '15px' }}
									>
										<img
											src={person.avatar_url}
											alt="image"
											className="float-right p-1 bg-white rounded-circle w-100"
										/>
									</figure>
									<div className="clearfix"></div>
									<Link to={`/user/${person.username}`}>
										<h4 className="fw-700 font-xsss mt-3 mb-1">
											{person.first_name}
										</h4>
										<p className="fw-500 font-xsss text-grey-500 mt-0 mb-3">
											<b>
												{val?.personal_info?.looking_for ? 'Budget' : 'Rent'}
											</b>{' '}
											{Global.currency}
											{window.formatedPrice.format(person?.budget)}
										</p>
									</Link>
								</div>
								<UserAction user={person} alignment="end" />
							</div>
						)
					}
				})}
		</div>
	)
}
