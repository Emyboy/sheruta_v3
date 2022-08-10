import { Avatar } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import VerifiedBadge from '../../../components/VerifiedBadge/VerifiedBadge'

export default function SimilarAccounts({ info }) {
	const [list, setList] = useState([])

	const getSimilarUsers = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/personal-infos/?gender=${info?.gender}&_limit=8&looking_for=${info?.looking_for}`,
				{
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			setList(res.data)
		} catch (error) {
			console.log(error)
			return Promise.reject(error)
		}
	}, [info])

	useEffect(() => {
		getSimilarUsers()
	}, [getSimilarUsers])

	return (
		<div className="card rounded-xxl">
			<div className="card-body">
				<h3>Similar Accounts</h3>
				<div>
					{list.map((val) => {
						return <EachAccount key={val?.id} data={val} />
					})}
				</div>
			</div>
		</div>
	)
}

const EachAccount = ({ data }) => {
	const _user = data?.users_permissions_user
	const params = useParams()

	if (params?.username === _user?.username) {
		return null
	}

	return (
		<div className="pt-2 pb-2 border-bottom">
			<Link to={`/user/${_user?.username}`}>
				<div className="d-flex align-items-center">
					<div>
						<Avatar src={_user?.avatar_url} size={60} />
					</div>
					<div className="ml-2">
						<h4 className="m-0 d-flex fw-600 align-items-center">
							{_user?.first_name} <VerifiedBadge without_text user={_user} />
						</h4>
						<small>N {_user.budget}</small>
					</div>
				</div>
			</Link>
		</div>
	)
}
