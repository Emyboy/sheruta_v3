import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../../components/Layout/Layout'
import Global from '../../../Global'
import {
	AiFillFacebook,
	AiFillInstagram,
	AiFillLinkedin,
	AiOutlineUserAdd,
} from 'react-icons/ai'
import { Skeleton, Tag } from 'antd'
import ProfileHero from './ProfileHero'
import ProfileInfo from './ProfileInfo'
import { GrFlagFill } from 'react-icons/gr'
import { FaTiktok } from 'react-icons/fa'
import SimilarAccounts from './SimilarAccounts'
import axios from 'axios'
import { useParams } from 'react-router'
import Cookies from 'js-cookie'

const socialIconsSize = 30

export default function NewProfile() {
	localStorage.setItem('after_login', window.location.pathname)
	const { user } = useSelector((state) => state.auth)

	const [data, setData] = useState(null)

	const params = useParams()

	const getUserProfile = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/users-permissions/auth/profile/${params?.username}`,
				user
					? {
							headers: {
								authorization: `Bearer ${Cookies.get('token')}`,
							},
					  }
					: null
			)
			console.log('USER --', res.data)
			setData(res.data)
			return Promise.resolve()
		} catch (error) {
			console.log(error)
			return Promise.reject(error)
		}
	}, [params?.username])

	useEffect(() => {
		getUserProfile()
	}, [getUserProfile])

	return (
		<Layout full_screen>
			<div className={`${!Global.isMobile && 'container'} pt-5 pb-5`}>
				<div className="row justify-content-center">
					<div className="col-xl-7 col-sm-12">
						<ProfileHero data={data?.user} info={data?.personal_info} />
						<div className="card rounded-xxl">
							<div className="card-body">
								<section>
									<h3>Bio</h3>
									<p>{data?.user?.bio || 'Hi, I enjoy using sheruta'} </p>
								</section>
								<section className="mt-3">
									<div className="d-flex" style={{ flexWrap: 'wrap' }}>
										{data?.personal_info?.unique_habits?.map((val) => {
											return (
												<Tag
													key={`habit-${val?.id}`}
													color="geekblue"
													className="mb-2 fw-bold"
												>
													{val?.name}
												</Tag>
											)
										})}
									</div>
								</section>
								<hr />
								<ProfileInfo info={data?.personal_info} data={data?.user} />
							</div>
						</div>
						<section className="mt-3 card rounded-xxl p-3 mb-4">
							<h3>My Social Media</h3>
							<div className="row justify-content-between mt-4 align-items-center">
								{!data ? (
									<Skeleton.Input round active />
								) : (
									<>
										<div className="col-xl-7">
											<button className="btn mb-2 bg-greylight btn-round-lg mr-2 mb-2 rounded-3 text-grey-700">
												<AiFillInstagram size={socialIconsSize} />
											</button>
											<button className="btn mb-2 bg-greylight btn-round-lg mr-2 mb-2 rounded-3 text-grey-700">
												<AiFillFacebook size={socialIconsSize} />
											</button>
											<button className="btn mb-2 bg-greylight btn-round-lg mr-2 mb-2 rounded-3 text-grey-700">
												<FaTiktok size={socialIconsSize} />
											</button>
											<button className="btn mb-2 bg-greylight btn-round-lg mr-2 mb-2 rounded-3 text-grey-700">
												<AiFillLinkedin size={socialIconsSize} />
											</button>
										</div>
										<div className="col-xl-5 text-end col-sm-1">
											<button className="btn text-danger fw-bold">
												<GrFlagFill /> Report Account
											</button>
										</div>
									</>
								)}
							</div>
						</section>
					</div>
					<div className="col-xl-4">
						<SimilarAccounts info={data?.personal_info} />
					</div>
				</div>
			</div>
		</Layout>
	)
}
