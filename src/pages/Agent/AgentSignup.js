import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router';
import Layout from '../../components/Layout/Layout'
import { getAllViewOptions } from '../../redux/strapi_actions/view.action';
import AgentSignupForm from './AgentSignupForm/AgentSignupForm'

export default function AgentSignup() {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllViewOptions())
    },[])

    if(!user){
        localStorage.setItem('after_login', '/agents')
        return <Redirect to="/signup" />
    }
	return (
		<Layout>
			<AgentSignupForm />
		</Layout>
	)
}
