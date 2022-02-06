import React from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { useSelector } from 'react-redux'
import { HorizontalScrollWrapper } from '../../pages/HomeNew/components/HomeListings/HomeListings'
import EachUserListCard from './EachUserListCard'

export default function RecentUsersList() {
	const { recent_users } = useSelector((state) => state?.view)
	return (
		<div className="mb-4">
			<HorizontalScrollWrapper>
				<ScrollMenu
					// LeftArrow={() => <button>Left</button>}
					// RightArrow={() => <button>Right</button>}
					wrapperClassName="wrapper"
					// onWheel={onWheel}
				>
					{recent_users?.map((val, i) => {
						return <EachUserListCard data={val} key={`user-${i}`} />
					})}
				</ScrollMenu>
			</HorizontalScrollWrapper>
		</div>
	)
}
