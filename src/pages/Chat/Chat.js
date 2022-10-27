import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router'
import MainErrorBoundary from '../../components/ErrorBoundries/MainErrorBoundry'
import Global from '../../Global'

import ChatCenter from './ChatCenter'
import ChatList from './ChatList'

export default function Chat() {
	const { user } = useSelector((state) => state.auth)

	const { conversation_id } = useParams()

	const auth_user = user?.user

	if (!auth_user) {
		localStorage.setItem('after_login', window.location.pathname)
		return <Redirect to="/login" />
	}

	// console.log('RERENDERING')

	return (
		<MainErrorBoundary>
			<div className="bg-accent" style={{ overflowY: 'hidden' }}>
				<div className="container">
					<div className="row justify-content-center">
						{Global.isMobile && !conversation_id ? (
							<div
								className="bg-white shadow col-lg-4 pb-0 px-0"
								style={{ minHeight: '100vh' }}
							>
								<ChatList />
							</div>
						) : null}
						{!Global.isMobile && (
							<div
								className="bg-white shadow col-lg-4 pb-0 px-0"
								style={{ minHeight: '100vh' }}
							>
								<ChatList />
							</div>
						)}

						{conversation_id && (
							<div
								className="col-lg-7 p-0 bg-grey border-left"
								style={{ height: '100vh' }}
							>
								<ChatCenter />
							</div>
						)}
					</div>
				</div>
			</div>
		</MainErrorBoundary>
	)
}
