import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import requestUtils from '../../../../utils/request.utils'
// NOTE: embrace power of CSS flexbox!
// import "./arrowsOnBottomOrTop.css";
// import "./firstItemMargin.css";

const elemPrefix = 'test'
const getId = (index) => `${elemPrefix}${index}`

const getItems = () =>
	Array(20)
		.fill(0)
		.map((_, ind) => ({ id: getId(ind) }))

export const HorizontalScrollWrapper = styled.div`
	.wrapper > div {
		/* width */
		::-webkit-scrollbar {
			width: 10px;
			height: 5px;
		}

		/* Track */
		::-webkit-scrollbar-track {
			background: #f1f1f1;
		}

		/* Handle */
		::-webkit-scrollbar-thumb {
			border-radius: 20px;
			background: #00ba74;
			height: 1px;
			width: 1px;
		}

		/* Handle on hover */
		::-webkit-scrollbar-thumb:hover {
			background: #555;
		}
	}
`

const EachProperty = styled.article`
	.card {
		height: 300px !important;
		width: 200px !important;
	}
`

function App() {
	const [items] = React.useState(getItems)
	const [state, setState] = React.useState({
		list: [],
	})

	React.useEffect(() => {
		const dev = process.env.NODE_ENV === 'development'
		if (state?.list?.length === 0) {
			axios(
				process.env.REACT_APP_API_URL +
					`/property-requests/?is_searching=false&_limit=${'20'}&_start=0&_sort=created_at:DESC`
			)
				.then((res) => {
					setState({ ...state, list: res.data })
				})
				.catch((err) => {})
		}
	}, [state])

	return (
		<section className='section mt-5'>
			<div className="p-3 bottom-radius-4 container mb-3">
				<div className="d-flex align-items-center justify-content-between mb-3">
					<h3 className="fw-bold text-grey-700 mb-0">Our Properties</h3>
					<Link to="/feeds" className="fw-bold text-theme">
						More {'>'}
					</Link>
				</div>
				<HorizontalScrollWrapper>
					<ScrollMenu
						// LeftArrow={() => <button>Left</button>}
						// RightArrow={() => <button>Right</button>}
						wrapperClassName="wrapper"
						onWheel={onWheel}
					>
						{state.list.map((val) => (
							<EachProperty className="item mr-2" key={`prop-${val?.id}`}>
								<Link to={requestUtils.renderRequestURL(val)}>
									<div
										data-bs-toggle="modal"
										data-bs-target="#Modalstory"
										className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-gradiant-bottom overflow-hidden cursor-pointer mb-3 mt-3"
										style={{
											backgroundImage: `url(${val?.image_url[0]})`,
											backgroundSize: 'cover',
											backgroundPosition: 'center',
										}}
									>
										<div className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
											<Link to={requestUtils.renderRequestURL(val)}>
												<figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
													<img
														src={val?.users_permissions_user?.avatar_url}
														alt="image"
														className="float-right p-0 bg-white rounded-circle w-100 shadow"
													/>
												</figure>
												<div className="clearfix"></div>
												<h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">
													{
														val?.users_permissions_user?.first_name?.split(
															' '
														)[0]
													}
												</h4>
											</Link>
										</div>
									</div>
								</Link>
							</EachProperty>
						))}
					</ScrollMenu>
				</HorizontalScrollWrapper>
			</div>
		</section>
	)
}
export default App

function onWheel(apiObj, ev) {
	const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15

	if (isThouchpad) {
		ev.stopPropagation()
		return
	}

	if (ev.deltaY < 0) {
		apiObj.scrollNext()
	} else if (ev.deltaY > 0) {
		apiObj.scrollPrev()
	}
}
