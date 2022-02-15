import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router';
import Layout from '../../components/Layout/Layout'
import { getAllViewOptions } from '../../redux/strapi_actions/view.action';
import AgentSignupForm from './AgentSignupForm/AgentSignupForm'

export default function AgentSignup() {
    const { user } = useSelector(state => state.auth);
    const [weMove, setWeMove] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllViewOptions())
    },[]);

    useEffect(() => {
        (async() => {
            const res = await axios(process.env.REACT_APP_API_URL+`/agents/?users_permissions_user=${user?.user?.id}`)
            if(res?.data && res?.data?.length > 0){
                setWeMove(true)
            }
        })()
    },[])

    if(weMove){
        return <Redirect to={`/services`} />
    }

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
