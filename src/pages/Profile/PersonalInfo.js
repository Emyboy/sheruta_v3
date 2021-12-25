import { notification } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Global from '../../Global'
import { IoMail, IoCallSharp } from 'react-icons/io5'
import UserAction from '../../components/UserAction/UserAction'

const PersonalInfo = ({ userData }) => {
	const [info, setInfo] = useState(null)
	const [locations, setLocations] = useState([])
	const [paiedInfo, setPaidInfo] = useState(true)
	const [showFloating, setShowFloating] = useState(false)
	useEffect(() => {
		if (userData) {
			axios(
				process.env.REACT_APP_API_URL +
					'/personal-infos/?users_permissions_user=' +
					userData.id,
				{}
			)
				.then((res) => {
					// console.log("INFO --", res);
					setInfo(res.data[0])
				})
				.catch((err) => {
					// console.log(err);
					notification.error({
						message: 'Error Fetching Personal Info',
					})
				})
		}
	}, [userData])
	useEffect(() => {
		if (userData) {
			axios(
				process.env.REACT_APP_API_URL +
					'/user-preferred-locations/?users_permissions_user=' +
					userData.id,
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
	}, [userData])

	if (!info) {
		return null
	} else
		return (
			<div className="central-meta w-100">
				
                <div className='card-body'>

				<div className="row">
					<div className="col-lg-6">
						<div className="gen-metabox">
							<span className='fw-bold'>
								<i className="fa fa-briefcase mr-1"></i>Work Industry
							</span>
							<p>{info.work_industry && info.work_industry.name}</p>
						</div>
						<div className="gen-metabox">
							<span className='fw-bold'>
								<i className="fa fa-venus-mars"></i> Gender
							</span>
							<p>{info.gender && info.gender.toUpperCase()}</p>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="gen-metabox">
							<span className='fw-bold'>
								<i className="fa fa-user-md"></i> Occupation
							</span>
							<p>{info.occupation} </p>
						</div>
						<div className="gen-metabox">
							<span className='fw-bold'>
								<i className="fa fa-map-marker-alt"></i> Preferred Locations
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
								<div className="col-lg-6">
									<div className="gen-metabox">
										<span className='fw-bold'>
											<i className="fa fa-user"></i> Local Government
										</span>
										<p>{info.lgaOfOrigin} </p>
									</div>
									<div className="gen-metabox">
										<span className='fw-bold'>
											<i className="fa fa-user-alt"></i> Looking for ages
										</span>
										<p>{info.looking_for_age_range}</p>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="gen-metabox no-margin">
										<span className='fw-bold'>
											<i className="fa fa-pray"></i> Religion
										</span>
										<p className="badged">{info.religion}</p>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="gen-metabox no-margin">
										<span className='fw-bold'>
											<i className="fa fa-map"></i> State Of Origin
										</span>
										<p className="badged">{info.stateOfOrigin}</p>
									</div>
								</div>
							
							</div>
						</div>
					) : null}
				</div>
                </div>
			</div>
		)
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)
