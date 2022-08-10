import React from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import VerifiedBadge from '../../../components/VerifiedBadge/VerifiedBadge'
import Global from '../../../Global'

export default function ProfileHero({ data, info }) {
	const { user } = useSelector((state) => state.auth)
	const _user = user?.user

	return (
		<div className="card rounded-xxl mb-4">
			<div className="card-body">
				<div className="row">
					<div className="col-xl-4 col-sm-12 d-flex justify-content-center">
						<div
							className="card p2 rounded-xxl"
							style={{
								backgroundImage: `url(${data?.avatar_url})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								height: '250px',
								width: '250px',
								backgroundRepeat: 'no-repeat',
							}}
						/>
					</div>
					<div
						className={`col-xl-8 col-sm-12 d-flex flex-column justify-content-end mt-3 ${
							Global.isMobile && ''
						}`}
					>
						<h2 className="fw-bold d-flex">
							{data?.first_name} <VerifiedBadge without_text user={_user} />
						</h2>
						<div className="mt-">
							<h4 className="text-grey-600 mb-3 text-capitalize">
								{info?.gender == 'm' ? 'Male' : 'Female'}, {info?.occupation}
							</h4>
							{data?.id != _user?.id && (
								<div className="d-flex justify-content-between">
									<div className="d-flex">
										{user ? (
											<a
												href={`tel:${data?.phone_number}`}
												className="d-lg-block bg-greylight btn-round-lg mr-2 rounded-3 text-grey-700"
											>
												<i className="feather-phone font-md"></i>
											</a>
										) : (
											<Link
												to={'/signup'}
												className="d-lg-block bg-greylight btn-round-lg mr-2 rounded-3 text-grey-700"
											>
												<i className="feather-phone font-md"></i>
											</Link>
										)}
										{user ? (
											<Link
												to={`/messages/new/${data?.id}`}
												className="d-lg-block bg-greylight btn-round-lg mr-2 rounded-3 text-grey-700"
											>
												<i className="feather-mail font-md"></i>
											</Link>
										) : (
											<Link
												to={`/signup`}
												className="d-lg-block bg-greylight btn-round-lg mr-2 rounded-3 text-grey-700"
											>
												<i className="feather-mail font-md"></i>
											</Link>
										)}
									</div>
									<button
										className={`ml-3 rounded-xl pl-3 pr-3 fw-500 btn btn-${
											Global.isMobile ? 'sm' : 'md'
										} bg-theme text-white`}
									>
										Save Contact <AiOutlineUserAdd size={30} />
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
