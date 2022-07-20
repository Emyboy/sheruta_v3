import { notification } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Btn from '../../components/Btn/Btn'

const PersonalInfo = ({ userData, hasProfileLink }) => {
	const { user } = useSelector(state => state.auth);
	const [info, setInfo] = useState(null)
	const [locations, setLocations] = useState([])
	const [paiedInfo, setPaidInfo] = useState(true)

	useEffect(() => {
		if (userData) {
			axios(
				process.env.REACT_APP_API_URL +
					'/personal-infos/?users_permissions_user=' +
					userData?.id,
				{}
			)
				.then((res) => {
					setInfo(res.data[0])
				})
				.catch((err) => {
					// console.log(err);
					notification.error({
						message: 'Error Fetching Personal Info',
					})
				})
		}
	}, [userData]);
	
	useEffect(() => {
		if (userData) {
			axios(
				process.env.REACT_APP_API_URL +
					'/user-preferred-locations/?users_permissions_user=' +
					userData?.id,
				{}
			)
				.then((res) => {
					setLocations(res.data)
				})
				.catch((err) => {
					notification.error({
						message: 'Error Fetching User Locations',
					})
				})
		}
	}, [userData]);

	if(!user){
		return (
			<div className="d-flex justify-content-center p-5">
				<div className="align-item-center text-center">
					<h4 className="mb-0">Please signup to view</h4>
					<Link to='/register'>
						<Btn text={'Signup'} onClick={() => {}} className="mt-4" />
					</Link>
				</div>
			</div>
		)
	}

	if (!info) {
		return null
	} else
		return (
			<div className="central-meta w-100">
				<div className="card-body">
					<h5 className="mb-4 fw-700">
						{userData?.first_name?.split(' ')[0]}{' '}
						{info?.looking_for
							? 'is looking for a flat'
							: 'has a flat to share'}
					</h5>
					<div className="row">
						<div className="col-lg-6 mb-4">
							<div className="gen-metabox pb-4">
								<span className="fw-bold">
									<i className="fa fa-briefcase mr-1"></i>Work Industry
								</span>
								<p>{info?.work_industry && info?.work_industry.name}</p>
							</div>
							<div className="gen-metabox">
								<span className="fw-bold">
									<i className="fa fa-venus-mars"></i> Gender
								</span>
								<p>{info?.gender && info?.gender.toUpperCase()}</p>
							</div>
						</div>
						<div className="col-lg-6 mb-4">
							<div className="gen-metabox pb-4">
								<span className="fw-bold">
									<i className="fa fa-user-md"></i> Occupation
								</span>
								<p>{info?.occupation} </p>
							</div>
							<div className="gen-metabox">
								<span className="fw-bold">
									<i className="fa fa-map-marker-alt"></i>{' '}
									{info?.looking_for
										? 'Preferred Locations'
										: 'Apartment Area (s)'}
								</span>
								<p>
									{locations.map((val, i) => {
										return (
											<span key={val.id}>
												{val.location}
												{i === locations.length - 1 ? null : '. OR '}
											</span>
										)
									})}
								</p>
							</div>
						</div>
						{paiedInfo ? (
							<div className="container-fluid">
								<div className="row">
									<div className="col-lg-6 mb-4">
										<div className="gen-metabox pb-4">
											<span className="fw-bold">
												<i className="fa fa-map"></i> Local Government
											</span>
											<p>{info?.lgaOfOrigin} </p>
										</div>
										<div className="gen-metabox">
											<span className="fw-bold">
												<i className="fa fa-user-alt"></i> Looking for ages
											</span>
											<p>{info?.looking_for_age_range}</p>
										</div>
									</div>
									<div className="col-lg-6 mb-4">
										<div className="gen-metabox no-margin">
											<span className="fw-bold">
												<i className="fa fa-pray"></i> Religion
											</span>
											<p className="badged">{info?.religion}</p>
										</div>
									</div>
									<div className="col-lg-6 mb-4">
										<div className="gen-metabox no-margin">
											<span className="fw-bold">
												<i className="fa fa-map"></i> State Of Origin
											</span>
											<p className="badged">{info?.stateOfOrigin}</p>
										</div>
									</div>
									<div className="col-lg-6 mb-4">
										<div className="gen-metabox no-margin">
											<span className="fw-bold">
												<i className="fa fa-pen"></i> About
											</span>
											<p className="badged">{userData?.bio}</p>
										</div>
									</div>
								</div>
							</div>
						) : null}
					</div>
					{hasProfileLink && (
						<div className="d-flex justify-content-center align-items-center mt-4">
							<Link
								className="btn bg-theme text-white"
								to={`/user/${userData?.username}`}
							>
								View Profile
							</Link>
						</div>
					)}
				</div>
			</div>
		)
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)
