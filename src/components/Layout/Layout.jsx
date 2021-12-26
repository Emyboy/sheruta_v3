import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import FooterNav from './FooterNav'
import Header from './Header'
import MessagePanel from './MessagePanel'
import SideNav from './SideNav'
import Global from '../../Global'

export default function Layout({
	currentPage,
	children,
	showMessages,
	noBottomSpacing,
	noScroll
}) {
	const { user } = useSelector((state) => state.auth)
	const [showNav, setShowNav] = useState(false)
	const [showChat, setShowChat] = useState(
		showMessages && window.innerWidth > 700
	)
	return (
		<div>
			<Header
				onNavToggle={() => setShowNav(!showNav)}
				showNav={showNav}
				onChatToggle={() => setShowChat(!showChat)}
				showChat={showChat}
				pageName={currentPage}
			/>
			{user && <SideNav show={showNav} />}
			{user && (
				<MessagePanel
					show={showChat}
					pageName={currentPage}
					togglePanel={() => setShowChat(!showChat)}
				/>
			)}

			<div
				className={user && 'main-content right-chat-active'}
				style={{
					paddingBottom: !user || noBottomSpacing ? '0vh' : '21vh',
					overflow: noScroll && 'hidden',
				}}
			>
				<div className={user && 'middle-sidebar-bottom pl-0 pr-0'}>
					<div className={user && 'middle-sidebar-left'}>{children}</div>
				</div>
			</div>
			{user && Global.isMobile && <FooterNav pageName={currentPage} />}
		</div>
	)
}
