import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import MatchList from './MatchList'
import { Tabs } from 'antd'
import AcceptedMatchList from './AcceptedMatchList'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSuggestionsByStatus } from '../../redux/strapi_actions/alice.actions'
import { Redirect } from 'react-router'
import { notifyEmy } from '../../services/Sheruta'
import PaymentAlert from '../../components/PaymentAlert/PaymentAlert'

const { TabPane } = Tabs

export default function Match() {
	localStorage.setItem('after_login', '/match')
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.auth)
	function callback(key) {
		dispatch(getAllSuggestionsByStatus('accepted'))
	}
	const { accepted_suggestions, user_suggestions } = useSelector(
		(state) => state.alice
	)
	const { payment_plan } = useSelector((state) => state.view)

	useEffect(() => {
		dispatch(getAllSuggestionsByStatus('accepted'))
	}, [user_suggestions])
	// useEffect(() => {
	// 	notifyEmy({ heading: 'visited the match page' })
	// }, [])
	if (!user) {
		return <Redirect to="/login" />
	}

	return (
		<Layout currentPage={'match'} showMessages>
			<div className="container mt-3 h-100">
				<div className="row justify-content-center">
					<div className="col-sm-12 col-lg-7 ">
						<Tabs defaultActiveKey="1" onChange={callback}>
							<TabPane tab={`Suggested (${user_suggestions.length})`} key="1">
								{payment_plan ? (
									<MatchList list={user_suggestions} />
								) : (
									<PaymentAlert message={'Subscribe to view suggestions'} />
								)}
							</TabPane>
							<TabPane
								tab={`Accepted (${accepted_suggestions.length})`}
								key="2"
							>
								<AcceptedMatchList list={accepted_suggestions} />
							</TabPane>
						</Tabs>
					</div>
				</div>
			</div>
		</Layout>
	)
}
