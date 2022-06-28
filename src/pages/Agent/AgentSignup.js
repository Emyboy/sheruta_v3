import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import Layout from '../../components/Layout/Layout'
import { getAllViewOptions } from '../../redux/strapi_actions/view.action'
import UserService from '../../services/UserService'
import AgentSignupForm from './AgentSignupForm/AgentSignupForm'
import { getUser } from '../../redux/strapi_actions/auth.actions'


export default function AgentSignup() {
	localStorage.setItem('after_login', "/agent/signup")
	const { user } = useSelector((state) => state.auth)
	const [weMove, setWeMove] = useState(false)
	const dispatch = useDispatch()

	const updateBudget = async () => {
		try {
			const res = await UserService.updateProfile({ budget: '5000' });
            if(res){
                dispatch(getUser())
            }
		} catch (error) {
            return Promise.reject(error);
        }
	}

	useEffect(() => {
		dispatch(getAllViewOptions())
        updateBudget()
		dispatch({
			type: 'SET_VIEW_STATE',
			payload: {
				personal_info: {
					nin: '82393823',
					is_looking_for: false,
				},
			},
		})
	}, [])

	useEffect(() => {
		;(async () => {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/agents/?users_permissions_user=${user?.user?.id}`
			)
			if (res?.data && res?.data?.length > 0) {
				setWeMove(true)
			}
		})()
	}, [])

	// if (weMove) {
	// 	return <Redirect to={`/services`} />
	// }

	if (!user) {
		localStorage.setItem('after_login', '/agents/signup')
		return <Redirect to="/signup" />
	}
	return (
		<Layout>
			<AgentSignupForm />
		</Layout>
	)
}
